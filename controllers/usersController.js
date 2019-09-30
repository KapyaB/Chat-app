const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const signToken = user => {
  // create the token payload
  const payload = {
    user: {
      id: user.id
    }
  };
  //  sign the token
  return JWT.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 86400 } // 1 day
  );
};

// errors
const genError = error => {
  return { errors: [{ error: error }] };
};

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      console.log(req.body);
      // check if user already exists (email || username)
      let foundUser = await User.findOne({
        $or: [{ email }, { username }]
      });

      if (foundUser) {
        return res.status(403).json(genError('User already exists'));
      }

      // create new user
      const newUser = new User({
        username,
        email,
        password
      });
      // Hash password
      const salt = await bcrypt.genSalt(10); // the salt hashes the password

      newUser.password = await bcrypt.hash(password, salt); // creates a hash and puts into the user password field
      await newUser.save();

      const token = signToken(newUser);

      res.status(200).json({ user: newUser, token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // find user
      const user = await User.findOne({ email });

      // no user
      if (!user) {
        return res
          .status(400)
          .json(
            genError(
              'incorrect credentials. Please check your email and password'
            )
          );
      }

      // compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      // wrong password
      if (!isMatch) {
        return res
          .status(400)
          .json(
            genError(
              'incorrect credentials. Please check your email and password'
            )
          );
      }

      const token = signToken(user, 'local');

      res.status(200).json({ token, user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
};

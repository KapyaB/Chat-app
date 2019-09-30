const router = require('express-promise-router')();
const auth = require('../middleware/auth');

const usersController = require('../controllers/usersController');

// sign up
router.route('/signup').post(usersController.signUp);

// sign in
router.route('/signin').post(usersController.signIn);

// load user
router.route('/user').get(auth, usersController.getUser);

// load users
router.route('/users').get(auth, usersController.loadUsers);

module.exports = router;

const router = require('express-promise-router')();

const usersController = require('../controllers/usersController');

// sign up
router.route('/signup').post(usersController.signUp);

// sign in
router.route('/signin').post(usersController.signIn);

module.exports = router;

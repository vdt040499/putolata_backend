const express = require('express');
const router = express.Router();
const {
  signUp,
  signIn,
  signout,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth.controller');
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
  validateForgotPassword,
  validateResetPassword,
} = require('../validators/auth.validator');

router.post('/signup', validateSignupRequest, isRequestValidated, signUp);
router.post('/signin', validateSigninRequest, isRequestValidated, signIn);
router.post('/signout', signout);
router.post(
  '/forgotpassword',
  validateForgotPassword,
  isRequestValidated,
  forgotPassword
);
router.post(
  '/resetpassword',
  validateResetPassword,
  isRequestValidated,
  resetPassword
);

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile'});
// });

module.exports = router;

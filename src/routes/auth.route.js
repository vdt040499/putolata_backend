const express = require('express');
const router = express.Router();

const validator = require('../validators/auth.validator');
const authController = require('../controllers/auth.controller');

router.post(
  '/signup',
  validator.validateSignupRequest,
  validator.isRequestValidated,
  authController.signUp
);
router.post(
  '/signin',
  validator.validateSigninRequest,
  validator.isRequestValidated,
  authController.signIn
);
router.post('/signout', authController.signout);
router.post(
  '/forgotpassword',
  validator.validateForgotPassword,
  validator.isRequestValidated,
  authController.forgotPassword
);
router.post(
  '/resetpassword',
  validator.validateResetPassword,
  validator.isRequestValidated,
  authController.resetPassword
);

module.exports = router;

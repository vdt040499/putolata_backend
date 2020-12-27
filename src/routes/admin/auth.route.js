const express = require('express');
const router = express.Router();

const validator = require('../../validators/auth.validator');
const adminAuthController = require('../../controllers/admin/auth.controller');
const authController = require('../../controllers/auth.controller');

router.post(
  '/admin/signin',
  validator.validateSigninRequest,
  validator.isRequestValidated,
  adminAuthController.signIn
);
router.post(
  '/admin/signup',
  validator.validateSignupRequest,
  validator.isRequestValidated,
  adminAuthController.signUp
);
router.post('/admin/signout', adminAuthController.signout);

router.post(
  '/admin/forgotpassword',
  validator.validateForgotPassword,
  validator.isRequestValidated,
  authController.forgotPassword
);

router.post(
  '/admin/resetpassword',
  validator.validateResetPassword,
  validator.isRequestValidated,
  authController.resetPassword
);

module.exports = router;

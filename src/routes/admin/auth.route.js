const express = require('express');
const { requireSignin } = require('../../common-middleware');
const router = express.Router();
const {
  signUp,
  signIn,
  signout,
} = require('../../controllers/admin/auth.controller');
const {
  forgotPassword,
  resetPassword,
} = require('../../controllers/auth.controller');
const {
  validateSigninRequest,
  isRequestValidated,
  validateSignupRequest,
  validateForgotPassword,
  validateResetPassword,
} = require('../../validators/auth.validator');

router.post('/admin/signin', validateSigninRequest, isRequestValidated, signIn);
router.post('/admin/signup', validateSignupRequest, isRequestValidated, signUp);
router.post('/admin/signout', signout);

router.post(
  '/admin/forgotpassword',
  validateForgotPassword,
  isRequestValidated,
  forgotPassword
);

router.post(
  '/admin/resetpassword',
  validateResetPassword,
  isRequestValidated,
  resetPassword
);

module.exports = router;

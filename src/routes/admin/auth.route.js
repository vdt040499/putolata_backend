const express = require('express');
const { requireSignin } = require('../../common-middleware');
const router = express.Router();
const { signUp, signIn, signout } = require('../../controllers/admin/auth.controller');
const { validateSigninRequest, isRequestValidated, validateSignupRequest } = require('../../validators/auth.validator');

router.post('/admin/signin', validateSigninRequest, isRequestValidated, signIn);
router.post('/admin/signup', validateSignupRequest, isRequestValidated, signUp);
router.post('/admin/signout', requireSignin, signout);

module.exports = router;
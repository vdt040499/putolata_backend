const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../../controllers/admin/auth.controller');
const { validateSigninRequest, isRequestValidated, validateSignupRequest } = require('../../validators/auth.validator');

router.post('/admin/signin', validateSigninRequest, isRequestValidated, signIn);
router.post('/admin/signup', validateSignupRequest, isRequestValidated, signUp);

module.exports = router;
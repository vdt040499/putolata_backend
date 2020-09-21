const express = require('express');
const router = express.Router();

const { signUp, signIn, requireSignin } = require('../../controllers/admin/auth.controller');

router.post('/admin/signin', signIn);
router.post('/admin/signup', signUp);

module.exports = router;
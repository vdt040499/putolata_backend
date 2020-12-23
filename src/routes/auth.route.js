const express = require('express');
const router = express.Router();
const { signUp, signIn, signout } = require('../controllers/auth.controller');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../validators/auth.validator');

router.post('/signup', validateSignupRequest, isRequestValidated, signUp);
router.post('/signin', validateSigninRequest, isRequestValidated, signIn);
router.post('/signout', signout);
// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile'});
// });

module.exports = router;
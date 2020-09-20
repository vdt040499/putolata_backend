const express = require('express');
const router = express.Router();

const { signUp } = require('../controllers/user.controller');

router.post('/signin', (req, res) => {
    
});

router.post('/signup', signUp);

module.exports = router;
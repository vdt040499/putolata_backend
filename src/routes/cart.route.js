const express = require('express');
const router = express.Router();

const { requireSignin } = require('../common-middleware/index');
const { addItemToCart } = require('../controllers/cart.controller');

router.post('/cart/addToCart', requireSignin, addItemToCart);

module.exports = router;
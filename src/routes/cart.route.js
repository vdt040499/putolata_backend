const express = require('express');
const router = express.Router();

const middleware = require('../common-middleware');
const cartController = require('../controllers/cart.controller');

router.post(
  '/user/cart/addtocart',
  middleware.requireSignin,
  middleware.userMiddleware,
  cartController.addItemToCart
);
router.post(
  '/user/getCartItems',
  middleware.requireSignin,
  middleware.userMiddleware,
  cartController.getCartItems
);
router.post(
  '/user/cart/removeItem',
  middleware.requireSignin,
  middleware.userMiddleware,
  cartController.removeCartItems
);

module.exports = router;

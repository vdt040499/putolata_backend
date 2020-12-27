const express = require('express');
const router = express.Router();

const middleware = require('../common-middleware');
const orderController = require('../controllers/order.controller');

router.post(
  '/addOrder',
  middleware.requireSignin,
  middleware.userMiddleware,
  orderController.addOrder
);
router.get(
  '/getOrders',
  middleware.requireSignin,
  middleware.userMiddleware,
  orderController.getOrders
);
router.post(
  '/getOrder',
  middleware.requireSignin,
  middleware.userMiddleware,
  orderController.getOrder
);

module.exports = router;

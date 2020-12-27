const express = require('express');
const router = express.Router();

const middleware = require('../../common-middleware');
const adminOrderController = require('../../controllers/admin/order.controller');

router.post(
  '/order/update',
  middleware.requireSignin,
  middleware.adminMiddleware,
  adminOrderController.updateOrder
);
router.post(
  '/order/getCustomerOrders',
  middleware.requireSignin,
  middleware.adminMiddleware,
  adminOrderController.getCustomerOrders
);

module.exports = router;

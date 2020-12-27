const express = require('express');
const router = express.Router();

const middleware = require('../common-middleware');
const addressController = require('../controllers/address.controller');

router.post(
  '/user/address/create',
  middleware.requireSignin,
  middleware.userMiddleware,
  addressController.addAddress
);
router.post(
  '/user/getaddress',
  middleware.requireSignin,
  middleware.userMiddleware,
  addressController.getAddress
);

module.exports = router;

const express = require('express');
const router = express.Router();

const validator = require('../validators/auth.validator');
const middleware = require('../common-middleware');
const userController = require('../controllers/user.controller');

router.patch(
  '/user',
  validator.validateUpdateRequest,
  validator.isRequestValidated,
  middleware.requireSignin,
  middleware.userMiddleware,
  userController.updateUser
);

router.patch(
  '/admin',
  validator.validateUpdateRequest,
  validator.isRequestValidated,
  middleware.requireSignin,
  middleware.adminMiddleware,
  userController.updateUser
);

module.exports = router;

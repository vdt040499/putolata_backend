const express = require('express');
const router = express.Router();

const {
  validateUpdateRequest,
  isRequestValidated,
} = require('../validators/auth.validator');
const {
  requireSignin,
  userMiddleware,
  adminMiddleware,
} = require('../common-middleware');
const userController = require('../controllers/user.controller');

router.patch(
  '/user',
  validateUpdateRequest,
  isRequestValidated,
  requireSignin,
  userMiddleware,
  userController.updateUser
);

router.patch(
  '/admin',
  validateUpdateRequest,
  isRequestValidated,
  requireSignin,
  adminMiddleware,
  userController.updateUser
);

module.exports = router;

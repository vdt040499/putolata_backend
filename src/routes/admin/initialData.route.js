const express = require('express');
const router = express.Router();

const middleware = require('../../common-middleware');
const initialData = require('../../controllers/admin/initialData.controller');

router.post(
  '/initialData',
  middleware.requireSignin,
  middleware.adminMiddleware,
  initialData.initialData
);

module.exports = router;

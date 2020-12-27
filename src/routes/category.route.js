const express = require('express');
const router = express.Router();

const middleware = require('../common-middleware');
const categoryController = require('../controllers/category.controller');

router.post(
  '/category/create',
  middleware.requireSignin,
  middleware.adminMiddleware,
  categoryController.addCategory
);
router.get('/category/getcategory', categoryController.getCategories);
router.post('/category/update', categoryController.updateCategories);
router.post('/category/delete', categoryController.deleteCategories);

module.exports = router;

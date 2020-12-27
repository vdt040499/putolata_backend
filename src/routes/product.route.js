const express = require('express');
const router = express.Router();

const middleware = require('../common-middleware');
const productController = require('../controllers/product.controller');

router.post(
  '/products/create',
  middleware.requireSignin,
  middleware.adminMiddleware,
  middleware.upload.array('productPicture'),
  productController.createProduct
);
router.get('/products/newarrival', productController.getNewProducts);
router.get('/products/bestseller', productController.getBestSellerProducts);
router.get('/products/onsale', productController.getOnSaleProducts);
router.get('/products/:slug', productController.getProductsBySlug);
router.get('/product/:productId', productController.getProductDetailsById);
router.get('/products', productController.getAllProducts);

module.exports = router;

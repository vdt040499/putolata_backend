const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const Product = require("../models/product.model");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
  getAllProducts,
  getNewProducts,
  getBestSellerProducts,
  getOnSaleProducts,
} = require("../controllers/product.controller");

router.post(
  "/products/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);
router.get("/products/newarrival", getNewProducts);
router.get("/products/bestseller", getBestSellerProducts);
router.get("/products/onsale", getOnSaleProducts);
router.get("/products/:productId", getProductDetailsById);
router.get("/products/:slug", getProductsBySlug);
router.get("/products", getAllProducts);

module.exports = router;

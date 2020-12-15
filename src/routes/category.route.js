const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");

const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  addCategory,
  getCategories,
  updateCategories,
} = require("../controllers/category.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/category/create",
  requireSignin,
  adminMiddleware,
  upload.single("categoryImage"),
  addCategory
);
router.get("/category/getcategory", getCategories);
router.post(
  "/category/update",
  upload.array("categoryImage"),
  updateCategories
);

module.exports = router;

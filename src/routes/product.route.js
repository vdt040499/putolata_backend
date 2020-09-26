const express = require('express');
const router = express.Router();
const multer = require('multer');
const shortId = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate() + "-" + file.originalname)
    }
});

const upload = multer({ storage });

const Product = require('../models/product.model');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct } = require('../controllers/product.controller');

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);
// router.get('/')

module.exports = router;
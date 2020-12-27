const slugify = require('slugify');

const Category = require('../models/category.model');
const Product = require('../models/product.model');

module.exports.createProduct = (req, res) => {
  const { name, price, description, quantity, category } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return {
        img:
          process.env.API + file.uploadcare_file_id + '/' + file.originalname,
      };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });

    if (product) {
      res.status(201).json({ product });
    }
  });
};

module.exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  console.log(slug);
  Category.findOne({ slug: slug })
    .select('_id type')
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) {
            return res.status(400).json({ error });
          }

          if (category.type) {
            if (products.length > 0) {
              res.status(200).json({
                products,
                productsByPrice: {
                  under5k: products.filter(
                    (product) => product.price <= 5000000
                  ),
                  under10k: products.filter(
                    (product) =>
                      product.price > 5000000 && product.price <= 10000000
                  ),
                  under15k: products.filter(
                    (product) =>
                      product.price > 10000000 && product.price <= 15000000
                  ),
                  under20k: products.filter(
                    (product) =>
                      product.price > 15000000 && product.price <= 20000000
                  ),
                  under30k: products.filter(
                    (product) =>
                      product.price > 20000000 && product.price <= 30000000
                  ),
                },
              });
            }
          } else {
            res.status(200).json({ products });
          }
        });
      }
    });
};

module.exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });

      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: 'Params required' });
  }
};

module.exports.getAllProducts = (req, res) => {
  Product.find()
    .then((products) => {
      return res.status(200).json({
        message: 'Success.',
        products: products,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err,
      });
    });
};

module.exports.getNewProducts = (req, res) => {
  Product.find()
    .sort({ _id: -1 })
    .limit(8)
    .then((products) => {
      return res.status(200).json({
        message: 'Success.',
        products: products,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err,
      });
    });
};

module.exports.getBestSellerProducts = (req, res) => {
  Product.find()
    .sort({ sold: -1 })
    .limit(8)
    .then((products) => {
      return res.status(200).json({
        message: 'Success.',
        products: products,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err,
      });
    });
};

module.exports.getOnSaleProducts = (req, res) => {
  Product.find()
    .sort({ discount: -1 })
    .limit(8)
    .then((products) => {
      return res.status(200).json({
        message: 'Success.',
        products: products,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err,
      });
    });
};

const slugify = require("slugify");
const Category = require("../models/category.model");
const Product = require("../models/product.model");
const shortid = require("shortid");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

module.exports.addCategory = (req, res) => {
  console.log(req.body.name);
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObj);

  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

module.exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });

    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
};

module.exports.updateCategories = async (req, res) => {
  console.log(req.body);
  const { _id, name, parentId } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
      };

      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updatedCategories: updatedCategories });
  } else {
    const category = {
      name,
    };

    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};

module.exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports.getProductsById = (req, res) => {
  const { categoryId } = req.params;
  Category.findOne({ _id: categoryId }).exec((error, category) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (category) {
      Product.find({ category: category._id }).exec((error, products) => {
        if (error) {
          return res.status(400).json({ error });
        }
        res.status(200).json({ products });
      });
    }
  });
};

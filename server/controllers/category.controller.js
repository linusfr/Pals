const Category = require('../models/category.model');

module.exports = {
  getCategories,
  addCategory,
  categoryExists
};

async function getCategories() {
  return await Category.find({});
}

async function categoryExists(category) {
  Category.find({ name: category.name }, (err, docs) => {
    if (docs.length > 0) {
      console.log(docs, docs[0], docs[0]._id);
      return docs[0];
    } else {
      return false;
    }
  });
}

async function addCategory(category) {
  return await new Category(category).save();
}

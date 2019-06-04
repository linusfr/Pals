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
  let returnValue;
  await Category.find({ name: category.name }, (err, docs) => {
    if (docs.length > 0) {
      returnValue = docs[0];
    } else {
      returnValue = false;
    }
  });
  return returnValue;
}

async function addCategory(category) {
  return await new Category(category).save();
}

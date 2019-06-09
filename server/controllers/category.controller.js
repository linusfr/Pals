//---------------------------------------------------------------------
//Dieser Controller verwaltet alle Datenbankzugriffe für die Kategorien
//---------------------------------------------------------------------
const Category = require('../models/category.model');

module.exports = {
  getCategories,
  addCategory,
  categoryExists
};

async function getCategories() {
  //liefert alle Kategorien aus der Datenbank
  return await Category.find({});
}

async function categoryExists(category) {
  let returnValue;
  //Es wird die Kategorie mit dem gesuchten Namen aus der Datenbank herausgesucht
  await Category.find({ name: category.name }, (err, docs) => {
    //Falls der Datenbankeintrag vorhanden ist, wird er zurückgegeben,
    //ansonsten wird "false" geliefert
    if (docs.length > 0) {
      returnValue = docs[0];
    } else {
      returnValue = false;
    }
  });
  return returnValue;
}

async function addCategory(category) {
  //Hiermit können neue Kategorien in die Datenbank eingespeichert werden
  return await new Category(category).save();
}

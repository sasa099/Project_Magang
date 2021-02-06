const db = require("../models");
const Ingredients = db.ingredients;

exports.create = (req, res) => {
 const ingredients = new Ingredients({
  id_skincare : req.body.id_skincare,
  logo : req.files[0].filename,
  nama : req.body.nama,
  
 });

 // Save Ingredients in the database
 ingredients
   .save(ingredients)
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message: err.message || "Some error occurred while creating the Ingredients.",
     });
   });
};
 
exports.findAll = (req, res) => {
 const nama = req.query.nama;
 var condition = nama
   ? { nama: { $regex: new RegExp(nama), $options: "i" } }
   : {};
 
 Ingredients.find(condition).populate('id_skincare')
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message: err.message || "Some error occurred while retrieving.",
     });
   });
};
 
exports.findOne = (req, res) => {
 const id = req.params.id;
 
 Ingredients.findById(id)
   .then((data) => {
     if (!data) res.status(404).send({ message: "Not found with id " + id });
     else res.send(data);
   })
   .catch((err) => {
     res.status(500).send({ message: "Error retrieving with id=" + id });
   });
};
 
exports.update = (req, res) => {
 const id = req.params.id;
 const ingredients2 = {
  id_skincare: req.body.id_skincare,
  logo: req.files[0].filename,
  nama: req.body.nama,
 };
 Ingredients.findByIdAndUpdate(id, ingredients2, { useFindAndModify: false })
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot update Ingredients with id=${id}. Maybe Ingredients was not found!`,
       });
     } else res.send({ message: "Ingredients was updated successfully." });
   })
   .catch((err) => {
     res.status(500).send({
       message: "Error updating Ingredients with id=" + id,
     });
   });
};
exports.delete = (req, res) => {
 const id = req.params.id;
 
 Ingredients.findByIdAndRemove(id)
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot delete Ingredients with id=${id}. Maybe Ingredients was not found!`,
       });
     } else {
       res.send({
         message: "Ingredients was deleted successfully!",
       });
     }
   })
   .catch((err) => {
     res.status(500).send({
       message: "Could not delete Ingredients with id=" + id,
     });
   });
};
 
exports.deleteAll = (req, res) => {};
 
exports.findAllPublished = (req, res) => {};

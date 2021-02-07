const db = require("../models");
const Collection = db.collection;
 
exports.create = (req, res) => {
 const collection = new Collection({
  nama: req.body.nama,
  foto: req.files[0].filename,
  
  
  
 });
 
 // Save Collection in the database
 collection
   .save(collection)
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message: err.message || "Some error occurred while creating the Collection.",
     });
   });
};
 
exports.findAll = (req, res) => {
 const nama = req.query.nama;
 var condition = nama
   ? { nama: { $regex: new RegExp(nama), $options: "i" } }
   : {};
 
 Collection.find(condition)
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
 
 Collection.findById(id)
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
 const collection2 = {
  nama: req.body.nama,
  foto: req.files[0].filename,
 };
 Collection.findByIdAndUpdate(id, collection2, { useFindAndModify: false })
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot update Collection with id=${id}. Maybe Collection was not found!`,
       });
     } else res.send({ message: "Collection was updated successfully." });
   })
   .catch((err) => {
     res.status(500).send({
       message: "Error updating Collection with id=" + id,
     });
   });
};
exports.delete = (req, res) => {
 const id = req.params.id;
 
 Collection.findByIdAndRemove(id)
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot delete Collection with id=${id}. Maybe Collection was not found!`,
       });
     } else {
       res.send({
         message: "Collection was deleted successfully!",
       });
     }
   })
   .catch((err) => {
     res.status(500).send({
       message: "Could not delete Collection with id=" + id,
     });
   });
};
 
exports.deleteAll = (req, res) => {};
 
exports.findAllPublished = (req, res) => {};

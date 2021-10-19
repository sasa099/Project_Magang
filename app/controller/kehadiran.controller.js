const db = require("../models");
const Kehadiran = db.kehadiran;
 
exports.create = (req, res) => {
 const kehadiran = new Kehadiran({
  kehadiran:req.body.kehadiran,
  matakuliah: req.body.matakuliah,
 });
 
 // Save Kehadiran in the database
 kehadiran
   .save(kehadiran)
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message: err.message || "Some error occurred while creating the Kehadiran.",
     });
   });
};
 
exports.findAll = (req, res) => {
 const nama = req.query.nama;
 var condition = nama
   ? { nama: { $regex: new RegExp(nama), $options: "i" } }
   : {}; 
 
 Kehadiran.find(condition)
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
 
 Kehadiran.findById(id)
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
 
 Kehadiran.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot update Kehadiran with id=${id}. Maybe Kehadiran was not found!`,
       });
     } else res.send({ message: "Kehadiran was updated successfully." });
   })
   .catch((err) => {
     res.status(500).send({
       message: "Error updating Kehadiran with id=" + id,
     });
   });
};
exports.delete = (req, res) => {
 const id = req.params.id;
 
 Kehadiran.findByIdAndRemove(id)
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot delete Kehadiran with id=${id}. Maybe Kehadiran was not found!`,
       });
     } else {
       res.send({
         message: "Kehadiran was deleted successfully!",
       });
     }
   })
   .catch((err) => {
     res.status(500).send({
       message: "Could not delete Kehadiran with id=" + id,
     });
   });
};
 
exports.deleteAll = (req, res) => {};
 
exports.findAllPublished = (req, res) => {};

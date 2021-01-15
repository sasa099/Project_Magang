const db = require("../models");
const Skincare = db.skincare;
 
exports.create = (req, res) => {
 const skincare = new Skincare({
  foto: req.files[0].filename,
  nama: req.body.nama,
  harga: req.body.harga,
  takaran: req.body.takaran,
  deskripsi: req.body.deskripsi,
  loved: req.body.loved,
  id_kategori: req.body.id_kategori,
 });
 
 // Save Skincare in the database
 skincare
   .save(skincare)
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message: err.message || "Some error occurred while creating the Skincare.",
     });
   });
};
 
exports.findAll = (req, res) => {
 const nama = req.query.nama;
 var condition = nama
   ? { nama: { $regex: new RegExp(nama), $options: "i" } }
   : {};
 
 Skincare.find(condition).populate('kategori')
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
 
 Skincare.findById(id)
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
 
 Skincare.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot update Skincare with id=${id}. Maybe Skincare was not found!`,
       });
     } else res.send({ message: "Skincare was updated successfully." });
   })
   .catch((err) => {
     res.status(500).send({
       message: "Error updating Skincare with id=" + id,
     });
   });
};
exports.delete = (req, res) => {
 const id = req.params.id;
 
 Skincare.findByIdAndRemove(id)
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot delete Skincare with id=${id}. Maybe Skincare was not found!`,
       });
     } else {
       res.send({
         message: "Skincare was deleted successfully!",
       });
     }
   })
   .catch((err) => {
     res.status(500).send({
       message: "Could not delete Skincare with id=" + id,
     });
   });
};
 
exports.deleteAll = (req, res) => {};
 
exports.findAllPublished = (req, res) => {};

const db = require("../models");
const Datamhs = db.datamhs;
 
exports.create = (req, res) => {
 const datamhs = new Datamhs({
  nim:req.body.nim,
  nama:req.body.nama,
  prodi:req.body.prodi,
  email:req.body.email,
  alamat:req.body.alamat,
  notelp:req.body.notelp,
  alamatortu:req.body.alamatortu,
  foto:req.files[0].filename,
  nik:req.body.nik,
  gender:req.body.gender, 
  datamhs: req.body.datamhs,
 });
 
 // Save Datamhs in the database
 datamhs
   .save(datamhs)
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message: err.message || "Some error occurred while creating the Datamhs.",
     });
   });
};
 
exports.findAll = (req, res) => {
 const nama = req.query.nama;
 var condition = nama
   ? { nama: { $regex: new RegExp(nama), $options: "i" } }
   : {}; 
 
 Datamhs.find(condition)
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
 
 Datamhs.findById(id)
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
  const datamhs2 = {
  nim:req.body.nim,
  nama:req.body.nama,
  prodi:req.body.prodi,
  email:req.body.email,
  alamat:req.body.alamat,
  notelp:req.body.notelp,
  alamatortu:req.body.alamatortu,
  foto:req.files[0].filename,
  nik:req.body.nik,
  gender:req.body.gender, 
  datamhs: req.body.datamhs,
 };
 Datamhs.findByIdAndUpdate(id, datamhs2, { useFindAndModify: false })
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot update Datamhs with id=${id}. Maybe Datamhs was not found!`,
       });
     } else res.send({ message: "Datamhs was updated successfully." });
   })
   .catch((err) => {
     res.status(500).send({
       message: "Error updating Datamhs with id=" + id,
     });
   });
};
exports.delete = (req, res) => {
 const id = req.params.id;
 
 Datamhs.findByIdAndRemove(id)
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot delete Datamhs with id=${id}. Maybe Datamhs was not found!`,
       });
     } else {
       res.send({
         message: "Datamhs was deleted successfully!",
       });
     }
   })
   .catch((err) => {
     res.status(500).send({
       message: "Could not delete Datamhs with id=" + id,
     });
   });
};
 
exports.deleteAll = (req, res) => {};
 
exports.findAllPublished = (req, res) => {};

const db = require("../models");
const Datamhs = db.datamhs;
 
exports.create = (req, res) => {
 const datamhs = new Datamhs({
  nim:req.body.nim,
  nik:req.body.nik,
  nama_depan:req.body.nama_depan,
  nama_belakang:req.body.nama_belakang,
  jenis_kelamin:req.body.jenis_kelamin,
  id_prodi:req.body.id_prodi,
  email:req.body.email,
  noTelp:req.body.noTelp,
  alamatOrtu:req.body.alamatOrtu,
  alamatmu:req.body.alamatmu,
  kodepos:req.body.kodepos,
  kodeposs:req.body.kodeposs,
  provinsimu:req.body.provinsimu,
  provinsi:req.body.provinsi,
  kotamu:req.body.kotamu,
  kota:req.body.kota,
  kecamatanmu:req.body.kecamatanmu,
  kecamatan:req.body.kecamatan,
  id_kelas:req.body.id_kelas,
  foto:req.files[0].filename,
  
 });
 
 // Save Datamhs in the database
 Datamhs.find({
  nim: req.body.nim,
}).then((data) => {
  if (!data[0]) {
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
  } else {
    res.status(412).send({ message: "Nim "+ req.body.nim + " Telah Terdaftar" });
  }
}).catch((err) => {
  res.status(500).send({
    message: err.message || "Some error occurred while retrieving.",
  });
});
};

 
exports.findAll = (req, res) => {
 const nama = req.query.nama;
 var condition = nama
   ? { nama: { $regex: new RegExp(nama), $options: "i" } }
   : {}; 
 
 Datamhs.find(condition).populate('id_kelas').populate('id_prodi')
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
 
 Datamhs.findById(id).populate('id_prodi').populate('id_kelas')
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
    nik:req.body.nik,
    nama_depan:req.body.nama_depan,
    nama_belakang:req.body.nama_belakang,
    jenis_kelamin:req.body.jenis_kelamin,
    id_prodi:req.body.id_prodi,
    email:req.body.email,
    noTelp:req.body.noTelp,
    alamatOrtu:req.body.alamatOrtu,
    alamatmu:req.body.alamatmu,
    kodepos:req.body.kodepos,
    kodeposs:req.body.kodeposs,
    provinsimu:req.body.provinsimu,
    provinsi:req.body.provinsi,
    kotamu:req.body.kotamu,
    kota:req.body.kota,
    kecamatanmu:req.body.kecamatanmu,
    kecamatan:req.body.kecamatan,
    id_kelas:req.body.id_kelas,
    foto:req.files[0].filename,  
 };
 Datamhs.find({
  nim: req.body.nim,
}).then((data) => {
  if (!data[0]) {
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
  } else {
    res.status(412).send({ message: "Nim "+ req.body.nim + " Telah Terdaftar" });
  }
}).catch((err) => {
  res.status(500).send({
    message: err.message || "Some error occurred while retrieving.",
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

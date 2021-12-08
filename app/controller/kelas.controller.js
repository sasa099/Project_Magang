const db = require("../models");
const Kelas = db.kelas;
 
exports.create = (req, res) => {
 const kelas = new Kelas({
  id_matakuliah:req.body.id_matakuliah,
  kelas:req.body.kelas,
 });
 
 // Save Kelas in the database
 Kelas.find({
   kelas:req.body.kelas,
 }).then((data)=>{console.log(data[0]);
  if(!data[0]){
 kelas
   .save(kelas)
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message: err.message || "Some error occurred while creating the Kelas.",
     });
   });
  } else {
    res.status(412).send({ message: "Kelas "+req.body.kelas + " Telah Terdaftar" });
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
 
 Kelas.find(condition).populate('id_matakuliah')
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
 
 Kelas.findById(id).populate('id_matakuliah')
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
 const kelas2 = {
  id_matakuliah:req.body.id_matakuliah,
  kelas:req.body.kelas,
 };
 
 Kelas.find({
  kelas:req.body.kelas,
}).then((data)=>{console.log(data[0]);
 if(!data[0]){
 Kelas.findByIdAndUpdate(id,kelas2, { useFindAndModify: false })
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot update Kelas with id=${id}. Maybe Kelas was not found!`,
       });
     } else res.send({ message: "Kelas was updated successfully." });
   })
   .catch((err) => {
     res.status(500).send({
       message: "Error updating Kelas with id=" + id,
     });
   });
  } else {
    res.status(412).send({ message: "Kelas "+req.body.kelas + " Telah Terdaftar" });
  }
}).catch((err) => {
  res.status(500).send({
    message: err.message || "Some error occurred while retrieving.",
  });
});
};
exports.delete = (req, res) => {
 const id = req.params.id;
 
 Kelas.findByIdAndRemove(id)
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot delete Kelas with id=${id}. Maybe Kelas was not found!`,
       });
     } else {
       res.send({
         message: "Kelas was deleted successfully!",
       });
     }
   })
   .catch((err) => {
     res.status(500).send({
       message: "Could not delete Kelas with id=" + id,
     });
   });
};
 
exports.deleteAll = (req, res) => { };
 
exports.findAllPublished = (req, res) => { };

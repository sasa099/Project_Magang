const db = require("../models");
const Kehadiran = db.kehadiran;
 
exports.create = (req, res) => {
 const kehadiran = new Kehadiran({
  nim:req.body.nim,
  nama:req.body.nama,
  id_kelas:req.body.id_kelas,
  id_prodi:req.body.id_prodi,
  keterangan:req.body.keterangan,
  tanggal:req.body.tanggal,
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
 
 Kehadiran.find(condition).populate('id_kelas').populate('id_prodi')
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
 
 Kehadiran.findById(id).populate('id_kelas').populate('id_prodi')
   .then((data) => {
     if (!data) res.status(404).send({ message: "Not found with id " + id });
     else res.send(data);
   })
   .catch((err) => {
     res.status(500).send({ message: "Error retrieving with id=" + id });
   });
};
 
exports.update = (req, res) => {
 const id  = req.params.id;
 const kehadiran2 ={
  nim:req.body.nim,
  nama:req.body.nama,
  id_kelas:req.body.id_kelas,
  id_prodi:req.body.id_prodi,
  keterangan:req.body.keterangan,
  tanggal:req.body.tanggal,
 }
 
 Kehadiran.findByIdAndUpdate(id, kehadiran2, { useFindAndModify: false })
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

exports.detail = (req, res) => {
  if (req.query.kelas && req.query.matakuliah && req.query.datamhs) {
    Absensi.aggregate([
      {
        $match: {
          id_kelas: mongoose.Types.ObjectId(req.query.kelas),
          id_matakuliah: mongoose.Types.ObjectId(req.query.matakuliah)
        }
      },
      {  
        $unwind: "$kehadiran",
      },
      {
        $group: {
          _id: { id_nama: "$kehadiran.id_nama" },
          kelas: { $first: "$id_kelas" },
          jumlah: { $sum: 1 },
        }
      },
      {
        $project: {
          total: "$jumlah",
          percent: { $multiply: [{ $divide: ["$jumlah", "$jumlah"] }, 100] },
        }
      },
    ]).then((data) => {
      Absensi.aggregate([
        {
          $match: {
            id_kelas: mongoose.Types.ObjectId(req.query.kelas),
            id_matakuliah: mongoose.Types.ObjectId(req.query.matakuliah),
          }
        },
        {
          $unwind: "$kehadiran",
        },
        {
          $group: {
            _id: { id_nama: "$kehadiran.id_nama", keterangan: "$kehadiran.keterangan" },
            kelas: { $first: "$id_kelas" },
            jumlah: { $sum: 1 },
          }
        },{
          $match: {
            "_id.id_datamhs": mongoose.Types.ObjectId(req.query.datamhs),
          }
        },
        {
          $project: {
            _id: 1,
            kelas: 1,
            percent: { $multiply: [{ $divide: ["$jumlah", data[0].total] }, 100] },
          }
        },
      ]).then((data1) => {
        res.send(data1);
      });
    });

  }
}

// exports.laporan = (req, res) => {
//   if (req.query.kelas && req.query.matakuliah) {
//     Absensi.aggregate([
//       {
//         $match: {
//           id_kelas: mongoose.Types.ObjectId(req.query.kelas),
//           id_matakuliah: mongoose.Types.ObjectId(req.query.matakuliah)
//         }
//       },
//       {
//         $unwind: "$absensi",
//       },
//       {
//         $group: {
//           _id: { id_mahasiswa: "$absensi.id_mahasiswa" },
//           kelas: { $first: "$id_kelas" },
//           jumlah: { $sum: 1 },
//         }
//       },
//       {
//         $project: {
//           total: "$jumlah",
//           //percent: { $multiply: [{ $divide: ["$jumlah", "$jumlah"] }, 100] },
//         }
//       },
//     ]).then((data) => {
//       Absensi.aggregate([

//         {
//           $match: {
//             id_kelas: mongoose.Types.ObjectId(req.query.kelas),
//             id_matakuliah: mongoose.Types.ObjectId(req.query.matakuliah),
//           }
//         },
//         {
//           $unwind: "$absensi",
//         },
//         {
//           $group: {
//             _id: { id_mahasiswa: "$absensi.id_mahasiswa", keterangan: "$absensi.keterangan" },
//             kelas: { $first: "$id_kelas" },
//             matakuliah: { $first: "$id_matakuliah" },
//             dosen: {$first: "$id_dosen"},
//             mahasiswa: { $first: "$absensi.id_mahasiswa" },
//             keterangan: { $first: "$absensi.keterangan" },
//             jumlah: { $sum: 1 },
//           }
//         }, {
//           $match: {
//             "_id.keterangan": "Hadir",
//           }
//         },
//         {
//           $project: {
//             kelas: 1,
//             matakuliah: 1,
//             mahasiswa: 1,
//             dosen: 1,
//             keterangan: 1,
//             percent: { $multiply: [{ $divide: ["$jumlah", data[0].total] }, 100] },
//           }
//         }, {
//           $lookup: {
//             from: "mahasiswas",
//             localField: "mahasiswa",
//             foreignField: "_id",
//             as: "mahasiswa"
//           }
//         },
//         {
//           $lookup: {
//             from: "kelas",
//             localField: "kelas",
//             foreignField: "_id",
//             as: "kelas"
//           }
//         },
//         {
//           $lookup: {
//             from: "dosens",
//             localField: "dosen",
//             foreignField: "_id",
//             as: "dosen"
//           }
//         },
//         {
//           $lookup: {
//             from: "matakuliahs",
//             localField: "matakuliah",
//             foreignField: "_id",
//             as: "matakuliah"
//           }
//         },
//       ]).then((data1) => {
//         //res.send(data1);
//         if (!data1) {
//           res.status(503).send({
//             message: "id_matakuliah or id_kelas was not found!"
//           });
//         }else{
//           res.send(data1);
//         }
//       });
//     }).catch((err)=>{
//       res.status(500).send({
//         message: "id_matakuliah or id_kelas not Found!"
//       });
//     });
//   }
// };
exports.deleteAll = (req, res) => {};
 
exports.findAllPublished = (req, res) => {};

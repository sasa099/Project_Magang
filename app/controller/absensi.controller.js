const db = require("../models");
const Absensi = db.absensi;

exports.create = (req, res) => {
  const absensi = new Absensi({
    tanggal: req.body.tanggal,
    jam: req.body.jam,
    'absensi': req.body.absensi,
    // nim:req.body.nim,
    // nama:req.body.nama,
    id_kelas: req.body.id_kelas,
    id_prodi: req.body.id_prodi,
    id_matakuliah: req.body.id_matakuliah,
    jmljam: req.body.jmljam,
    id_ruang: req.body.id_ruang,
    judul: req.body.judul,
    metode: req.body.metode,
    //keterangan:req.body.keterangan,    
  });

  // Save Absensi in the database
  absensi
    .save(absensi)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Absensi.",
      });
    });
};

exports.findAll = (req, res) => {
  const nama = req.query.nama;
  var condition = nama
    ? { nama: { $regex: new RegExp(nama), $options: "i" } }
    : {};

  Absensi.find(condition).populate('id_kelas').populate('id_matakuliah').populate('id_ruang')
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

  Absensi.findById(id).populate("id_kelas").populate("id_matakuliah").populate("id_prodi").populate({path:'absensi',populate:{path:'id_datamhs'}})
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
  const absensi2 = {
    tanggal: req.body.tanggal,
    jam: req.body.jam,
    'absensi': req.body.absensi,
    // nim:req.body.nim,
    // nama:req.body.nama,
    id_kelas: req.body.id_kelas,
    id_prodi: req.body.id_prodi,
    id_matakuliah: req.body.id_matakuliah,
    jmljam: req.body.jmljam,
    id_ruang: req.body.id_ruang,
    judul: req.body.judul,
    metode: req.body.metode,
    //keterangan:req.body.keterangan,         
  }
  Absensi.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Absensi with id=${id}. Maybe Absensi was not found!`,
        });
      } else res.send({ message: "Absensi was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Absensi with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  Absensi.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Absensi with id=${id}. Maybe Absensi was not found!`,
        });
      } else {
        res.send({
          message: "Absensi was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Absensi with id=" + id,
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
        $unwind: "$absensi",
      },
      {
        $group: {
          _id: { id_datamhs: "$absensi.id_datamhs" },
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
          $unwind: "$absensi",
        },
        {
          $group: {
            _id: { id_nama: "$absensi.id_datamhs ", keterangan: "$absensi.keterangan" },
            kelas: { $first: "$id_kelas" },
            jumlah: { $sum: 1 },
          }
        }, {
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

exports.laporan = (req, res) => {
  Absensi.aggregate([
    {
      $project: {
        absensi: 1,
        id_kelas: 1,
        id_matakuliah: 1,
        tanggal: 1,
        jumlah: { $size: "$absensi" },
        jam: 1,
      },
    },

    {
      $unwind: {
        path: "$absensi",
      },
    },

    {
      $match: {
        "absensi.keterangan": "Hadir",
      },
    },

    {
      $group: {
        _id: "$_id",
        kehadiran: { $sum: 1 },
        id_kelas: { $first: "$id_kelas" },
        id_matakuliah: { $first: "$id_matakuliah" },
        tanggal: { $first: "$tanggal" },
        absensi: { $first: "$absensi" },
        jam: { $first: "$jam" },
        jumlah: { $first: "$jumlah" },
      },
    },
    {
      $project: {
        _id: 1,
        id_kelas: 1,
        id_matakuliah: 1,
        absensi: 1,
        mahasiswa: 1,
        tanggal: 1,
        jumlah: 1,
        data: 1,
        kehadiran: 1,
        jam: 1,
        percent: {
          $floor: {
            $multiply: {
              $multiply: [{ $divide: ["$kehadiran", "$jumlah"] }, 100],
            },
          },
        },


      },

    },
    {
      $lookup: {
        from: "kelas",
        localField: "id_kelas",
        foreignField: "_id",
        as: "id_kelas"
      }
    }, 
    {
      $lookup: {
        from: "matkuls",
        localField: "id_matakuliah",
        foreignField: "_id",
        as: "id_matakuliah"
      }
    },
  ]).then((data) => {
    res.send(data);
  });


};

exports.deleteAll = (req, res) => { };

exports.findAllPublished = (req, res) => { };

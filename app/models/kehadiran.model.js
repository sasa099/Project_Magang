const { Schema} = require("mongoose");
module.exports = (mongoose) => {
    const Kehadiran = mongoose.model(
      "kehadiran",mongoose.Schema({
        nim:String,
        nama:String,
        id_kelas:{
          type:Schema.Types.ObjectId,
          ref:'kelas',
        },
        id_prodi:{
          type:Schema.Types.ObjectId,
          ref:'prodi',
        },
        keterangan:String,
        tanggal:String,
      }, {
        timestamps: true
      })
    );
     return Kehadiran;
  };
 
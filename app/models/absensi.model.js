const { Schema} = require("mongoose");
module.exports = (mongoose) => {
    const Absensi = mongoose.model(
      "absensi",mongoose.Schema({
        tanggal:String,
        id_kelas:{
          type: Schema.Types.ObjectId,
          ref: 'kelas',
       },
        kode:String, 
        matakuliah: String,
        jam:{
          masuk:String,
          keluar:String,
        }, 
        jmljam:String,
        ruang:String,
        judul:String,
        metode:String,
      }, {
        timestamps: true
      })
    );
     return Absensi;
  };
 
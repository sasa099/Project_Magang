const { Schema} = require("mongoose");
module.exports = (mongoose) => {
    const Absensi = mongoose.model(
      "absensi",mongoose.Schema({
        tanggal:String,
        jam:{
          masuk:String,
          keluar:String,
        },
        absensi:[{
          id_datamhs:{
            type:Schema.Types.ObjectId,
            ref:'datamhs'
          },
          keterangan:String,
        }],
        id_kelas:{
          type: Schema.Types.ObjectId,
          ref: 'kelas',
       },
        id_matakuliah:{
          type: Schema.Types.ObjectId,
          ref: 'matkul',
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
 
const {Schema} = require("mongoose");
module.exports = (mongoose) => {
    const Absensi = mongoose.model(
      "absensi",mongoose.Schema({
        tanggal:String,
        jam:String,
        absensi:[{
          id_datamhs:{
            type: Schema.Types.ObjectId,
            ref:'datamhs',
         },
         keterangan: String,
       }],
        // nim:String,
        // nama:String,
        id_kelas:{
          type: Schema.Types.ObjectId,
          ref:'kelas',
       },
        id_prodi:{
          type: Schema.Types.ObjectId,
          ref:'prodi',
        },
        id_matakuliah:{
          type: Schema.Types.ObjectId,
          ref:'matkul',
       },
        jmljam:String, 
        id_ruang:{
          type: Schema.Types.ObjectId,
          ref:'ruangan',
       },
        judul:String,
        metode:String, 
      }, {
        timestamps: true
      })
    );
     return Absensi;
  };
 
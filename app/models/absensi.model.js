const {Schema} = require("mongoose");
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
            type: Schema.Types.ObjectId,
            ref:'datamhs',
         },
       }],
       },{
        //nim:String,
        //nama:String,
        id_prodi:{
          type: Schema.Types.ObjectId,
          ref:'prodi',
        },
        //keterangan:String,
        id_kelas:{
          type: Schema.Types.ObjectId,
          ref:'kelas',
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
 
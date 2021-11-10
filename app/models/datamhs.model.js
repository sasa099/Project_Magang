const { Schema} = require("mongoose");
module.exports = (mongoose) => {
    const Datamhs = mongoose.model(
      "datamhs",mongoose.Schema({
        nim:String,
        nik:String,
        nama_depan:String,
        nama_belakang:String,
        jenis_kelamin:String,
        id_prodi:{
          type:Schema.Types.ObjectId,
          ref:'prodi',
        },
        email:String,
        alamat:String,
        notelp:String,
        alamatortu:String,
        kodepos:String,
        kodeposs:String,
        provinsimu:String,
        provinsi:String,
        kotamu:String,
        kota:String,
        kecamatanmu:String,
        id_kelas:{
          type:Schema.Types.ObjectId,
          ref:'kelas',
        },
        foto:String,
        
      }, {
        timestamps: true
      })
    );
     return Datamhs;
  };
 
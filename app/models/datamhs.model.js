module.exports = (mongoose) => {
    const Datamhs = mongoose.model(
      "datamhs",mongoose.Schema({
        nim:String,
        nik:String,
        nama_depan:String,
        nama_belakang:String,
        jenis_kelamin:String,
        prodi:String,
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
        foto:String,
        nik:String,
        gender:String,
        kelas:String,
      }, {
        timestamps: true
      })
    );
     return Datamhs;
  };
 
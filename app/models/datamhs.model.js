module.exports = (mongoose) => {
    const Datamhs = mongoose.model(
      "datamhs",
      mongoose.Schema({
        nim:String,
        nama_depan:String,
        nama_belakang:String,
        prodi:String,
        email:String,
        alamat:String,
        notelp:String,
        alamatortu:String,
        foto:String,
        nik:String,
        gender:String, 
        kelas: String,
      }, {
        timestamps: true
      })
    );
     return Datamhs;
  };
 
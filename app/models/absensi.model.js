module.exports = (mongoose) => {
    const Absensi = mongoose.model(
      "absensi",
      mongoose.Schema({
        tanggal:String,
        kelas:String, 
        kode:String, 
        matakuliah: String,
        jam:String, 
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
 
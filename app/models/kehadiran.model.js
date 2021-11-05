module.exports = (mongoose) => {
    const Kehadiran = mongoose.model(
      "kehadiran",mongoose.Schema({
        nim:String,
        nama:String,
        kelas:String,
        prodi:String,
        keterangan:String,
        tanggal:String,
      }, {
        timestamps: true
      })
    );
     return Kehadiran;
  };
 
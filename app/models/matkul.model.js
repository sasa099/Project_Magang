module.exports = (mongoose) => {
    const Matkul = mongoose.model(
      "matkul",mongoose.Schema({
        kode: String,
        matakuliah:String,
      }, {
        timestamps: true
      })
    );
     return Matkul;
  };
 
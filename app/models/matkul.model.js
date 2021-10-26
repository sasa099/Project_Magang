module.exports = (mongoose) => {
    const Matkul = mongoose.model(
      "matkul",
      mongoose.Schema({
        matakuliah: String,
      }, {
        timestamps: true
      })
    );
     return Matkul;
  };
 
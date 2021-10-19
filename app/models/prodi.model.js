module.exports = (mongoose) => {
    const Prodi = mongoose.model(
      "prodi",
      mongoose.Schema({
        nama_prodi: String,
      }, {
        timestamps: true
      })
    );
     return Prodi;
  };
 
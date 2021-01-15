module.exports = (mongoose) => {
    const Kategori = mongoose.model(
      "kategori",
      mongoose.Schema({
        nama: String,
      }, {
        timestamps: true
      })
    );
     return Kategori;
  };
 
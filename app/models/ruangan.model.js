module.exports = (mongoose) => {
    const Ruangan = mongoose.model(
      "ruangan",
      mongoose.Schema({
        ruang: String,
      }, {
        timestamps: true
      })
    );
     return Ruangan;
  };
 
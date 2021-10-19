module.exports = (mongoose) => {
    const Kehadiran = mongoose.model(
      "kehadiran",
      mongoose.Schema({
        datamhs: String,
        matakuliah: String,
      }, {
        timestamps: true
      })
    );
     return Kehadiran;
  };
 
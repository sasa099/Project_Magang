const { Schema} = require("mongoose");
module.exports = (mongoose) => {
    const Kelas = mongoose.model(
      "kelas",
      mongoose.Schema({
        matakuliah:String,
        kelas:String,
      }, {
        timestamps: true
      })
    );
     return Kelas;
  };
 
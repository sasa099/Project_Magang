const { Schema} = require("mongoose");
module.exports = (mongoose) => {
    const Kelas = mongoose.model(
      "kelas",
      mongoose.Schema({
        matakuliah:{
          type: Schema.Types.ObjectId,
          ref: 'matakuliah',
       },
        kelas:String,
      }, {
        timestamps: true
      })
    );
     return Kelas;
  };
 
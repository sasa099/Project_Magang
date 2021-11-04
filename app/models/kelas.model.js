const { Schema} = require("mongoose");
module.exports = (mongoose) => {
    const Kelas = mongoose.model(
      "kelas",mongoose.Schema({
        id_matakuliah:[{
          type: Schema.Types.ObjectId,
          ref: 'matkul',
       }],
        kelas:String,
      }, {
        timestamps: true
      })
    );
     return Kelas;
  };
 
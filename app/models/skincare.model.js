module.exports = (mongoose) => {
  const { Schema } = require("mongoose");
  const Skincare = mongoose.model(
    "skincare",
    mongoose.Schema({
      foto: String,
  nama: String,
  harga: String,
  takaran: String,
  deskripsi: String,
  loved: String,
  id_kategori: {
    type: Schema.Types.ObjectId,
    ref: 'kategori',
},
    }, {
      timestamps: true
    })
  );
   return Skincare;
};

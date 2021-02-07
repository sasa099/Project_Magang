module.exports = (mongoose) => {
  const { Schema } = require("mongoose");
  const Collection = mongoose.model(
    "collection",
    mongoose.Schema({
      foto: String,
      nama: String,
      
    }, {
      timestamps: true
    })
  );
   return Collection;
};

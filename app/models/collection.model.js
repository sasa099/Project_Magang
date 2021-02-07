module.exports = (mongoose) => {
  const { Schema } = require("mongoose");
  const Collection = mongoose.model(
    "collection",
    mongoose.Schema({
      nama: String,
      foto: String,
      
      
    }, {
      timestamps: true
    })
  );
   return Collection;
};

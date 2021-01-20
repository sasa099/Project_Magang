module.exports = (mongoose) => {
  const { Schema } = require("mongoose");
  const Ingredients = mongoose.model(
    "ingredients",
    mongoose.Schema({
  logo:String,
  nama:String,
      id_skincare: {
    type: Schema.Types.ObjectId,
    ref: 'skincare',
 },
    }, {
      timestamps: true
    })
  );
   return Ingredients;
};
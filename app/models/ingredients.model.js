module.exports = (mongoose) => {
  const { Schema } = require("mongoose");
  const Ingredients = mongoose.model(
    "ingredients",
    mongoose.Schema({
      id_skincare: {
    type: Schema.Types.ObjectId,
    ref: 'skincare',
 },
  nama:String,
  logo:String,
  
    }, {
      timestamps: true
    })
  );
   return Ingredients;
};
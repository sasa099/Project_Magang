const mongoose = require('mongoose'); 
userSchema = mongoose.Schema({
  firstname: String,
  lastname:String,
  email:String,
  password:String,
},{
  timestamps:true
});

module.exports = mongoose.model('user', userSchema);
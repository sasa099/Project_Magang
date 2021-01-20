const dbConfig = require("../db.config.js");
 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
 
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.kategori = require("./kategori.model.js")(mongoose);
db.skincare = require("./skincare.model.js")(mongoose);
db.ingredients = require("./ingredients.model.js")(mongoose);
db.collection = require("./collection.model.js")(mongoose);
module.exports = db;

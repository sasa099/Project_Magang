const dbConfig = require("../db.config.js");
 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
 
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.kelas = require("./kelas.model.js")(mongoose);
db.prodi = require("./prodi.model.js")(mongoose);
db.matkul = require("./matkul.model.js")(mongoose);
db.ruangan = require("./ruangan.model.js")(mongoose);
db.absensi = require("./absensi.model.js")(mongoose);
db.datamhs = require("./datamhs.model.js")(mongoose);
db.kehadiran = require("./kehadiran.model.js")(mongoose);
module.exports = db;

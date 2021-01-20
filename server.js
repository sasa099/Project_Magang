const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const app = express();
 
var corsOptions = {
   origin: "*",
};
 
app.use(cors(corsOptions));
//app.use(bodyParser.json());
app.options("*", cors());
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(express.static("uploads"));
app.use(bodyParser.urlencoded({
   extended: true
}));
db.mongoose
   .connect(db.url, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
   })
   .then(() => {
       console.log("Connected to the database!");
   })
   .catch((err) => {
       console.log("Cannot connect to the database!", err);
       process.exit();
   });
app.get("/", (req, res) => {
   res.json({
       message: "Selamat datang di matakuliah workshop pemrograman framework",
   });
});
require("./app/routes/kategori.routes")(app);
require("./app/routes/skincare.routes")(app);
require("./app/routes/ingredients.routes")(app);
require("./app/routes/collection.routes")(app);
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
   console.log(`Server backend port ${PORT}.`);
});
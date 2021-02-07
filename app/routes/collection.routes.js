module.exports = (app) => {
    const collections = require("../controller/collection.controller.js");
    
    var router = require("express").Router();
    
   // router.post("/", collections.create);
   var multer = require("multer");
   var path = require("path");
   const generateFileName = () => {
       const dateNow = Date.now();
       const random = Math.floor(Math.random() * 9000000000000) + 1000000000000;
       return `${dateNow}-${random}`;
   };
   var upload = multer({
       storage: multer.diskStorage({
           destination: function (req, file, callback) {
               callback(null, "./uploads/gambar");
           },
           filename: function (req, file, callback) {
               callback(
                   null,
                   Date.now() +
                   Math.floor(Math.random() * 9000000000000) +
                   1000000000000 +
                   path.extname(file.originalname)
               );
           },
       }),
       fileFilter: function (req, file, callback) {
           var ext = path.extname(file.originalname);
           if (
               ext !== ".png" &&
               ext !== ".jpg" &&
               ext !== ".gif" &&
               ext !== ".jpeg"
           ) {
               return callback(/*res.end('Only images are allowed')*/ null, false);
           }
           callback(null, true);
       },
   });
   router.post("/", upload.any(), collections.create);

    router.get("/", collections.findAll);
    
    router.get("/:id", collections.findOne);
    
    router.put("/:id", upload.any(), collections.update);
    
    router.delete("/:id", collections.delete);
    
    app.use("/api/collection", router);
   };
   
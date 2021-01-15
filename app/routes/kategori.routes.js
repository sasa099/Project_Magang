module.exports = (app) => {
    const kategoris = require("../controller/kategori.controller.js");
    
    var router = require("express").Router();
    
    router.post("/", kategoris.create);
    
    router.get("/", kategoris.findAll);
    
    router.get("/:id", kategoris.findOne);
    
    router.put("/:id", kategoris.update);
    
    router.delete("/:id", kategoris.delete);
    
    app.use("/api/kategori", router);
   };
   
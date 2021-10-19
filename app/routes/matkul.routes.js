module.exports = (app) => {
    const matkul = require("../controller/matkul.controller.js");
    
    var router = require("express").Router();
    
    router.post("/",matkul.create);
    
    router.get("/", matkul.findAll);
    
    router.get("/:id", matkul.findOne);
    
    router.put("/:id", matkul.update);
    
    router.delete("/:id", matkul.delete);
    
    app.use("/api/matkul", router);
   };
   
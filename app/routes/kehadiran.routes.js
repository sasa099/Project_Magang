module.exports = (app) => {
    const kehadiran = require("../controller/kehadiran.controller.js");
    
    var router = require("express").Router();
    
    router.post("/", kehadiran.create);
    
    router.get("/", kehadiran.findAll);
    
    router.get("/:id", kehadiran.findOne);
    
    router.put("/:id", kehadiran.update);
    
    router.delete("/:id", kehadiran.delete);
    
    app.use("/api/kehadiran", router);
   };
   
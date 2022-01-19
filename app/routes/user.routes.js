const {verifySignUp} = require("../middlewares");
const controller = require("../controller/user.controller");
const middlewareWrapper = require("cors");
const authJwt = require("../middlewares/authJwt");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post("/api/auth/signup",
        [authJwt.checkDuplicateUsernameOrEmail],
      controller.signup
    );
  
    app.post("/api/auth/signin", controller.signin);

  };
  
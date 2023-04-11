const {signupContoller,loginContoller,getAllUsersControllers} = require("../controllers/auth.controller");
 const UserRouter = require("express").Router();
UserRouter.post("/login", loginContoller);
UserRouter.post("/signup",signupContoller);
UserRouter.get("/",getAllUsersControllers);
module.exports = {UserRouter}
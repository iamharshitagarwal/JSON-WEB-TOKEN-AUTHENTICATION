const express = require("express");
const { signin, signup } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup",signup
// (req,res)=>{
// res.send("hello,this is signup");
// }
)
userRouter.post("/signin",signin
//  (req,res)=> {
//     res.send("hello,this is signin");

// }
)
module.exports = userRouter;
const express = require("express");

const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
//profile update API
profileRouter.get("/profile",userAuth,async(req,res)=>{
   try{
    const user = req.user;

    res.send(user)
    }catch(err){
    res.status(404).send("Profile have some error "+err.message);

    }

});

module.exports = profileRouter;
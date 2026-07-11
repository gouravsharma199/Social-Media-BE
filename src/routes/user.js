const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionReq = require("../models/connectionReq");

userRouter.post("/user/request/recived",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionReq = await ConnectionReq.find({
        toUserId:loggedInUser,
        status:"interested"
    });

    res.json({
        message:"data fatched successfully",
        Data : connectionReq
    })
    }catch(err){
        res.status(400).send(" error in user checking request "+err.message);
    }
});

module.exports = userRouter;
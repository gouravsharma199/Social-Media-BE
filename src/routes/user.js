const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionReq = require("../models/connectionReq");

const SAFE_DATA = ["firstName","lastName","age","about","gender","skills"];

userRouter.get("/user/request/recived",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionReq = await ConnectionReq.find({
        toUserId:loggedInUser,
        status:"interested"
        }).populate("fromUserId",SAFE_DATA);

        res.json({
        message:"data fatched successfully",
        Data : connectionReq
        })
    }catch(err){
        res.status(400).send(" error in user checking request "+err.message);
    }
});

userRouter.get("/user/request/accepted",userAuth,async(req,res)=>{

    try{
        const loggedInUser = req.user;

        const connectionReq = await ConnectionReq.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {formUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",SAFE_DATA).populate("toUserId",SAFE_DATA);

        const data = connectionReq.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId
            }
           return row.fromUserId
        });
        res.json({data});
    }
    catch(err){
        res.status(400).send("Error " +err.message)
    }
});

module.exports = userRouter;
const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionReq = require("../models/connectionReq");
const connectionReq = require("../models/connectionReq");
const { set } = require("mongoose");
const User = require("../models/user");

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
                {fromUserId:loggedInUser._id,status:"accepted"}
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

userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const page = parseInt(req.query.page)|| 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit>50?50:limit;
        const skip = (page-1)*limit;
            
        const connectionReq = await ConnectionReq.find({
        $or:[{fromUserId:loggedInUser._id},
            {toUserId:loggedInUser._id}]
        }).select("fromUserId toUserId");
        //select is filter the other data only showing the id
        // console.log(connectionReq);
        //Set() is used to remove duplicate data to store
        const hideUserFeed = new Set();

        connectionReq.forEach((req)=> {
            hideUserFeed.add(req.fromUserId.toString());
            hideUserFeed.add(req.toUserId.toString());
        });
         
        const users = await User.find({
            $and:[
                {_id:{$nin: Array.from(hideUserFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(SAFE_DATA).skip(skip).limit(limit);
        // console.log(users);

        res.send(users);
    }catch(err){
        res.status(400).json({message:"ERR"+err.message});
    }
})

module.exports = userRouter;
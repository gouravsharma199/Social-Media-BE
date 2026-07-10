const express = require("express");
const {userAuth} = require("../middlewares/auth");
const ConnectionReq = require("../models/connectionReq");
const User = require("../models/user");
const mongoose = require("mongoose");

const requestRouter = express.Router();

requestRouter.post("/connectionRequest",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user.firstName+" sended a connection request")
}
    catch(err){
        console.error(" error in user sending request "+err.message);
    }
})


requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested","ignored"];
        if(!allowedStatus.includes(status)){
            return res
            .status(400)
            .json({message:"invalid status "+status})
        }
        const isValidReq = await mongoose.Types.ObjectId.isValid(toUserId)
        if(!isValidReq){
            return res.status(404).json({message:"userID of to sending the request is invalid"})
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message:"user not found in DB"})
        }
        // apply same validation on schema level but both are good
        // if(fromUserId.toString() ===toUserId){
        //     return res.status(400).send({message:"you can not send request to your self"});
        // }

        const alreadyConnectionReq = await ConnectionReq.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        });
        if(alreadyConnectionReq){
           return res.
           status(400)
           .send({message:"Already have a request"})
        }

        const connectionReq = new ConnectionReq({fromUserId,toUserId,status});

        const data = await connectionReq.save();

        res.json(
            {
                message:req.user.firstName+" is "+status+" to "+toUser.firstName,
                data,
            }
        );
    }
    catch(err){
    res.status(400).send("Error"+err.message);
}
});




requestRouter.post("/request/review/:status/:reqId",userAuth,async(req,res)=>{
   
    try{
        const loggedInUser = req.user;
        const {status,reqId} = req.params;

        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"status is not valid"});
        }


        const connectionReq = await ConnectionReq.findOne({
            _id:reqId,
            toUserId:loggedInUser._id,
            status:"interested"
        });
        if(!connectionReq){
            return res.status(404).json({message:"connection Req is not valid"})
        }

        connectionReq.status = status;
        const data = await connectionReq.save();

        res.json({message:"connection Request : "+status, data});

    }
    catch(err){
    res.status(400).send("Error "+err.message);
    }
})
module.exports = requestRouter;
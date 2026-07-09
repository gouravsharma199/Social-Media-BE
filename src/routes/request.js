const express = require("express");
const {userAuth} = require("../middlewares/auth");
const ConnectionReq = require("../models/connectionReq");

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

        const allowedStatus = ["interested","ignore"];
        if(!allowedStatus.includes(status)){
            return res
            .status(400)
            .json({message:"invalid status "+status})
        }
        if(fromUserId ==toUserId){
            return res.status(400).send({message:"you can not send request to your self"});
        }

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
                message:`new connection request`,
                data,
            }
        );
    }
    catch(err){
        console.error(" error in user sending request "+err.message);
    }
});
module.exports = requestRouter;
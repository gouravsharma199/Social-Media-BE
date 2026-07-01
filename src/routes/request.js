const express = require("express");
const {userAuth} = require("../middlewares/auth");

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

module.exports = requestRouter;
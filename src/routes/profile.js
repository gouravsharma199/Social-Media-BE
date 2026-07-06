const express = require("express");

const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateProfileEdit} = require("../utils/validate");

//profile update API
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
   try{
    const user = req.user;

    res.send(user);

    }catch(err){
    res.status(404).send("Profile have some error "+err.message);
    }

});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
   try{ 
        if(!validateProfileEdit(req)){
        throw new Error("req is not valid");
         }
        const oldUserData = req.user;
         console.log(oldUserData);
        Object.keys(req.body).forEach((key)=>(oldUserData[key]=req.body[key]));
          console.log(oldUserData);
         await oldUserData.save();
        res.send("edit sucessfull");
     }
    catch(err){
        res.status(400).send("Error"+err.message);
    }
});

profileRouter.patch("/profile/changePassword",userAuth,async(req,res)=>{
    try{
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("password did not match");
        }
        const isPassword = await user.validatePassword(password);

        }
    catch(err){
                res.status(400).send("Error"+err.message);
        }
})

module.exports = profileRouter;
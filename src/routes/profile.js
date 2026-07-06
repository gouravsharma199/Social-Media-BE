const express = require("express");

const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateProfileEdit,isPasswordValid} = require("../utils/validate");

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
        if(!isPasswordValid(req)){
            throw new Error("password is not strong or Valid")
        }
        const hashPassword = await bcrypt.hash(newPassword,10);
         await user.save();
         res.send("password changes sucessfully")
        }
    catch(err){
                res.status(400).send("Error"+err.message);
        }
})

module.exports = profileRouter;
const express = require("express");
const authRouter = express.Router();
const {validateDataSign} = require("../utils/validate");
const bcrypt = require('bcrypt');
const User = require("../models/user");

//Fist time user Signup or Adding user details to DB
authRouter.post("/signup",async(req,res)=>{

    try{

    //validate data
    validateDataSign(req);

    const {firstName,lastName,emailId,password} = req.body;

    //Encripting the password
    const hashPassword = await bcrypt.hash(password,10);

    
    // Creating new intace of the User model
    const user = new User(
       { firstName,
        lastName,
        emailId,
        password:hashPassword}
    );    
    await user.save();
    res.send("sucessfull added to database");
    }catch(err){
        res.status(400).send("Error in saving data "+err.message)
    }
})

// Login user,sending and creating Cookie and JWT
authRouter.post("/login",async(req,res)=>{
    try{
        
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId:emailId});
       
        if(!user){
            throw new Error("invalid credentials");
        }

        const isPassword = await user.validatePassword(password);
        
        if(isPassword){
            //JWT token creation
            const token =await user.getJwt();
            //creating cookie
            res.cookie("token", token);
            res.send("User login sucess fully");
        }else{
                throw new Error("invalid credentials");
    }
}catch(err){
    res.status(400).send("Error"+err.message);
}
});

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    }).send("user logout sucessfully")
})

module.exports = authRouter;
const jwt = require("jsonwebtoken");
const User = require("../models/user");



const userAuth = async(req,res,next)=>{
 try{
    const token = req.cookies.token;
    if(!token){
        throw new Error("invalid token");
    }
    console.log(req.cookies);
    console.log(req.cookies.token);
    const decodeToken = await jwt.verify(token,"gourav@123");
    const {_id} = decodeToken;

    const user = await User.findById(_id);

    if(!user){
        throw new Error("invalid user in userAuth");
    }
    req.user = user;
    next();
 }
 catch(err){
    res.status(400).send("Error "+err.message);
 }

};

module.exports = {
    userAuth
}
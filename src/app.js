const express = require("express");
const connectDb = require("./config/database");
const {userAuth} = require("./middlewares/auth");
const {validateDataSign} = require("./utils/validate");
const {isStrongPassword } = require("validator");
const bcrypt = require('bcrypt');
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

//server intance
const app = express();


//middleware to read Json data
app.use(express.json());

//middlware for the Cookies
app.use(cookieParser());

//Fist time user Signup or Adding user details to DB
app.post("/signup",async(req,res)=>{

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
app.post("/login",async(req,res)=>{
    try{
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId:emailId});
        
        if(!user){
            throw new Error("invalid credentials");
        }
        const isPassword = await bcrypt.compare(password,user.password);
        
        if(isPassword){
            //JWT token creation
            const token =await jwt.sign({_id:user._id},"gourav@123")
            //creating cookie
            res.cookie("token",token);
            res.send("user credentials are valid");
        }else{
                throw new Error("invalid credentials");
    }
}catch(err){
    res.status(400).send("Error"+err.message);
}
});

//profile update API
app.get("/profile",userAuth,async(req,res)=>{
   try{
    const user = req.user;

    res.send(user)
    }catch(err){
    res.status(404).send("Profile have some error "+err.message);

    }

});

app.post("/connectionRequest",userAuth,async(req,res)=>{
    try{const user = req.user;
    res.send(user.firstName+" sended a connection request")
}
    catch(err){
        console.error(" error in user sending request "+err.message);
    }
})

//connectiong DB then start the server
connectDb().then(()=>{
    console.log("Database sucessfully connected");
    app.listen(222,()=>{
    console.log("server is running on 222");
});
}).catch((err)=>{
    console.error("Data base have some error"+err.message);
});

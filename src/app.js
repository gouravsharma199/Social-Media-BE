const express = require("express");
const connectDb = require("./config/database");
const {adminAuth} = require("./middlewares/auth");
const {validateDataSign} = require("./utils/validate");
const {isStrongPassword } = require("validator");
const bcrypt = require('bcrypt');
const User = require("./models/user");
const cookieParser = require("cookie-parser");

//server intance
const app = express();


//middleware to read Json data
app.use(express.json());

//middlware for the Cookies
app.use(cookieParser());


//Single User Details
app.get("/user",async(req,res)=>{

    const userID = req.body.emailId
    try{
    const user = await User.find({emailId:userID});
    if(user.length===0){
        res.status(404).send("user not found");
    }else{
        res.send(user);
    }
    
     }
     catch(err) {
        res.status(400).send("something went wrong")

        }
});

//All user Details API
app.get("/feed",async(req,res)=>{
    try{
        const user = await User.find({});
        if(user.length===0){
        res.status(404).send("user not found");
    }else{
        res.send(user);
    }
    }
    catch(err){
        res.status(404).send("User data not found"+err.message);
    }
})


//Fist time user Signup or Adding user details to DB
app.post("/signup",async(req,res)=>{

    try{

    //validate data
    validateDataSign(req);

    const {firstName,lastName,emailId,password} = req.body;

    //Encripting the password
    const hashPassword = await new bcrypt.hash(password,10);

    
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

            //creating cookie
            res.cookie("token","randomNumberAndValue100");
            res.send("user credentials are valid");
        }else{
                throw new Error("invalid credentials");
    }
}catch(err){
    res.status(400).send("Error"+err.message);
}
});

//profile update API
app.post("/profile",async(req,res)=>{
    const cookies = req.cookies;

    const {token} = cookies;
    //check token validation
    

    console.log(cookies);
    res.send("cookie sending")

});


//delate the user by id
app.delete("/user",async(req,res)=>{
   const uId = req.body.uId;
   console.log(uId);

   try{
    const user = await User.findByIdAndDelete(uId);
    res.send("user deleted successfully"+user)
   }
   catch(err){
    res.status(404).send("user is not delated"+err.message);

   }
});


//update the user details and check user can't add important fiels like Email
app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params.userId;
    const data = req.body;
    //data sanatization
    try{
        const ALLOWED_UPDATE = ["age","gender","skills","about"];
        const isAllowed = Object.keys(data).every((key) =>ALLOWED_UPDATE.includes(key));
        if(!isAllowed){
            throw new Error("update is not allowed")
        }
        if(data?.skills.length>10){
            throw new Error("more then 10 skills not allowed");
        }

        const user = await User.findByIdAndUpdate({_id:userId},data,{runValidators:true});
        res.send("user updated sucessfully",user);

    }
    catch(err){
        res.status(404).send("user is not updated "+err.message);

    }

});

//connectiong DB then start the server
connectDb().then(()=>{
    console.log("Database sucessfully connected");
    app.listen(222,()=>{
    console.log("server is running on 222");
});
}).catch((err)=>{
    console.error("Data base have some error"+err.message);
});

const express = require("express");
const connectDb = require("./config/database");
const {adminAuth} = require("./middlewares/auth");
const app = express();

const User = require("./models/user");

app.use(express.json());

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

app.post("/signup",async(req,res)=>{
    const user = new User(req.body);
    try{
    await user.save();
    res.send("sucessfull added to database");
    }catch(err){
        res.status(400).send("Error in saving data"+err.message)
    }
})

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

app.patch("/user",async(req,res)=>{
 const userId = req.body.userId;
 const data = req.body;
try{
  const user = await User.findByIdAndUpdate({_id:userId},data);
  res.send("user updated sucessfully",user);
}
 catch(err){
    res.status(404).send("user is not delated"+err.message);

   }

});


connectDb().then(()=>{
    console.log("Database sucessfully connected");
    app.listen(222,()=>{
    console.log("server is running on 222");
});
}).catch((err)=>{
    console.error("Data base have some error"+err.message);
});











// app.get("/admin/allData",(req,res)=>{
//      throw new Error("aa gyi error");
//     res.send("admin can see all the data");  
// });


// app.delete("/admin/delate",(req,res)=>{
//     res.send("admin is deleted all the data");
// })

// app.use("/",(error,req,res,next)=>{
//     if(error){
//         res.status(500).send("something went wrong");
//     }
// })
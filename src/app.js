const express = require("express");
const connectDb = require("./config/database");
const {adminAuth} = require("./middlewares/auth");
const app = express();

const User = require("./models/user");

app.use(express.json());

app.post("/signup",async(req,res)=>{
    const user = new User(req.body);
    try{
    await user.save();
    res.send("sucessfull added to database");
    }catch(err){
        res.status(400).send("Error in saving data"+err.message)
    }
})


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
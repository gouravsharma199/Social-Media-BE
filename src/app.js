const express = require("express");

const app = express();



app.use("/abc",(req,res)=>{
    res.send("abc page");
});
app.use("/test",(req,res)=>{
    res.send("test page");
});
app.use("/",(req,res)=>{
    res.send("Home page adfsd");
});


app.listen(222,()=>{
    console.log("server is running on 222");
});
const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
    res.send({"Gourav":"kaamchor",Age:"27"});
});

app.post("/user",(req,res)=>{
    res.send("Post method work Perfect");
});

app.delete("/user",(req,res)=>{
    res.send("Delate successfully")
})

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
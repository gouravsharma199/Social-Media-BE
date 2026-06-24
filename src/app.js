const express = require("express");

const app = express();

const {adminAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);
app.get("/admin/allData",(req,res)=>{
    res.send("admin can see all the data");
});


app.delete("/admin/delate",(req,res)=>{
    res.send("admin is deleted all the data");
})







// app.get("/user",(req,res)=>{
//     res.send({"Gourav":"kaamchor",Age:"27"});
// });

// app.post("/user",(req,res)=>{
//     res.send("Post method work Perfect");
// });

// app.delete("/user",(req,res)=>{
//     res.send("Delate successfully")
// })

// app.use("/abc",(req,res)=>{
//     res.send("abc page");
// });
// app.use("/test",(req,res)=>{
//     res.send("test page");
// });
// app.use("/",(req,res)=>{
//     res.send("Home page adfsd");
// });


app.listen(222,()=>{
    console.log("server is running on 222");
});
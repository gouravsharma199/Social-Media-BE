const express = require("express");
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");

//server intance
const app = express();


//middleware to read Json data
app.use(express.json());
app.use(cookieParser());


const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


connectDb().then(()=>{
    console.log("Database sucessfully connected");
    app.listen(222,()=>{
    console.log("server is running on 222");
});
}).catch((err)=>{
    console.error("Data base have some error "+err.message);
});

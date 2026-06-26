const mongoose = require("mongoose");

const connectDb =async () =>{
    await mongoose.connect("mongodb+srv://gouravsharma09:Hrishantmo%2327@cluster0.j6wfrjp.mongodb.net/devSocial");
    
} 

module.exports = connectDb;


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:100
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String   
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(![male,female,others].includes.value){
                throw new Error("Please enter Valid Gender");
            }
        }
    },
    skills:{
        type:[String]
    },
    about:{
        type:String,
        default:"You are under Gourav Sharma project"
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema);
const mongoose = require("mongoose");
const validator = require("validator");
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
        trim:true,
        valicate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please Enter a Valid Email")
            }
        }
    },
    password:{
        type:String,
        required:true,
         valicate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please Enter a stronge password ")
            }
        }   
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
    },
    photoURL:{
        type:String,
        default:"https://www.google.com/imgres?q=dummy%20profile%20image&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F045%2F711%2F185%2Fnon_2x%2Fmale-profile-picture-placeholder-for-social-media-forum-dating-site-chat-operator-design-social-profile-template-default-avatar-icon-flat-style-free-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F45711185-male-profile-picture-placeholder-for-social-media-forum-dating-site-chat-operator-design-social-profile-template-default-avatar-icon-flat-style&docid=1a0-4etmnl2fdM&tbnid=JXac1Ja-49_NwM&vet=12ahUKEwjT0MSf3qmVAxUw3DgGHUNVOGEQnPAOegQIKBAB..i&w=980&h=980&hcb=2&ved=2ahUKEwjT0MSf3qmVAxUw3DgGHUNVOGEQnPAOegQIKBAB",
        valicate(value){
            if(!validator.isURL(value)){
                throw new Error("Please Enter a Valid URL ")
            }
        }
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema);
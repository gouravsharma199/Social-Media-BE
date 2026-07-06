const validator = require("validator");

const validateDataSign = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("please enter a valid name ")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Please enter a valid email ")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a Strong password ")
    }
}

const validateProfileEdit = (req)=>{
    const allowedFields = ["firstName","lastName","gender","age","skills","about","photoURL"];

    const validEditFields = Object.keys(req.body).every((field)=>allowedFields.includes(field));
    return validEditFields;
}


const isPasswordValid = (req)=>{
    const {password} = req.body;
    const user = await User.findOne({emailId:emailId});
}

module.exports = {validateDataSign,validateProfileEdit,isPasswordValid};
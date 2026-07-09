const mongoose = require("mongoose");
const { applyTimestamps } = require("./user");

const connectionReqSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId
    },
    status:{
        type:String,
        enum:{
            values:["ignore","interested","accepted","rejected"],
            message:`{value} is not valid`
        }  

    }
},
{
    timestamps : true
}
);

module.exports = new mongoose.model("ConnectionReq",connectionReqSchema);
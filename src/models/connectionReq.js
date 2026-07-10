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
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is not valid`
        }  

    }
},
{
    timestamps : true
}
);

connectionReqSchema.index({fromUserId:1,toUserId:1});

connectionReqSchema.pre("save",function(next){
    // const connectionReq = this;
    //check user can not send request to him self
    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("user cant send a request to him self");
    }
    
})

module.exports = new mongoose.model("ConnectionReq",connectionReqSchema);
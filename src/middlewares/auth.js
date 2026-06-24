const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const istoken = token==="xyz";
    if(!istoken){
        res.status(401).send("admin token is not valid");

    }else{
        next();
    }

};

module.exports = {
    adminAuth
}
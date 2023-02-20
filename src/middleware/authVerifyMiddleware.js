const jwt=require("jsonwebtoken")

exports.veryfiToken=(req,res,next)=>{
    try{
        const tokenKey=req.headers["token"]
        const decoded=jwt.verify(tokenKey,process.env.SECRET_KEY)
        const {email}=decoded
        req.email=email
        next()
    }
    catch (e){
        res.status(400).json({
            message:e.message
        })
    }
}

const {
    UserLogInServices, updateProfileServices, userDetailServices

} = require("../services/userServices")

const auth = require("../helper/auth")


const userModel = require("../models/userModel")

const OTPModel = require("../models/OTPModels")
const sendEmailUtility = require("../utility/sendEmailUtility")






exports.registrationUser = (req, res) => {

    let reqBody = req.body
    userModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(200).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })


}

exports.loginUser = async (req, res) => {


    try {

        const body = req.body
        const result = await UserLogInServices(body)

        const token = auth.createToken(result)

        if (result.length > 0) {
            res.status(200).json({
                status: "sucess",
                data: result,
                token: token
            })
        }

        else {
            res.status(401).json({ status: "unauthorized" })

        }
    }
    catch (e) {
        res.status(400).json({
            status: "Login Failed"
        })

    }

}


exports.updateProfile = async (req, res) => {
    try {
        const email = req.email
        const body = req.body
        const result = await updateProfileServices(email, body)
        res.status(200).json({
            status: "sucess",
            data: result
        })
    }
    catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }

}

exports.userDetails = async (req, res) => {
    try {

        const email = req.email

        const result = await userDetailServices(email)

        res.status(200).json({
            status: "sucess",
            data: result
        })
    }


    catch (e) {
        res.status(400).json({
            status: "failed",
            data: e.message
        })


    }
}





exports.RecoverVerifyEmail = async (req, res) => {
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);
    try {
        // Email Account Query
        let UserCount = (await userModel.aggregate([{ $match: { email: email } }, { $count: "total" }]))
        if (UserCount.length > 0) {
            // OTP Insert

            const isExitEmail = await OTPModel.findOne({ email })

            if (isExitEmail) {
                await OTPModel.updateOne({ email: email }, { $set: { otp: OTPCode, status: 0 } });
            } else {
                await OTPModel.create({ email: email, otp: OTPCode })
            }

            // Email Send
            let sendEmail = await sendEmailUtility(email, "Your PIN Code is= " + OTPCode, "Task Manager PIN Verification")

            res.status(200).json({
                status: "success",
                data: sendEmail
            })
        }
        else {
            res.status(400).json({
                status: "fail",
                error: "No User Found"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: "fail",
            error: err.message
        })
    }
}


exports.RecoverVerifyOTP = async (req, res) => {

    let email = req.params.email
    let OTPCode = req.params.otp
    let status =0
    let statusUpdate = 1

    
    
try{


    let OTPCount = await OTPModel.aggregate([{$match:{email:email,otp:OTPCode,status:status}}, {$count: "total"}])

    if (OTPCount.length>0) {

     const OTPUPDATE=await OTPModel.updateOne({email: email, otp:OTPCode, status:status},{
            email: email,
            otp: OTPCode,
            status:statusUpdate
        })
        res.status(200).json({
            status: "success",
            data:OTPUPDATE

        })
    }


    else{
        res.status(500).json({
            status: "failed",
            message:"OTP ALREADY USED"

        })
    }
}
catch(error){
    res.status(400).json({
        status: "fail",
        data:error
    })
}
   
    









}

exports.RecoverPassreset = async (req, res) => {

    let email = req.body.email
    let OTPCode = req.body.otp
   let newPass=req.body.password
let statusUpdate=1
    
try{


    let OTPCount = await OTPModel.aggregate([{$match:{email:email,otp:OTPCode,status:statusUpdate}}, {$count: "total"}])

    if (OTPCount.length>0) {

     const PassUPDATE=await userModel.updateOne({email: email},{password:newPass})
        res.status(200).json({
            status: "success",
            data:PassUPDATE
       })
       }
   else{
        res.status(400).json({
            status: "failed",
            message:"PassWord Change Failed"

        })
    }
}
catch(error){
    res.status(400).json({
        status: "fail",
        data:error
    })
}

}

const express=require("express")
const router=express.Router()

const {registrationUser,loginUser,updateProfile,userDetails}=require("../controllers/user")

const{veryfiToken}=require("../middleware/authVerifyMiddleware")
const{RecoverVerifyEmail,RecoverVerifyOTP,RecoverPassreset}=require("../controllers/user")


router.post("/registrationUser",registrationUser)
router.post("/loginUser",loginUser)
router.post("/updateProfile",veryfiToken,updateProfile)
router.get("/userDetails",veryfiToken,userDetails)



router.post("/recoverMail/:email",RecoverVerifyEmail)
router.post("/RecoverVerifyOTP/:email/:otp",RecoverVerifyOTP)
router.post("/RecoverPassreset",RecoverPassreset)
module.exports=router
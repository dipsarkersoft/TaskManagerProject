class SessionHelper{

    setToken(token){
        localStorage.setItem("token",token)
    }
    getToken(){
       return  localStorage.getItem("token")
    }
    setUserDetails(UserDetails){
        localStorage.setItem("UserDetails",JSON.stringify(UserDetails))
    }

   getUserDetails(){
       return  JSON.parse(localStorage.getItem("UserDetails"))
    }
    removeSession(){
        localStorage.clear()
        window.location.href="/login"
    }

    setEmail(email){
        localStorage.setItem("email",email)
    }
    getEmail(){
        return  localStorage.getItem("email")
    }

    setOTP(OTP){
        localStorage.setItem("OTP",OTP)
    }
    getOTP(){
        return  localStorage.getItem("OTP")
    }


}

export const {setEmail,getEmail,setOTP,getOTP,setToken,getToken,setUserDetails,getUserDetails,removeSession}=new SessionHelper()

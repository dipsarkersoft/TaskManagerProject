import axios from "axios";

import {ErrorToast, SuccessToast} from "../helper/FormHelper";
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/stateSlice/settingSlice";
import {getToken, setEmail, setOTP, setToken, setUserDetails} from "../helper/SessionHelper";
import {setCanceledTask, setCompletedTask, setNewTask, setProgressTask} from "../redux/stateSlice/taskSlice"
import { SetSummary } from "../redux/stateSlice/SummerySlice";
import {SetProfile} from "../redux/stateSlice/Profile";
import {toArray} from "antd/es/form/util";

const BaseUrl="http://localhost:8000/api/v1"
const AxiosHeader={headers:{"token":getToken()}}


export function Registration(firstName,lastName,mobile,password,email,photo) {

store.dispatch(ShowLoader())
    const url=BaseUrl+"/registrationUser"
    const body={
        firstName:firstName,
        lastName:lastName,
        mobile:mobile,
        password:password,
        email:email,
        photo:photo
    }

    return axios.post(url,body)

        .then((res)=> {

            store.dispatch(HideLoader())
            if(res.status===200){
               if(res.data['status']==="fail"){
                    if(res.data['data']['keyPattern']['email']===1){
                        ErrorToast("Email Already Exist")
                        return false;
                    }

                    else{
                        ErrorToast("Something Went Wrong")
                        return false;
                    }
                }
                else {
                    SuccessToast("Registration Success")
                    return true;

                }
            }
            else{
                ErrorToast("Something Went Wrong")
                return  false;
            }

        })

        .catch((error)=>{
            store.dispatch(HideLoader())
            ErrorToast(" Went Wrong")
            return false
        })

}



export function LoginFunction(email,password){
    store.dispatch(ShowLoader())
    const url=BaseUrl +"/loginUser"
    const body={
        "email":email,
        "password":password
    }

   return  axios.post(url,body)

        .then((result)=>{

            store.dispatch(HideLoader())
            if (result.status===200){

                setToken(result.data["token"])
                setUserDetails(result.data["data"])
                SuccessToast("Login Sucess")
                return true

            }
            else {
                ErrorToast("Invalid Email or Password")
                return  false;
            }


        })
        .catch((error)=>{
            ErrorToast("Something Went Wrong")
            store.dispatch(HideLoader())
            return false;
        })
}


export function NewTaskRequest(title,description){



    store.dispatch(ShowLoader())
    const url=BaseUrl+"/createTask"
    const body={
        "title":title,"description":description,status:"New"
    }

   return  axios.post(url,body,AxiosHeader)
        .then((res)=>{
            store.dispatch(HideLoader())

        if(res.status===200){
            SuccessToast("New Task Created")
            return true;

        }
        else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
        .catch((error)=>{
            ErrorToast("Something Went Wrong")
            store.dispatch(HideLoader())
            return false;
        })

}


export function TaskListByStatus(status){
    store.dispatch(ShowLoader())

    let url=BaseUrl+"/taskListBystatus/" +status

          axios.get(url,AxiosHeader)

       .then((res)=>{


            store.dispatch(HideLoader())

            if(res.status===200){


                if(status==="New"){

                 store.dispatch(setNewTask(res.data["data"]))

                }
                else if(status==="Completed"){
                    store.dispatch(setCompletedTask(res.data["data"]))
                }
                else if(status==="Canceled"){
                    store.dispatch(setCanceledTask(res.data["data"]))
                }
                else if(status==="Progress"){
                    store.dispatch(setProgressTask(res.data["data"]))
                }
         }

            else {
                ErrorToast("Something Went Wrong")
            }
        }).catch((error)=>{
            console.log(error)
        ErrorToast("Something  Wrong")
        store.dispatch(HideLoader())
    })



}


export function SummaryRequest(){

    store.dispatch(ShowLoader())

    const url=BaseUrl+"/taskListCount"


   axios.get(url,AxiosHeader)

   .then((res)=>{
       store.dispatch(HideLoader())

    if(res.status===200){

       let data=store.dispatch(SetSummary(res.data["data"]))
    }
    else{
        ErrorToast("Something Went Wrong")
    }

   })
   .catch(()=>{
    ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
   })

}



export function DeleteRequest(id){

    store.dispatch(ShowLoader())

    const url=BaseUrl+"/deleteTask/"+id

    return  axios.delete(url,AxiosHeader)

        .then((res)=>{
            store.dispatch(HideLoader())
            console.log(res)
            if(res.status===200){

                SuccessToast("Delete Sucessfull")
                return true
            }
            else{
                ErrorToast("Something Went Wrong")
                return false
            }

        })
        .catch(()=>{
            ErrorToast("Something Went Wrong")
            store.dispatch(HideLoader())
            return false
        })

}


export function UpdateStatusRequest(id,status){

    store.dispatch(ShowLoader())

    const url=BaseUrl+"/updateTask/"+id+"/"+status

  return  axios.get(url,AxiosHeader)

        .then((res)=>{

            store.dispatch(HideLoader())

            if(res.status===200){
                console.log(res)
                SuccessToast("update Sucessfull")
                return true
            }
            else{
                ErrorToast("Something  Wrong")
                return false
            }

        })
        .catch((error)=>{
            ErrorToast("Something Went Wrong")
            store.dispatch(HideLoader())
            return false
        })

}

export function GetProfileDetails(){
    store.dispatch(ShowLoader())
    let URL=BaseUrl+"/userDetails";
    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
           store.dispatch(SetProfile(res.data['data'][0]))

        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}



export function UpdateRequest(firstName,lastName,mobile,password,email,photo) {

    store.dispatch(ShowLoader())
    const url=BaseUrl+"/updateProfile"
    const body={
        firstName:firstName,
        lastName:lastName,
        mobile:mobile,
        password:password,
        email:email,
        photo:photo
    }
    const UserDetails={
        firstName:firstName,
        lastName:lastName,
        mobile:mobile,
        email:email,
        photo:photo
    }

   return  axios.post(url,body,AxiosHeader)

        .then((res)=> {

            store.dispatch(HideLoader())
            if(res.status===200){
                SuccessToast("Profile Update Success")
                setUserDetails(toArray(UserDetails))
                return true;

  }
            else{
                ErrorToast("Something Went Wrong")
                return  false;
            }

        })

        .catch((error)=>{
            console.log(error)

            store.dispatch(HideLoader())
            ErrorToast(" Went Wrong")
            return false
        })

}


export function RecoVerifiEmailRequest(email) {

    store.dispatch(ShowLoader())

    const url=BaseUrl+"/recoverMail/"+email

   return  axios.post(url)

        .then((res)=>{
            store.dispatch(HideLoader())

            if(res.status===200) {
               if(res.data["status"]==="fail"){
                   ErrorToast("No user Found")
                   return false
               }
               else {
                   setEmail(email)
                   SuccessToast("6 digit code  has been sent your email")
                   return  true

               }
            }
            else{
                ErrorToast("Something Went Wrong")

            }
        })
        .catch(()=>{
            ErrorToast("Something Went Wrong")
            store.dispatch(HideLoader())
        })


}


export function VerifiOTPRequest(email,OTP) {


    store.dispatch(ShowLoader())

    const url=BaseUrl+"/RecoverVerifyOTP/"+email+"/"+OTP

     return  axios.post(url)
        .then((res)=>{
            store.dispatch(HideLoader())

            if(res.status===200) {
                if(res.data["status"]==="fail") {
                    ErrorToast("Invalid OTP")
                    return false
                }
                else {
                    setOTP(OTP)
                    SuccessToast("Verification Sucess")
                    return true
                }
            }

            else{
                ErrorToast("Something Went Wrong")
            }
        })
        .catch(()=>{
            ErrorToast("Something Went Wrong")
            store.dispatch(HideLoader())
        })

}

export function ResetRequest(email,otp,password) {


    store.dispatch(ShowLoader())

    const url=BaseUrl+"/RecoverPassreset"

    const body={
        email:email,
        otp:otp,
        password:password

    }
    return  axios.post(url,body)
        .then((res)=>{
            store.dispatch(HideLoader())

            if(res.status===200) {

                if(res.data["status"]==="fail") {
                    ErrorToast("PassChangeFailed")
                    return false
                }
                else {
                    SuccessToast("PassChange Sucess")
                    return true
                }

            }
            else{
                ErrorToast("Something  Wrong")
            }
        })
        .catch(()=>{
            ErrorToast("Something Went Wrong")
            store.dispatch(HideLoader())
        })

}
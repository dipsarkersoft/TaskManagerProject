import React, {useRef} from 'react';
import {ErrorToast, IsEmpty} from "../helper/FormHelper";
import {ResetRequest} from "../ApiRequest/apiRequest";
import {getEmail, getOTP, removeSession} from "../helper/SessionHelper";
import {useNavigate} from "react-router-dom";

const CreatePass = () => {

    const navigate=useNavigate()
     let PasswordRef,ConfirmPasswordRef=useRef();

const ResetPass = () => {



    let Password = PasswordRef.value;
    let ConfirmPassword =  ConfirmPasswordRef.value;

    if(IsEmpty(Password)){
        ErrorToast("Password Required")
    }
    else if(IsEmpty(ConfirmPassword)){
        ErrorToast("Confirm Password Required")
    }
    else if(Password!==ConfirmPassword){
        ErrorToast("Password & Confirm Password don't Match")
    }
    else {
        ResetRequest(getEmail(),getOTP(),Password).then((res)=>{
            if(res===true){
                removeSession()
                navigate("/login")
            }


        })

    }

}

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>SET NEW PASSWORD</h4>
                                <br/>
                                <label>Your email address</label>
                                <input value={getEmail()} readOnly={true} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <label>New Password</label>
                                <input ref={(input)=>PasswordRef=input}   placeholder="New Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <label>Confirm Password</label>
                                <input ref={(input)=>ConfirmPasswordRef=input}  placeholder="Confirm Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <button onClick={ResetPass} className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePass;
import React, {useRef} from 'react';
import {ErrorToast, IsEmail} from "../helper/FormHelper";
import {RecoVerifiEmailRequest} from "../ApiRequest/apiRequest";
import {useNavigate} from "react-router-dom";


const SendOtp = () => {

    const navigate=useNavigate()

    let emailRef=useRef()

    const VerifiMail = () => {

        const email=emailRef.value

        if(IsEmail(email)){
            ErrorToast("Valid Email Adress Requied")
        }
        else {
            RecoVerifiEmailRequest(email).then((res)=>{
                if(res===true){
                    navigate("/verifyOtp")
                }
            })
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6 center-screen">
                    <div className="card w-90  p-4">
                        <div className="card-body">
                            <h4>EMAIL ADDRESS</h4>
                            <br/>
                            <label>Your email address</label>
                            <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                            <br/>
                            <button onClick={VerifiMail}   className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendOtp;
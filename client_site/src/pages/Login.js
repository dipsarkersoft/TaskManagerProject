
import {React, Suspense, lazy, useRef} from 'react';
import {ErrorToast, IsEmail, IsEmpty} from "../helper/FormHelper";
import {LoginFunction} from "../ApiRequest/apiRequest";


const Login = () => {

    let passRef,emailRef=useRef();

    const SubmitLogin=()=>{
        let email=emailRef.value;
        let pass=passRef.value;
        if(IsEmail(email)){
            ErrorToast("Invalid Email Address")
        }
        else if(IsEmpty(pass)){
            ErrorToast("Password Required")
        }
        else{
            LoginFunction(email,pass).then((result)=>{
                if(result===true){
                    window.location.href="/"
                }
            })


        }
    }


    return (
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 col-sm-12">
                        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                            <div className="card-header text-center">
                                <h3>Login</h3>
                            </div>
                            <div className="card-body">

                                    <div className="form-group">
                                        <label >Email</label>
                                        <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input ref={(input)=>passRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                    </div>
                                    <div className="button">
                                        <button onClick={SubmitLogin} className="btn btn-primary btn-block">LOGIN</button>
                                    </div>
                                <div className="last">


                                        <li>
                                            <a href="/sendotp">Forgot Password?</a>
                                        </li>
                                        <li>
                                            Don’t have an account? <a href="/registration">Sign up</a>
                                        </li>

                                </div>
                            </div>
                        </div>
                    </div>

            </div>
                </div>




    );
};

export default Login;
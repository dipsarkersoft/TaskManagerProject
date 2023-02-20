import React, {useEffect, useRef} from 'react';
import {GetProfileDetails ,UpdateRequest} from "../ApiRequest/apiRequest";
import {useSelector} from "react-redux";
import {ErrorToast, getBase64, IsEmail, IsEmpty, IsMobile} from "../helper/FormHelper";
import {useNavigate} from "react-router-dom";

const Profile = () => {

    let emailRef,firstNameRef,lastNameRef,mobileRef,passwordRef,userImgRef,userImgView=useRef();
    const navigate=useNavigate()

    useEffect(()=>{
        GetProfileDetails()
    },[])


    const ProfileData=useSelector((state)=>state.profile.value)

    const PreviewImage = () => {
        let ImgFile = userImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            userImgView.src=base64Img;
        })
    }

    const ProfileUpdate = () => {

        const firstName= firstNameRef.value
        const lastName= lastNameRef.value
        const mobile=  mobileRef.value
        const password= passwordRef.value
        const email=emailRef.value
        const photo=userImgView.src

        if(IsEmail(email)){
            ErrorToast("Valid Email Address Required !")
        }
        else if(IsEmpty(firstName)){
            ErrorToast("First Name Required !")
        }
        else if(IsEmpty(lastName)){
            ErrorToast("Last Name Required !")
        }
        else if(!IsMobile(mobile)){
            ErrorToast("Valid Mobile  Required !")
        }
        else if(IsEmpty(password)){
            ErrorToast("Password Required !")
        }
        else {
            UpdateRequest(firstName,lastName,mobile,password,email,photo).then((res)=>{
                if(res===true){
                   window.location.reload()

                }
            })


        }
    }

    return (


        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img  ref={(input)=>userImgView=input} className="icon-nav-img two" src={ProfileData['photo']} alt=""/>
                                <hr/>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Profile Picture</label>
                                        <input onChange={PreviewImage}  ref={(input)=>userImgRef=input} placeholder="User Email" className="form-control animated fadeInUp " type="file"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Email Address</label>
                                        <input key={Date.now()} defaultValue={ProfileData['email']}  readOnly={true}  ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>First Name</label>
                                        <input  key={Date.now()} defaultValue={ProfileData['firstName']} ref={(input)=>firstNameRef=input} placeholder="First Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Last Name</label>
                                        <input key={Date.now()} defaultValue={ProfileData['lastName']}  ref={(input)=>lastNameRef=input} placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Mobile</label>
                                        <input key={Date.now()} defaultValue={ProfileData['mobile']} ref={(input)=>mobileRef=input} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Password</label>
                                        <input key={Date.now()} defaultValue={ProfileData['password']}  ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <button onClick={ProfileUpdate}  className="btn w-100 float-end btn-primary animated fadeInUp">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Profile;
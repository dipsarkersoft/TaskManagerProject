import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {ErrorToast, IsEmail, IsEmpty, IsMobile} from "../helper/FormHelper"
import {Registration} from "../ApiRequest/apiRequest";

const RegistrationFunc = () => {

    let firstNameRef,lastNameRef,mobileRef,passwordRef,emailRef=useRef()
    const navigate=useNavigate()

    const RegistrationSubmit = () => {

        const firstName= firstNameRef.value
        const lastName= lastNameRef.value
        const mobile=  mobileRef.value
        const password= passwordRef.value
        const email=emailRef.value
        const photo="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABU5JREFUWEeF133IZXURB/DPbObu6ma7LLmZYmi+paT9kURqmYEVpCUhipu9EJmlUL4koiVFkJpkFCQlGLsba2+kf5ivKGoRRUG0LWWpu76VbQVlu6brmuvEnHPuc++599xnLzzPvWfO7ze/me/MfGd+YeETyPEjOskS7IdVxEHkSTgqwqrMRr4X/tP9/Q3342HsIP5NjpWWwtI6LeqdOn6og/fFwcJp0nvwNixbMK0zsdE7Nn8nfocHgo0pniafnXNGo2Gsb7QqGq8Okd4dnJ28fZ6CvrzDrP3ahd8SG8ifCtsmAW6XRGdA34qlwfHJ5/CBxSxvsI0+pLPr41nyJ8S15FN4YXLNCL2RbG+8Axvwuh44sykyA93gknF0tuIS3IWXxmB3v4K9kjdjPY5ZFPIhr0enL2IFthBnkptHKTNCoBKuku0q6eMzhTFX6eKntXp6aypB78Fn8JfR2/p+FT6Cb+0x2cLL0n+bsgs7pZexD1Zgdas05FRJT+jdHqxPriB2lnnl/RuFb8uJbB92rmL3BO7GnfgjnheOlU7E+cKBC2f3iqIHxpM4L7i3orky+RSumYSr2ds3og6vA6/Gj8ceLSwqFE7DdXj9XCTb5YXgD4ML6/FQYX3P+2GCqRK6GLcOEUfHolVF78T3m3BMODBFVmXfFuGDJa8NBenSdsP00kZY3v8a70PFcH6EeQ0+j88OoNTa3tLxNuHyerwKXx4gkMljCrIf4JO9dZOWjH+vELFW5o2Ttd7vMo0N26WbatuGaCugocY5vv0L1w/myazlReOVkA8OIjAWFlXfWxVzm3R6X8+MITuwLrio39pm/Co1y3FGkweL03Rt/n0teTA5eS607YsXiZ9H5JmZtu8hwysHrsRFi+ZK+/Lh+vpFcGLbWKYj0Ao68T/wRdw449l43yu7lr1OOHScqXNNebQQuD3b7B6yYEIau8nq82tRg8dzE0gEsYw8Fl/VITqToyNiahto+by5RBvxoWEbZ6S7ia3kNfgl8QJZsv3INzVMyLtmnRnU/mJNT/XmOuKyXvYvrO9t3N2OWQ33V6ZXSB5HTTtHY00H4Sua3hKWtCEY7gzBjuR7Bd17yVu77B3Kr1JTQ8SW4LYs7hdHk28QVkpLupp+KHgseXVHWAePdM7JgApjQ0SHNGEIJwzQW3n9z0pU3BD8bKLwCoXyeikemwBtedeYLkANsFUV059SU4Pr2bVvNXExWSNYKRt9dgePJ99s2/QcP6aZe7x/lfAJ2UxBrx2YC27HR2t7/R2J7xIndGVXg/PTxPXkN/bAaAMOLhhbY3sl+NXJym5h5dAjxCXkXSP7ayA5h/gaWb+L+39UDSV4bpDvOm1DuEzJKkzVb85Ddctn8J3gytI7MqDUHYCvCB+T/o4vELdU91uokIZaa+mQSYOxqGFnf7y/9AVrMvxK+jT+NKqRSX1H4I7gsGyT79qut1czWphk51Jxn5lqyK1KWCviUpk1stUwejnuaxmuuRf0AFsWnJp8HQcKu6Sbuyr5s7YPDEak8b9luPK6DjtcO/F8OKlq2qTVOzFNjULQD1qV1zHBl5JTuuvZo91doTK30NghvCQbxWVQ7ak+sEJYI50cnJu8pRtefyNdhj9MozeNwOh9mXQQLg3OSFZHcyf012zhe6BLprqUlhE1DVcOvZU4hTysI68ng1uSm7phdiZ6k0k4VOnLhZOks7rRbd9gn6RCtXe2PFsYFAr/w66qmkrcFJtFrpPNTWjc6KZovjVgXrds5M2/Kp/iiro5HRccmdEgVKxXMX8e27BV2CRtCh7qaLvzukudqSHl/15GvjV1DyqxAAAAAElFTkSuQmCC"

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

            Registration(firstName,lastName,mobile,password,email,photo)

                .then((result)=>{
               if(result===true){
                   navigate("/login")

               }
           })

        }
    }


    return (
        <>

            <div className="container">
                <div className="row  justify-content-center">
                    <div className="col-md-10 col-lg-10 center-screen">
                        <div className="card animated fadeIn w-100 p-3">
                            <div className="card-body">
                                <h4>Sign Up</h4>
                                <hr/>
                                <div className="container-fluid m-0 p-0">
                                    <div className="row m-0 p-0">
                                        <div className="col-md-4 p-2">
                                            <label>Email Address</label>
                                            <input ref={(input)=>emailRef=input}  placeholder="User Email" className="form-control " type="email" id="email"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>First Name</label>
                                            <input ref={(input)=>firstNameRef=input} placeholder="First Name" className="form-control animated fadeInUp" type="text"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Last Name</label>
                                            <input ref={(input)=>lastNameRef=input} placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Mobile Number</label>
                                            <input ref={(input)=>mobileRef=input} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile" id="phone"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Password</label>
                                            <input ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                        </div>

                                    </div>
                                    <div className="row mt-2 p-0">
                                        <div className="col-md-4 p-2">
                                            <button onClick={RegistrationSubmit} className="btn mt-3 w-100 float-end btn-primary animated fadeInUp">Complete</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};

export default RegistrationFunc;
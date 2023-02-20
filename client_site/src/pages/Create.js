import {React, Suspense, lazy, useRef} from 'react';
import LazyLoader from "../components/LazyLoader";
import {useNavigate} from "react-router-dom";
import {ErrorToast, IsEmpty} from "../helper/FormHelper";
import {NewTaskRequest} from "../ApiRequest/apiRequest";
import navmenu from "../components/Navmenu";



const Create= () => {

    let titleRef, descriptionRef = useRef()
   const navigate=useNavigate()

    const CreateTask = () => {



        const title = titleRef.value
        const description = descriptionRef.value


        if (IsEmpty(title)) {
            ErrorToast("Title Required")
        } else if (IsEmpty(description)) {
            ErrorToast("Description Required")
        } else {
            NewTaskRequest(title, description).then((res) => {
                if (res == true) {
                    navigate("/new")
                }


            })
        }}

        return (

            <Suspense fallback={<LazyLoader/>}>
                <div fluid={true} className="content-body">
                    <row className="d-flex justify-content-center">
                        <div className="col-12 col-lg-8  col-sm-12 col-md-8  p-2">
                            <div className="card">
                                <div className="card-body">
                                    <h4>Create New</h4>
                                    <br/>
                                    <input ref={(input) => titleRef = input} placeholder="Task Name"
                                           className="form-control animated fadeInUp" type="text"/>
                                    <br/>
                                    <textarea ref={(input) => descriptionRef = input} rows={5}
                                              placeholder="Task Description" className="form-control animated fadeInUp"
                                              type="text"/>
                                    <br/>
                                    <button onClick={CreateTask} className="btn  btn-primary">Create</button>
                                </div>
                            </div>
                        </div>
                    </row>
                </div>
            </Suspense>

        );
    ;


}

export default Create;
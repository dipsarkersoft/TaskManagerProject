import React from 'react';
import {useEffect} from "react";
import {TaskListByStatus} from "../ApiRequest/apiRequest";
import {useSelector} from "react-redux";
import {AiFillEdit, AiOutlineDelete} from "react-icons/ai";
import {MdOutlineDateRange} from "react-icons/md";
import {DeleteIteam} from "../helper/DeleteIteam";
import {UpdateIteam} from "../helper/UpdateIteam";


const Canceled = () => {
   useEffect(()=> {
        TaskListByStatus('Canceled');

    }, []);


    const CanceledList = useSelector((state) => state.task.Canceled)


    const DeleteAction=(id)=>{

        DeleteIteam(id).then((res)=>{
            if(res===true){
                TaskListByStatus('Canceled');
            }
        })
    }

    const UpdateStatus=(id,status)=>{
        UpdateIteam(id,status).then((res)=>{
            if(res===true){
                TaskListByStatus('Canceled');
            }
        })

    }
    return (

        <div className="container">

            <h1 className=" p-2 m-3">Canceled Task</h1>

            <div className="row  m-3">
            {
                CanceledList.map((item,i)=>

                    <div className='card cardALL m-2'>
                        <div className="card-body ">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.description}</p>
                            <a href="#" className="card-link date"><MdOutlineDateRange/> {item.createdAt}</a>
                            <a href="#" className="card-link iconD" onClick={UpdateStatus.bind(this,item._id,item.status)}><AiFillEdit/></a>
                            <a href="#" className="card-link iconE" onClick={DeleteAction.bind(this,item._id)}><AiOutlineDelete/></a>
                            <a href="#" className="badge float-end bg-danger">{item.status}</a>

                        </div>
                    </div>
                )}
            </div>
        </div>


    );
};

export default Canceled;
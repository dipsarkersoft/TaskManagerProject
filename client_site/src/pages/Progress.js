import {React, Suspense, lazy, useEffect} from 'react';
import LazyLoader from "../components/LazyLoader";
import {TaskListByStatus} from "../ApiRequest/apiRequest";
import {useSelector} from "react-redux";
import {AiFillEdit, AiOutlineDelete} from "react-icons/ai";
import {MdOutlineDateRange} from "react-icons/md";
import {DeleteIteam} from "../helper/DeleteIteam";
import {UpdateIteam} from "../helper/UpdateIteam";



const ProgressTask = () => {

    useEffect(()=> {
        TaskListByStatus('Progress');

    },[]);
    const ProgressList = useSelector((state) => state.task.Progress)


   const DeleteAction=(id)=>{

       DeleteIteam(id).then((res)=>{
           if(res===true){
               TaskListByStatus('Progress');
           }
       })
    }
    const UpdateStatus=(id,status)=>{
        UpdateIteam(id,status).then((res)=>{
            if(res===true){
                TaskListByStatus('Progress');
            }
        })


    }

    return (
        <>

            <Suspense fallback={<LazyLoader/>}>

                <div className="container">
                    <h2 className="p-2 m-3">Progress Task</h2>
                    <div className="row">

                        {
                            ProgressList.map((item,i)=>

                                <div className='card cardALL m-2'>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <a href="#" className="card-link date"><MdOutlineDateRange/> {item.createdAt}</a>
                                        <a href="#" className="card-link iconE" onClick={UpdateStatus.bind(this,item._id,item.status)}><AiFillEdit/></a>
                                        <a href="#" className="card-link iconD" onClick={DeleteAction.bind(this,item._id)}><AiOutlineDelete/></a>
                                        <a href="#" className="badge float-end bg-danger">{item.status}</a>

                                    </div>
                                </div>
                            )}

                    </div>
                </div>

            </Suspense>

        </>

    )
};
export default ProgressTask;



import {React,Suspense,lazy}  from 'react';
import LazyLoader from "../components/LazyLoader";
import {useEffect} from "react";
import {TaskListByStatus} from "../ApiRequest/apiRequest";
import {useSelector} from "react-redux";
import {MdOutlineDateRange} from "react-icons/md";
import {AiFillEdit, AiOutlineDelete} from "react-icons/ai";
import {DeleteIteam} from "../helper/DeleteIteam";
import {UpdateIteam} from "../helper/UpdateIteam";



const Completed = () => {
    useEffect(()=> {
        TaskListByStatus('Completed');

    },[]);

    const CompletedList = useSelector((state) => state.task.Completed)


    const DeleteAction=(id)=>{

        DeleteIteam(id).then((res)=>{
            if(res===true){
                TaskListByStatus('Completed');
            }
        })

    }

    const UpdateStatus=(id,status)=>{
        UpdateIteam(id,status).then((res)=>{
            if(res===true){
                TaskListByStatus('Completed');
            }
        })


    }

    return (
        <>
            <Suspense fallback={<LazyLoader/>}>

                <div className="container">
                    <h1 className="p-2 m-3">Completed Task</h1>
                    <div className="row  m-3">



                    {
                        CompletedList.map((item,i)=>

                            <div className='card cardALL m-2'>
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <a href="#" className="date card-link"><MdOutlineDateRange/> {item.createdAt}</a>
                                    <a href="#" className="card-link iconD" onClick={UpdateStatus.bind(this,item._id,item.status)}><AiFillEdit/></a>
                                    <a href="#" className="card-link iconE" onClick={DeleteAction.bind(this,item._id)}><AiOutlineDelete/></a>
                                    <a href="#" className="badge float-end bg-danger">{item.status}</a>

                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </Suspense>
        </>
    );
};

export default Completed;
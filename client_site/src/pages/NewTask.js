import {React, Suspense, lazy, useEffect} from 'react';
import LazyLoader from "../components/LazyLoader";
import {TaskListByStatus} from "../ApiRequest/apiRequest";
import {useSelector} from "react-redux";
import {MdOutlineDateRange} from "react-icons/md";
import {AiFillEdit, AiOutlineDelete} from "react-icons/ai";
import {DeleteIteam} from "../helper/DeleteIteam";
import {UpdateIteam} from "../helper/UpdateIteam";


const NewTask = () => {

    useEffect(() => {
            TaskListByStatus('New');

        },
        []);

    const NewList = useSelector((state) => state.task.New)

    const DeleteAction=(id)=>{


        DeleteIteam(id).then((res)=>{
            if(res===true){
                TaskListByStatus('New');
            }
        })
    }


    const UpdateStatus=(id,status)=>{

         UpdateIteam(id,status)
             .then((res)=>{
             if(res===true){
                TaskListByStatus('New');
             }
         })


    }



    return (
        <>
            <Suspense fallback={<LazyLoader/>}>
                <div className="container">
                      <div className="row">

                              <h2 className="p-2 m-3"> New Task</h2>


                          {
                              NewList.map((item,i)=>

                                  <div key={i.toString()} className='card cardALL m-2'>
                                      <div className="card-body">
                                          <h5 className="card-title">{item.title}</h5>

                                          <p className="card-text">{item.description}</p>
                                          <a className="date card-link"><MdOutlineDateRange/> {item.createdAt}</a>
                                          <a className="card-link iconE" onClick={UpdateStatus.bind(this,item._id,item.status)}><AiFillEdit/></a>
                                          <a className="card-link iconD" onClick={DeleteAction.bind(this,item._id)}><AiOutlineDelete/></a>
                                          <a className="badge float-end bg-danger">{item.status}</a>

                                      </div>
                                  </div>
                              )}
                     </div>
                    </div>

            </Suspense>

        </>
    );
};

export default NewTask;
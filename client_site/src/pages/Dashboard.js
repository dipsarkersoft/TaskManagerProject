import {React,Suspense,lazy} from 'react';
import LazyLoader from "../components/LazyLoader";
import { SummaryRequest } from '../ApiRequest/apiRequest';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {

    useEffect(()=>{
        SummaryRequest();
    },[])

    const SummaryList = useSelector((state) => state.summary.value)

    return (

        <Suspense fallback={<LazyLoader/>}>
            <div className="container">
              <div className="row">
                <h1>Dashboard</h1>
                  { SummaryList.map((iteam,i)=>
                      <div className="col-12 col-lg-3 col-sm-6 col-md-3  p-2">
                          <div className="card h-100">
                              <div className="card-body">
                                  <h5 className="animated fadeInUp">Total  {iteam._id} </h5>
                                  <h6 className="text-secondary animated fadeInUp">{iteam.sum}</h6>
                              </div>
                          </div>
                      </div>)}





                </div>

            </div>
        </Suspense>


    );
};

export default Dashboard;
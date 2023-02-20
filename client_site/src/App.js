import {React} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Navmenu from "./components/Navmenu";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import NewTask from "./pages/NewTask";
import Progress from "./pages/Progress";
import Completed from "./pages/Completed";
import Canceled from "./pages/Canceled";
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Profile from "./components/Profile"
import FullscreenLoader from "./components/FullScreenLoader";
import {getToken} from "./helper/SessionHelper";
import SendOTP from "./components/SendOTP"
import VerifyOtp from "./components/VerifyOtp"
import CreatePass from "./components/CreatePass"

const App = () => {



    if(getToken()){
        console.log(getToken())
        return (
            <>
                <BrowserRouter>
                    <Navmenu/>
                    <Toaster position="top-center"/>
                    <Routes>
                        <Route path='/' element={<Dashboard/>} ></Route>
                        <Route path='/create' element={<Create/>} ></Route>
                        <Route path='/new' element={<NewTask/>} ></Route>
                        <Route path='/progress' element={<Progress/>} ></Route>
                        <Route path='/completed' element={<Completed/>} ></Route>

                        <Route path='/canceled' element={<Canceled/>} ></Route>
                        <Route path='/profile' element={<Profile/>} ></Route>

                    </Routes>

                </BrowserRouter>
                <FullscreenLoader/>
            </>
        )
    }
    else {
        return (
            <>
                <BrowserRouter>
                    <Toaster position="top-center"/>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />}/>
                        <Route path='/login' element={<Login/>} ></Route>
                        <Route path='/registration' element={<Registration/>} ></Route>

                        <Route path='/sendotp' element={<SendOTP/>} ></Route>
                        <Route path='/verifyOtp' element={<VerifyOtp/>} ></Route>
                        <Route path='/createpass' element={<CreatePass/>} ></Route>


                    </Routes>

                </BrowserRouter>
                <FullscreenLoader/>
            </>
        )
    }

};

export default App;
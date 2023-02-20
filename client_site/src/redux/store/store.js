import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../stateSlice/settingSlice"
import taskReducer from "../stateSlice/taskSlice"
import summaryReducer from "../stateSlice/SummerySlice"
import ProfileReducer from "../stateSlice/Profile"


export default configureStore({
    reducer:{
        settings:settingsReducer,
        task:taskReducer,
        summary:summaryReducer,
        profile:ProfileReducer
    }
})

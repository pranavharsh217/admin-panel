import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import formSlice from "./formSlice"
const store=configureStore({
    reducer:{
        auth:authSlice,
        form:formSlice,
    }
})

export default store;
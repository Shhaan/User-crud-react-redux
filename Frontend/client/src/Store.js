import { configureStore } from "@reduxjs/toolkit";

import  userReducer from 'Features/auth' 
 
import userloginSlice from 'Features/userLogin'
import adminLogin from "Features/adminLogin";
import inc from "Features/incdec";


export const store =configureStore({
    reducer:{
         user:userReducer,
         userlogin:userloginSlice,
         adminLogin:adminLogin,
         inc:inc,

    },
    devTools:process.env.NODE_ENV !== 'production'
})
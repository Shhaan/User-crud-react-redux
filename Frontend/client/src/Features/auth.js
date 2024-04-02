import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isAuthenticated:false,
     
    loading:false,
    registered:false,
     
    error:null
 } 
 
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    UserisLoading:state=>{
      state.loading=true
    },
    userRegistered:(state,action)=>{
        state.loading = false
        state.registered =true
        
        state.isAuthenticated = true
    },
   
  RegistrationFailed:(state,action)=>{
    state.loading = false
    state.error = action.payload
  }  , 
 
    
  },
})

export const { RegistrationFailed,userRegistered,UserisLoading } = userSlice.actions
export default userSlice.reducer
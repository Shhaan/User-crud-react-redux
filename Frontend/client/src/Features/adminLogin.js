import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isAuthenticated:false,
    user:null,
    loading:false,
     
    error:null
 } 
 
const AdminloginSlice = createSlice({
  name: 'userlogin',
  initialState,
  reducers: {
    
    AdminlogisLoading:state=>{
      state.loading=true
    },
    AdminlogRegistered:(state,action)=>{
        state.loading = false
         
        state.user = action.payload
        state.isAuthenticated = true
    },
   
  RegistrationlogFailedAdmin:(state,action)=>{
    state.loading = false
    state.error = action.payload
  }   ,
  logoutAdmin:() => initialState
    
  },
})

export const { AdminlogisLoading,AdminlogRegistered,RegistrationlogFailedAdmin,logoutAdmin } = AdminloginSlice.actions
export default AdminloginSlice.reducer



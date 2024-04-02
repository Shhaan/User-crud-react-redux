import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isAuthenticated:false,
    user:null,
    loading:false,
     
    error:null
 } 
 
const userloginSlice = createSlice({
  name: 'userlogin',
  initialState,
  reducers: {
    
    UserlogisLoading:state=>{
      state.loading=true
    },
    userlogRegistered:(state,action)=>{
        state.loading = false
         
        state.user = action.payload
        state.isAuthenticated = true
    },
   
  RegistrationlogFailed:(state,action)=>{
    state.loading = false
    state.error = action.payload
  }   ,
  logout:() => initialState
    
  },
})

export const { UserlogisLoading,userlogRegistered,RegistrationlogFailed,logout } = userloginSlice.actions
export default userloginSlice.reducer
import { createSlice } from "@reduxjs/toolkit";



const initial = 0

const InandDecreducer = createSlice({
      name : 'incDec',
      initialState:initial,
      reducers:{
        increment:state=>{
             return state +1
        },
        decrement:state=>{
            return state -1
     }
      }
     

})

export const {increment,decrement} = InandDecreducer.actions

export  default  InandDecreducer.reducer
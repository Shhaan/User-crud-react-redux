import React, { useState } from 'react'
import Layout from 'Components/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../Config/axios';
import  {jwtDecode}  from "jwt-decode";
import {UserlogisLoading,userlogRegistered,RegistrationlogFailed} from '../Features/userLogin'
import { userRegistered} from '../Features/auth'

const Login = () => {
  const navigate = useNavigate()
  const [formData,setFormData]=useState({
    
    email:"",
    password:"",

  });
  const [errors,setErrors]=useState()
  const {isAuthenticated,user,loading,error} = useSelector(state=>state.userlogin)
  const dispatch = useDispatch()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()

    if (!formData.email || !formData.password){
      setErrors('Invalid user credentials')
      return 
    }
    try{
      dispatch(UserlogisLoading())
      setErrors('')
    const response = await axios.post('api/token/',formData)
    if (response.status ==200){
     
      localStorage.setItem('access_token',response.data.access)
        localStorage.setItem('refresh_token',response.data.refresh)

        const accessToken = localStorage.getItem('access_token');
            
        const user = await axios.get('api/users/me', {
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
      })

      dispatch(userlogRegistered(user.data))
    
       navigate('/')
       }
       else{

        dispatch(RegistrationlogFailed('Something went wrong OR Invalid user'))

       }}
   catch(e){
    console.log(e);
    dispatch(RegistrationlogFailed('Something went wrong OR Invalid user'))
   }
     
    }
  return (
    <Layout title={'Auth site | login'} content={'Login page'} >
    <div style={{width:'39%',margin:'auto'}}>
       
    <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />

        </div>
      
        {errors ? <h6 className='text-danger'>{errors}</h6> : null}
{error ? <h6 className='text-danger'>{error}</h6> : null}

{loading ?<div class="spinner-border m-auto text-primary" role="status"></div>:
     <button  style={{width:'57%',margin:'auto'}} type="submit">Submit</button>}
      </form>
      
      </div></Layout>
  )
}

export default Login
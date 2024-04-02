import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../Config/axios';
import {AdminlogisLoading,AdminlogRegistered,RegistrationlogFailedAdmin} from '../../Features/adminLogin'
 
const LoginAdmin = () => {
  const navigate = useNavigate()
  const [formData,setFormData]=useState({
    
    email:"",
    password:"",

  });
  const [errors,setErrors]=useState()
  const {loading,error} = useSelector(state=>state.adminLogin)
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
      dispatch(AdminlogisLoading())
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

      dispatch(AdminlogRegistered(user.data))
    
       navigate('/admin')
       }
       else{

        dispatch(RegistrationlogFailedAdmin('Invalid Admin'))

       }}
   catch(e){
    console.log(e);
    dispatch(RegistrationlogFailedAdmin('Invalid Admin'))
   }
     
    }
  return (
    
    <div style={{width:'39%',margin:'auto'}}>
       <h2>Admin Login</h2>
    <form style={{marginTop:'200px'}} onSubmit={handleSubmit}>
        
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
      
      </div> 
  )
}

export default LoginAdmin
 
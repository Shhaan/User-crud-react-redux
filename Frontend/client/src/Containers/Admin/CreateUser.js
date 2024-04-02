import React, { useState } from 'react'
// import './Register.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../Config/axios'
import { useNavigate } from 'react-router-dom';
const CreateUser = () => {
  const navigate = useNavigate()
  const [formData,setFormData]=useState({
    first_name:"",
    last_name:"",
    email:"",
    password:"",

  });
  const [errors,setErrors]=useState({})
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    let validationErrors={};  


    if (!formData.first_name.trim()) {
      validationErrors.first_name = 'first name is required.';
    }
    if (!formData.last_name.trim()) {
      validationErrors.last_name = 'last name is required.';
    }
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Invalid email address.';
    }

    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required.';
    } else if (formData.password.trim().length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long.';
    }
    else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      validationErrors.password = 'Password must contain at least one letter and one number.';
    }
    else if (formData.password === formData.email) {
      validationErrors.password = "Password can't be email";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      return;
    } 
 

    try{
       const user = await axios.post('api/users/register',formData)

       navigate('/admin')

    }
    catch(error){          
        console.log(error);

    }
    
  }
  return (
    


    <div style={{width:'39%',margin:'auto'}} >
      
    <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="first_name" value={formData.first_name} onChange={handleChange} />
         {errors.first_name  && <h6 className='text-danger '>{errors.first_name}</h6>}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="last_name" value={formData.last_name} onChange={handleChange} />
         {errors.last_name  && <h6 className='text-danger '>{errors.last_name}</h6>}

        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
         {errors.email  && <h6 className='text-danger '>{errors.email}</h6>}

        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
         {errors.password  && <h6 className='text-danger ' >{errors.password}</h6>}

        </div>
     
     <button  style={{width:'57%',margin:'auto'}} type="submit">Submit</button>
      </form>
      
      
      
      </div> 
  )
}

export default CreateUser
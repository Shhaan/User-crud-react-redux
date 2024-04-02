import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import axios from 'Config/axios'
import { jwtDecode } from 'jwt-decode'
const Edit = () => {
    const {id} = useParams()
     const [user,setuser]=useState({})
     const [userexists,setuserexists]=useState()
    const [errorsss,setErrors] = useState({})
     const navigate = useNavigate()
    const handlechange=(e)=>{
      const  { name,value} =  e.target
      
        setuser(pre=>({
            
            ...pre,
            [name]: value
        }))

    }

    useEffect(()=>{
        const  fetch=async()=>{
            try{
                const accessToken = localStorage.getItem('access_token')
             
            const reponse =await axios.get(`api/users/get-user/${id}`,{
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }})


                setuser(reponse.data)
               
            }catch(e){
               navigate('/admin-login')

            }
        }
        fetch()



    },[])

  const handlesubmit =async(e)=>{

      e.preventDefault()
      const validationErrors = {}
      if (!user.first_name.trim()) {
        validationErrors.first_name = 'first name is required.';
      }
      if (!user.last_name.trim()) {
        validationErrors.last_name = 'last name is required.';
      }
      if (!user.email.trim()) {
        validationErrors.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(user.email)) {
        validationErrors.email = 'Invalid email address.';
      }
  
  
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        
        return;
      } 

      try{
        const accessToken = localStorage.getItem('access_token')
     
     
    const reponse =await axios.post(`api/users/get-user/${user.id}`,
            user ,{
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }})


        setuser(reponse.data)
        navigate('/admin')
    }catch(e){
      setuserexists(e.response.data)

    }


  }

  return (
    <div>
         <div style={{width:'39%',margin:'auto'}} >
      
      {user &&  
      <form onSubmit={handlesubmit} >
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={(e)=>handlechange(e)} value={user.first_name} name="first_name"  />
            {errorsss.first_name && <h6>{errorsss.first_name}</h6>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={(e)=>handlechange(e)} value={user.last_name} name="last_name"  />
            {errorsss.last_name && <h6>{errorsss.last_name}</h6>}
  
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={(e)=>handlechange(e)} value={user.email} name="email"  />
            {errorsss.email && <h6>{errorsss.email}</h6>}
       
          </div>
          {userexists && <h6>{userexists.error}</h6> }
           <input type='submit' value='submit'/>
     
   
        </form>}
        
        
        </div>

    </div>
  )
}

export default Edit
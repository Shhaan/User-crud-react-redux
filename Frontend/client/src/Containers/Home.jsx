import React,{useEffect} from 'react'
import Layout from 'Components/Layout'
import {userlogRegistered} from '../Features/userLogin'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../Config/axios';

const Home = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.userlogin)
    
  useEffect(()=>{
    async function  fetch  () {
    const accessToken = localStorage.getItem('access_token');
   
    try{
    if (accessToken){
        const user = await axios.get('api/users/me', {
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }


      })
       
      dispatch(userlogRegistered(user.data))
    
    }}
    catch(e){
      console.log(e)
    }
  
  }
      fetch()
   
  },[])
  return (
    <Layout title={'Auth site | home'} content={'Home page'} > 
    <div>
      {user ?
        <div>
          {user.profile_image?
      <img style={{borderRadius: '42px',border: '1px solid',width: '6%'}} src={`http://127.0.0.1:8000/${user.profile_image}`} alt="" />:''}

      <p><strong>First Name:</strong> {user.first_name}</p>
      <p><strong>Last Name:</strong> {user.last_name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
    
  :
  <h1>Please login to view user detail</h1>
  
  }

      
      
      </div></Layout>
  )
}

export default Home
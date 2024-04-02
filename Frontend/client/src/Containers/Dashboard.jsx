import Layout from 'Components/Layout'
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userlogRegistered } from 'Features/userLogin';
import axios from 'Config/axios'
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    async function  fetch  () {
    const accessToken = localStorage.getItem('access_token');
            
    try{
    if (accessToken){
        const res = await axios.get('api/users/me', {
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }


      })

      dispatch(userlogRegistered(res.data))
    
    }else{
      navigate('/')
    }
  
  }
    catch(e){
      console.log(e);
    }
  
  }
      fetch()
   
  },[])
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorFile, seterrorFile] = useState('');


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])}


    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.userlogin)
      
    

    const handleSubmit=async(e)=>{
      e.preventDefault()
      
      if (!selectedFile){
       seterrorFile('Must enter the profile')
       return }
      
       try{
         
        const formData = new FormData();
        formData.append('image', (selectedFile));

        const accessToken = localStorage.getItem('access_token');
 
        const response = await axios.patch(
          'api/users/update-profile',
          formData,
          {
            headers: { 
              'Authorization': `Bearer ${accessToken}`,
              'content-type': 'multipart/form-data'
            }
        
        })
        navigate('/')

       }
       catch(e){
        console.log(e);

       }
      



   }

  return (

    <Layout title={'Auth site | Dashboard'} content={'Dashboard page'} >
      <h1>Upload User photo</h1>
      <form action="" onSubmit={handleSubmit} >
           
           <label htmlFor="image">Upload image</label>
           {selectedFile ?
          <img src={selectedFile?URL.createObjectURL(selectedFile):''} alt="Selected" style={{ width: '100px', height: '100px' }} />
        : 
         user ? <img style={{width:'100px',height:'100px'}} src={`http://127.0.0.1:8000/${user.profile_image}`} alt="Set image" />:''}
    <br />

           <input type="file" name='image' onChange={(e)=>handleFileChange(e)} accept="image/*" />
              {errorFile && <h6 className='text-danger' >{errorFile}</h6>}
        <button type='submit' style={{width:'15%',marginTop:'10px'}}>Submit</button>
      </form>

    </Layout>
  )
}

export default Dashboard
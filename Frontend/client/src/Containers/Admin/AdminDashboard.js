import React, { useEffect, useState } from 'react'
import axios from 'Config/axios'
import {useNavigate} from 'react-router-dom'
import { increment,decrement } from 'Features/incdec'
import { useDispatch, useSelector } from 'react-redux'


const AdminDashboard = () => {

    const [users,setUsers] = useState([])
   const [search,setsearch] =useState('')
    const navigate = useNavigate()
    useEffect(()=>{
          
        const fetch =async()=>{

            try{
            const accessToken = localStorage.getItem('access_token')
      
            const users = await axios.get('api/users/get-all',{
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            setUsers(users.data)
             
        }catch(e){
            navigate('/admin-login')

        }
             
        }
        fetch()
    },[])

  const deleteuser = async(email)=>{
    try{
      const accessToken = localStorage.getItem('access_token')

      const users = await axios.delete(`api/users/delete/${email}`,{
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
      })
 
       
  }catch(e){
      console.log(e);

  }
  }
  
  const initial = useSelector(state=>state.inc)
  console.log(initial);
  const dispatch = useDispatch()
    

  return (
    <div className='text-center'>
        
        <div>
           <div style={{marginBottom:'50px'}}>
          <input style={{marginTop: '16px',width: '50%',marginBottom: '25px'}} placeholder='Search' type="text" value={search} onChange={(e)=>setsearch((e.target.value))} />

        <button style={{margin:'auto',width:'12%'}} onClick={()=>navigate('/create-user')} >CreateUser</button>
          </div>
        <table style={{margin:'auto'}}>
      <thead className='mt-5' >
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
       {users && users.filter(user => user.email.toLowerCase().includes(search.toLowerCase())).map((user,id) => (
        <> <tr className='my-5' key={id}>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>
               
               <div style={{display:'flex'}} >
              <button onClick={()=>navigate(`/user-edit/${user.email}`)} >Edit</button>
              <button className='bg-danger ms-2' onClick={()=>deleteuser(`${user.email}`)}  >Delete</button>
              </div>
            </td>
           
          </tr>
           </> 
        ))}
      </tbody>
    </table>

             
      <button onClick={()=>dispatch(increment())} >inc</button>
      <h1>{initial}</h1>
      <button onClick={()=>dispatch(decrement())}>dec</button>


        </div>
    </div>
  )
}

export default AdminDashboard
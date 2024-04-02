import React from 'react'
import { NavLink,Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout} from '../Features/userLogin'
const Navbar = () => {


    const {isAuthenticated} = useSelector(state=>state.userlogin)
  const navigate = useNavigate()
 const dispatch = useDispatch()
  const  handlelogout=async ()=>{

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    dispatch(logout())
    navigate('/')


  }
  const authLink = (
    <>
    
    <li className="nav-item">
    <NavLink className="nav-link" to={'/dashboard'} >Dashboard</NavLink>
    </li>
    <li className="nav-item">
    <h3 className="nav-link" onClick={handlelogout} >Logout</h3>

    </li></>
  )
  const gustLink  =(
    <>
            <li className="nav-item">

            <NavLink className="nav-link" to={'/login'} >Login</NavLink>
            </li>
            <li className="nav-item">

            <NavLink className="nav-link" to={'/register'} >Register</NavLink>
            </li></>

  )
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">

        <Link className="navbar-brand" to='/' >Auth sites</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            <li className="nav-item">
            <NavLink className="nav-link" to={'/'} >Home</NavLink>
            </li>
            {isAuthenticated?authLink:gustLink}
            
        </ul>
        </div>
    </div>
</nav>
  )
}

export default Navbar
import React from 'react';
import {NavLink} from 'react-router-dom';
import { useAuth } from './Auth'
import { useHistory } from "react-router-dom";

function Navbar() {
  const history = useHistory();
  let auth =useAuth()

  console.log("auth",auth.user)
  const handleLogout = ()=>{
		auth.logout();
		// window.location.href ="/"
		// localStorage.removeItem('token')
		// navigate('/')
    // history.replace("/")
	}

  return (
    <div style={{display:'flex',justifyContent:'left',padding:'20px',textAlign:'center',fontSize:25}} className="navbar navbar-dark bg-dark">
      <div style={{marginRight:'20px'}}>
      {!auth.user.name ?  <NavLink to="/">Login</NavLink>:''}
      </div>
      <div style={{marginRight:'20px'}}>      
        <NavLink to="/register">Register</NavLink>
      </div>
      <div style={{marginRight:'10px'}}>  
        <NavLink to="/home">Dashboard</NavLink>
      </div>
      {localStorage.getItem('token') ? 
         <span onClick={()=>handleLogout()} style={{position:'relative',right:-1400}}>
         <span className="btn btn-info btn-lg">
           <span className="glyphicon glyphicon-log-out"></span> Log out
         </span>
       </span> 
        // <i className="fa fa-sign-out" aria-hidden="true" onClick={()=>handleLogout()}></i>
       :''}
    </div>
  )
}

export default Navbar
import React from 'react'
import AllUser from './AllUser';
import { useEffect, useState } from "react";
import { BrowserRouter, Route,useHistory } from 'react-router-dom';
import { AllUserProps } from "../types/allUsersType";
import { useAuth } from './Auth'

function Home() {

    const [allUser, setAllUser] = useState<AllUserProps[]>([]);
    let auth =useAuth()
    const history = useHistory();

    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => setAllUser(json));
  
      return () => {};
    }, []);

    if(!localStorage.getItem('token'))
    {
      history.replace('/')
    }

  
  return (
    <div>
      <br/>  <br/>
          <h3 style={{ textAlign: "center", color: "#fff",backgroundColor:'gray' ,padding:'19px',margin:'auto',width:'20%',borderRadius:'10px'}} >
        <b className="mt-10">CRUDE APPLICATION</b>
      </h3>
      <AllUser users={allUser} setAllUser={setAllUser}/>
     </div>
 
  )
}

export default Home
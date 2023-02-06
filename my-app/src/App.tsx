import { useEffect, useState } from "react";
import { BrowserRouter, Route } from 'react-router-dom'

import "./App.css";
import { AllUserProps } from "./types/allUsersType";
import {AuthProvider} from './components/Auth';
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Navbar from './components/Navbar'

function App() {
  const [allUser, setAllUser] = useState<AllUserProps[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setAllUser(json));

    return () => {};
  }, []);

  return (
    <div>
       <AuthProvider>
       <BrowserRouter>
				<Navbar/>
					<Route path="/" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<Route path="/home" exact component={Home} />
				</BrowserRouter>
        </AuthProvider>
     </div>
  );
}

export default App;

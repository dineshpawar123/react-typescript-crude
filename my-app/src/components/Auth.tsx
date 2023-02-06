import React, { ChangeEvent, createContext,useContext,useState } from "react";
// import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'
// let decoded = jwt_decode(token)
import { useHistory } from "react-router-dom";


export type AuthUser = {
    name:string
} 

// type AuthProviderProps ={
//     user: string;
//      login: (user: any) => void;
//       logout: () => void;
// }
type setUserProps={
    name: string;
    email: string; 
    iat?: number;
    exp?: number
}

type UserContextType = {
    user:setUserProps
    login: (user: string) => void;
    logout: () => void;
}

type UserContextProviderProps = {
    children:React.ReactNode
}



const AuthContext = createContext({} as UserContextType);



export const AuthProvider = ({children}:{children:any})=>{

    const [user,setUser]=useState<setUserProps>({name: '',
        email: '', })
    const history = useHistory();
    
    const login = (userProp:string) =>{
        localStorage.setItem('token',userProp)
        console.log("=>",user,jwt_decode(userProp))
        // if(jwt !==null)
         {
            // setUser(jwt.decode(user).email)
            let decoded:setUserProps = jwt_decode(userProp)
            // console.log("=>",decoded?.email)
            setUser(decoded)
         } 
    }

    const logout = () =>{
        setUser( {name:'',email:''})

        localStorage.clear();
		localStorage.removeItem('token')
        // history.replace('/')
		// window.location.href = '/'
    }

    return <AuthContext.Provider value={{user,login,logout}}>
                 {children}
    </AuthContext.Provider>
}


export const useAuth = () =>{
    return useContext(AuthContext);
}
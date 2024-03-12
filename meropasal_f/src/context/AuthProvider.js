//to validate users

import { createContext,useState } from "react";

const AuthContext=createContext({})

export const AuthProvider=({children})=>{  //children represents the components inside authprovider  ??  line 12
    const [authentication,setAuthentication]=useState({})

    return (
        <AuthContext.Provider value={{authentication,setAuthentication}}>  {/*this gets the value from backend which is email,password, token and sets it to the children */}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
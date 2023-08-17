import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
    const lsToken = localStorage.getItem("token"); 
    const [token, setToken] = useState(lsToken);
    const lsPhoto = localStorage.getItem("photo"); 
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(lsPhoto);
    const navigate = useNavigate();
    const localiza = useLocation();

    
    // useEffect(() => {
    //     if (lsToken === null && localiza.pathname !== "/signup") {
    //         navigate("/");
    //     } else if (lsToken && localiza.pathname !== "/singup") {
    //         navigate("/");
    //     }
    // }, []);

    return (
        <AuthContext.Provider value={{
            name, setName,
            token, setToken,
            photo, setPhoto
        }}>
            {children}
        </AuthContext.Provider>
    )
};


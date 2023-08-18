import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
    const lsToken = localStorage.getItem("token"); 
    const [token, setToken] = useState(lsToken);
    const lsImage = localStorage.getItem("image"); 
    const [image, setImage] = useState(lsImage);
    const navigate = useNavigate();
    const localiza = useLocation();

    
    useEffect(() => {
        if (lsToken === null && localiza.pathname !== "/signup") {
            navigate("/");
        } else if (lsToken && localiza.pathname !== "/singup") {
            navigate("/");
        }
     }, []);

    return (
        <AuthContext.Provider value={{
            token, setToken,
            image, setImage
        }}>
            {children}
        </AuthContext.Provider>
    )
};


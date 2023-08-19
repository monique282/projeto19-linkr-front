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
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        if (lsToken === null && localiza.pathname !== "/sign-up") {
            navigate("/");
        } else if (lsToken && localiza.pathname !== "/timeline") {
            navigate("/timeline");
        }
     }, []);

     

    return (
        <AuthContext.Provider value={{
            token, setToken,
            image, setImage, 
            posts, setPosts
        }}>
            {children}
        </AuthContext.Provider>
    )
};


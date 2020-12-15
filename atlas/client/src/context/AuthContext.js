import React, { createContext, useState, useEffect } from "react";
import UserAPI from "../utils/UserAPI";

export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        UserAPI.isAuthenticated().then(data => {
            console.log(data.user)
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    }, []);

    return (
        <div>
            {!isLoaded ? <div class="d-flex align-items-center">
                            <strong style={{marginRight: "10px", fontSize: "34px"}}>Loading...</strong>
                            <div class="spinner-border" role="status" aria-hidden="true"></div>
                        </div> : 
            <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )
}
import React, { createContext, useState, useEffect } from "react";
import UserAPI from "../utils/UserAPI";

export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        UserAPI.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    }, []);

    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> : 
            <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )
}
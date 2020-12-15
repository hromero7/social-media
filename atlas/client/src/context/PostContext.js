import React, { useState, createContext } from "react";

export const PostContext = createContext();

export default ({ children }) => {
    const [posts, setPosts] = useState([]);

    return (
        <div>
            <PostContext.Provider value={{ posts, setPosts }}>
                { children }
            </PostContext.Provider>
        </div>
    )
}
import React, { useState, createContext } from "react";

export const PostContext = createContext();

export default ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [singlePost, setSinglePost] = useState([]);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);

    return (
        <div>
            <PostContext.Provider value={{ 
                posts, 
                setPosts,
                myPosts,
                setMyPosts, 
                singlePost, 
                setSinglePost,
                likes,
                setLikes,
                comments,
                setComments
                        }}>
                { children }
            </PostContext.Provider>
        </div>
    )
}
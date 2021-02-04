import React, { useState, createContext } from "react";

export const PostContext = createContext();

export default ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [singlePost, setSinglePost] = useState([]);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [tweetImage, setTweetImage] = useState([]);
    const [postImage, setPostImage] = useState([]);
    const [commentImage, setCommentImage] = useState([]);
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
                setComments,
                tweetImage,
                setTweetImage,
                postImage,
                setPostImage,
                commentImage,
                setCommentImage
                        }}>
                { children }
            </PostContext.Provider>
        </div>
    )
}
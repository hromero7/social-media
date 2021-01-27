import React, { useState, useEffect, useContext } from "react";
import ProfileCard from "../../components/ProfileCard";
import TweetCard from "../../components/TweetCard";
import "./Dashboard.css";
import PostAPI from "../../utils/PostAPI";
import { PostContext } from "../../context/PostContext";
import { MessageContext } from "../../context/MessageContext";
import Message from "../../components/Message";

const Dashboard = () => {
    const { posts, setPosts } = useContext(PostContext);
    const { message, setMessage } = useContext(MessageContext);
    // const [posts,setPosts] = useState([]);
    useEffect(() => {
        PostAPI.getPosts().then(data => {
          console.log(data)
          setPosts(data);
        })
      },[])


    return (

        <div className="container dashboard animate__animated animate__fadeIn">
        
        <div>
            <ProfileCard/>
        </div>
        
        <div className="feed">
           { message ? <Message/> : null }
            {posts.map((post, i) => {
               return <TweetCard
                    key={i} 
                    body={post.body}
                    user={post.username}
                    userId={post.userId}
                    comments={post.comments}
                    likes={post.likes}
                    postId={post._id}
                    userLikeId={post.likes.id}
                    />
            })}
        </div>

        </div>
    )

}

export default Dashboard;
import React, { useState,useEffect, useContext } from "react";
import ProfileCard from "../../components/ProfileCard";
import TweetCard from "../../components/TweetCard";
import "./Dashboard.css";
import PostAPI from "../../utils/PostAPI";
import { PostContext } from "../../context/PostContext";

const Dashboard = () => {
    const { posts, setPosts } = useContext(PostContext);
    // const [posts,setPosts] = useState([]);
    useEffect(() => {
        PostAPI.getPosts().then(data => {
          console.log(data)
          setPosts(data);
        })
      },[])


    return (

        <div className="container dashboard">
        
        <div>
            <ProfileCard/>
        </div>
        
        <div className="feed">
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
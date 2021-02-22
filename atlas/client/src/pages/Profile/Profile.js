import React, { useState, useEffect, useContext } from "react";
import ProfileCard from "../../components/ProfileCard";
import TweetCard from "../../components/TweetCard";
import PostAPI from "../../utils/PostAPI";
import { PostContext } from "../../context/PostContext";
import "./Profile.css";

const Profile = () => {
    const { myPosts, setMyPosts, posts } = useContext(PostContext);
    useEffect(() => {
        PostAPI.getMyPosts().then(data => {
          setMyPosts(data.posts);
        })
      },[posts])


    return (

        <div className="user-profile-container">
        
        <div>
            <ProfileCard/>
        </div>
        
        <div className="feed">
            {myPosts.length > 0 ? myPosts.map((post, i) => {
               return <TweetCard
                    key={i} 
                    body={post.body}
                    user={post.username}
                    userId={post.userId}
                    comments={post.comments}
                    likes={post.likes}
                    postId={post._id}
                    avatar={post.avatar}
                    date={post.date}
                    />
            }) : <div className="profile-message">This user has not made any posts yet.</div>    }
        </div>

        </div>
    )
}

export default Profile;
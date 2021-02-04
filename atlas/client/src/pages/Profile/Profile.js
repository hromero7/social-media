import React, { useState, useEffect, useContext } from "react";
import ProfileCard from "../../components/ProfileCard";
import TweetCard from "../../components/TweetCard";
import PostAPI from "../../utils/PostAPI";
import { PostContext } from "../../context/PostContext";
const Profile = () => {
    const { myPosts, setMyPosts } = useContext(PostContext);
    useEffect(() => {
        PostAPI.getMyPosts().then(data => {
          setMyPosts(data.posts);
        })
      },[])


    return (

        <div className="container dashboard">
        
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
                    />
            }) : <div>No Posts</div>    }
        </div>

        </div>
    )
}

export default Profile;
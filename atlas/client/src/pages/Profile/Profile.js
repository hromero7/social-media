import React, { useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard";
import TweetCard from "../../components/TweetCard";
import PostAPI from "../../utils/PostAPI";

const Profile = () => {
    const [myPosts,setMyPosts] = useState([]);
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
            {myPosts.map((post, i) => {
               return <TweetCard
                    key={i} 
                    body={post.body}
                    user={post.username}
                    comments={post.comments}
                    likes={post.likes}
                    postId={post._id}
                    />
            })}
        </div>

        </div>
    )
}

export default Profile;
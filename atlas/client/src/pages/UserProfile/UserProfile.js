import React, { useState, useEffect, useContext } from "react";
import TweetCard from "../../components/TweetCard";
import PostAPI from "../../utils/PostAPI";
import UserCard from "../../components/UserCard";
import { PostContext } from "../../context/PostContext";
import UserAPI from "../../utils/UserAPI";
import "./UserProfile.css";

const UserProfile = (props) => {
    const { posts } = useContext(PostContext);
    const [userPosts, setUserPosts] = useState([]);
    const [userCard, setUserCard] = useState("");

    useEffect(() => {
        PostAPI.getUserPosts(props.match.params.userId).then(data => {
          setUserPosts(data.posts);
          UserAPI.getUser(props.match.params.userId).then(data => {
              setUserCard(data);
              console.log(data)
          })
        })
      },[posts])


    return (

        <div className="container dashboard">
        
        <div>
            <UserCard 
                avatar={userCard.avatar}
                firstName={userCard.firstName}
                lastName={userCard.lastName}
                username={userCard.username}
                bio={userCard.bio}
                following={userCard.following}
                followers={userCard.followers}
                userId={userCard._id}
                />
        </div>
        
        <div className="feed">
            {userPosts.length > 0 ? userPosts.map((post, i) => {
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
            }) : <div>No Posts</div>    }
        </div>

        </div>
    )
}

export default UserProfile;
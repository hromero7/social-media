import React, { useState, useEffect, useContext } from "react";
import ProfileCard from "../../components/ProfileCard";
import TweetCard from "../../components/TweetCard";
import "./Dashboard.css";
import PostAPI from "../../utils/PostAPI";
import UserAPI from "../../utils/UserAPI";
import { PostContext } from "../../context/PostContext";
import { MessageContext } from "../../context/MessageContext";
import Message from "../../components/Message";


const Dashboard = () => {
    const { posts, setPosts, followingPosts, setFollowingPosts } = useContext(PostContext);
    const { message, setMessage } = useContext(MessageContext);
    const [showGlobalPosts,setShowGlobalPosts] = useState(true);

    useEffect(() => {
        PostAPI.getPosts().then(data => {
          console.log(data)
          setPosts(data);
          PostAPI.getFollowingPosts().then(data => {
            setFollowingPosts(data);
          })
        })
      },[])

// const getImage = (id) => {
//   UserAPI.getImage(id).then(data => {
//     setTweetImage(data);
//   })
//   return tweetImage;
// }

    return (

        <div className="dashboard">
        <div>
            <ProfileCard/>
        </div>
        
        <div className="feed">
          <div className="feed-filter">
            <button className="feed-btn" onClick={() => setShowGlobalPosts(true)}>Global</button> 
            <button className="feed-btn" onClick={() => setShowGlobalPosts(false)}>Following</button>
          </div>
           { message ? <Message/> : null }
            {showGlobalPosts? posts.map((post, i) => {
               return <TweetCard
                    key={i} 
                    body={post.body}
                    user={post.username}
                    userId={post.userId}
                    comments={post.comments}
                    likes={post.likes}
                    postId={post._id}
                    userLikeId={post.likes.id}
                    avatar={post.avatar}
                    date={post.date}
                    />
            }) : followingPosts.map((post, i) => {
              return <TweetCard
                    key={i} 
                    body={post.body}
                    user={post.username}
                    userId={post.userId}
                    comments={post.comments}
                    likes={post.likes}
                    postId={post._id}
                    userLikeId={post.likes.id}
                    avatar={post.avatar}
                    date={post.date}
                    />
            })}
        </div>

        </div>
    )

}

export default Dashboard;
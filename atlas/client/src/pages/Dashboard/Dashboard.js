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
    const { posts, setPosts, setTweetImage, tweetImage } = useContext(PostContext);
    const { message, setMessage } = useContext(MessageContext);
    // const [posts,setPosts] = useState([]);
    useEffect(() => {
        PostAPI.getPosts().then(data => {
          console.log(data)
          setPosts(data);
        })
      },[])

// const getImage = (id) => {
//   UserAPI.getImage(id).then(data => {
//     setTweetImage(data);
//   })
//   return tweetImage;
// }

    return (

        <div className="container dashboard animate__animated">
        
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
                    avatar={post.avatar}
                    />
            })}
        </div>

        </div>
    )

}

export default Dashboard;
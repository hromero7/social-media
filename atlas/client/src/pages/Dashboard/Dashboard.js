import React, {useState,useEffect} from "react";
import ProfileCard from "../../components/ProfileCard";
import TweetCard from "../../components/TweetCard";
import "./Dashboard.css";
import PostAPI from "../../utils/PostAPI";


const Dashboard = () => {
    
    const [posts,setPosts] = useState([]);
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
                    comments={post.comments}
                    likes={post.likes}
                    postId={post._id}
                    userId={post.likes.id}
                    />
            })}
        </div>

        </div>
    )

}

export default Dashboard;
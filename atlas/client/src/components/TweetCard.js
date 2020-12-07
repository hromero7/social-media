import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PostAPI from "../utils/PostAPI";


import { AuthContext } from "../context/AuthContext";
const TweetCard = (props) => {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState();

  // const postCommentHandler = () => {
  //   PostAPI.getSinglePost(props.postId).then(data => {
  //     setPost(data);
  //   });
  // }
    return (
    <div className="card mb-3 tweet-card">
        <div className="row no-gutters">
    <div className="col-md-4">
      <img src={"https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"} className="card-img tweet-img" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{props.user}</h5>
        <p className="card-text">{props.body}</p>
        <div className="engagement">
          <button className="engagement-btn">
            
            {
              props.likes.find((like) => like.id === user._id)
              ? <i className="fas fa-heart" style={{color: "red", fontSize: "1.2rem"}}> {props.likes.length} </i>
              : <i className="far fa-heart" style={{fontSize:"1.2rem"}}> {props.likes.length}</i>
              
            }
    
          </button>
          <Link to={`/post/${props.postId}`}>
            <button className="engagement-btn">
              <i className="far fa-comment" style={{fontSize: "1.2rem"}}> {props.comments.length}</i> 
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}


export default TweetCard;
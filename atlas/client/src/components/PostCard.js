import React, { useState, useContext } from "react";
import PostAPI from "../utils/PostAPI";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";

const PostCard = (props) => {
  const { user } = useContext(AuthContext);
  const { setPosts, setSinglePost, setLikes, setComments } = useContext(PostContext);

  const handleLikeBtn = () => {
    if (props.likes.find((like) => like.id === user._id)) {
      props.likes.find((like) => PostAPI.removeLike(props.postId, like._id).then(data => {
        console.log(data)
        PostAPI.getSinglePost(props.postId).then(data => {
            setSinglePost(data);
            setComments(data.comments)
            setLikes(data.likes);
            console.log(data);
  
          })
      }))
    } else {
      PostAPI.likePost(props.postId).then(data => {
        console.log(data)
        PostAPI.getSinglePost(props.postId).then(data => {
            setSinglePost(data);
            setComments(data.comments)
            setLikes(data.likes);
            console.log(data);
  
          })
      });
    }
  }

  const handleDelete = () => {
    PostAPI.deletePost(props.postId).then(data => {
      console.log(data);
      props.history.push("/dashboard");
      PostAPI.getPosts().then(data => {
        setPosts(data);
      })
    })
  }
    return (
    <div className="card mb-3 tweet-card">
        <div className="row no-gutters">
    <div className="col-md-4">
      <img src={"https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"} className="card-img tweet-img" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
      <div className="delete-btn">
      { props.userId === user._id ? <button className="engagement-btn" onClick={handleDelete}><i className="fas fa-trash-alt"></i></button> : null}
      </div>    
        {/* <button className="engagement-btn delete-btn"><i className="fas fa-trash-alt" style={{color: "red"}}></i></button> */}
        <h5 className="card-title">{props.user}</h5>
        <p className="card-text">{props.body}</p>
        <div className="engagement">
          <button className="engagement-btn" onClick={handleLikeBtn}>
            
            {
              props.likes.find((like) => like.id === user._id)
              ? <i className="fas fa-heart" style={{color: "red", fontSize: "1.2rem"}}> {props.likes.length} </i>
              : <i className="far fa-heart" style={{fontSize:"1.2rem"}}> {props.likes.length}</i>
              
            }
    
          </button>
            <button className="engagement-btn">
              <i className="far fa-comment" style={{fontSize: "1.2rem"}}> {props.comments.length}</i> 
            </button>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}


export default PostCard;
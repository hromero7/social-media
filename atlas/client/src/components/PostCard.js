import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PostCard = (props) => {
  const { user } = useContext(AuthContext);
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
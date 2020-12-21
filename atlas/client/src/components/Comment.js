import React, { useContext } from "react";
import PostAPI from "../utils/PostAPI";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";

const Comment = (props) => {
    const { user } = useContext(AuthContext);
    const { singlePost, setSinglePost, setLikes, setComments } = useContext(PostContext);

    const handleLikeBtn = () => {
        console.log(props.commentId);
        console.log(singlePost._id)
        if (props.likes.find((like) => like.id === user._id)) {
            props.likes.find((like) => PostAPI.removeCommentLike(singlePost._id, props.commentId, like._id).then(data => {
                PostAPI.getSinglePost(singlePost._id).then(data => {
                    setSinglePost(data);
                    setComments(data.comments);
                    setLikes(data.likes);
                })
            }))
        } else {
            PostAPI.likeComment(singlePost._id, props.commentId).then(data => {
                PostAPI.getSinglePost(singlePost._id).then(data => {
                    setSinglePost(data);
                    setComments(data.comments);
                    setLikes(data.likes);
                })
            })
        }
        
    }
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
          <button className="engagement-btn" onClick={handleLikeBtn}>
            
            {
              props.likes.find((like) => like.id === user._id)
              ? <i className="fas fa-heart" style={{color: "red", fontSize: "1.2rem"}}> {props.likes.length} </i>
              : <i className="far fa-heart" style={{fontSize:"1.2rem"}}> {props.likes.length}</i>
              
            }
    
          </button>
            {/* <button className="engagement-btn">
              <i className="far fa-comment" style={{fontSize: "1.2rem"}}> {props.comments.length}</i> 
            </button> */}
        </div>
      </div>
    </div>
  </div>
</div>
    )
}

export default Comment;
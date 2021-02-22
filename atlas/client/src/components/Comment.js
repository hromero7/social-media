import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PostAPI from "../utils/PostAPI";
import UserAPI from "../utils/UserAPI";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import Moment from "react-moment";

const Comment = (props) => {
    const { user, setUser, setFollowing } = useContext(AuthContext);
    const { singlePost, setSinglePost, setLikes, setComments } = useContext(PostContext);
    const [iconClass, setIconClass] = useState({ isHovered: false });
    const toggleIconClass = () => {
      setIconClass({ isHovered: true });
    }
    const toggleIconFalse = () => {
      setIconClass({ isHovered: false });
    }
    const handleLikeBtn = () => {
        // console.log(props.commentId);
        // console.log(singlePost._id)
        if (props.likes.find((like) => like.id === user._id)) {
            const like = props.likes.find((like) => like.id === user._id)
            PostAPI.removeCommentLike(singlePost._id, props.commentId, like._id).then(data => {
                PostAPI.getSinglePost(singlePost._id).then(data => {
                    setSinglePost(data);
                    setComments(data.comments);
                    setLikes(data.likes);
                })
            })
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

    const handleDelete = () => {
        PostAPI.deleteComment(singlePost._id, props.commentId).then(data => {
            // console.log(data);
            PostAPI.getSinglePost(singlePost._id).then(data => {
                setSinglePost(data);
                setComments(data.comments);
                setLikes(data.likes);
            })
        })
    }
      //follow user logic
  const handleFollowUser = () => {
    let followId = { followId: props.userId }
    UserAPI.followUser(followId).then(data => {
      // console.log(data);
      UserAPI.isAuthenticated().then(data => {
            setUser(data.user)
            setFollowing(data.user.following);
          });
    })
  }

  //unfollow user logic
  const handleUnfollowUser = () => {
    let unfollowId = { unfollowId: props.userId }
    UserAPI.unfollowUser(unfollowId).then(data => {
      // console.log(data)
      UserAPI.isAuthenticated().then(data => {
        setUser(data.user)
        setFollowing(data.user.following)
      });
    })
  }
    return (
        <div className="card mb-3 tweet-card profile-tweet">
        <div className="row no-gutters">
    <div className="col-md-4">
      <Link to={`/user/profile/${props.userId}`}>
      <img src={`data:image/jpeg;base64,${props.avatar}`} className="card-img tweet-img tweet-img-profile" alt="..."/>
      </Link>
    </div>
    <div className="col-md-8">
      <div className="card-body tweet-card-body">
      <div className="delete-btn">
      <Moment local format="MM/DD/YY hh:mm A" style={{fontSize:"10px"}}>{props.date}</Moment>
      { props.user === user.username ? <button className="engagement-btn user-engagement" onClick={handleDelete}><i className="fas fa-trash-alt"></i></button> : null}
      {
        user.following === undefined? null 
        : user.following.find((follow) => follow.id === props.userId) ?
        <button className="engagement-btn user-engagement" onClick={handleUnfollowUser} onMouseEnter={toggleIconClass} onMouseLeave={toggleIconFalse}>
          <i class={iconClass.isHovered? "fas fa-user-times" : "fas fa-user-check"} style={iconClass.isHovered? {color: "red"} : {color: "blue"}}></i>
        </button> 
        : props.userId !== user._id ?  
        <button className="engagement-btn user-engagement" onClick={handleFollowUser}><i class="fas fa-user-plus" style={{color: "green"}}></i></button> 
        : null
      }
      </div>   
        <h5 className="card-title">@{props.user}</h5>
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
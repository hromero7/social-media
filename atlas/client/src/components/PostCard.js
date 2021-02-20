import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import PostAPI from "../utils/PostAPI";
import UserAPI from "../utils/UserAPI";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import { MessageContext} from "../context/MessageContext";
import Moment from "react-moment";

const PostCard = (props) => {
  const { user, setUser, setFollowing } = useContext(AuthContext);
  const { setPosts, setSinglePost, setLikes, setComments, postImage, setPostImage } = useContext(PostContext);
  const { setMessage } = useContext(MessageContext);
  const [iconClass, setIconClass] = useState({ isHovered: false });

  useEffect(() => {
    UserAPI.getImage(props.userId).then(data => {
      setPostImage(data);
    })
  },[props.userId])

  const toggleIconClass = () => {
    setIconClass({ isHovered: true });
  }
  const toggleIconFalse = () => {
    setIconClass({ isHovered: false });
  }
  const handleLikeBtn = () => {
    if (props.likes.find((like) => like.id === user._id)) {
      const like = props.likes.find((like) => like.id === user._id);
  
      PostAPI.removeLike(props.postId, like._id).then(data => {
        console.log(data)
        PostAPI.getSinglePost(props.postId).then(data => {
            setSinglePost(data);
            setComments(data.comments)
            setLikes(data.likes);
            console.log(data);
  
          })
      })
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
      setMessage(data);
      setTimeout(() => setMessage(null), 4000);
      PostAPI.getPosts().then(data => {
        setPosts(data);
      })
    })
  }
  //follow user logic
  const handleFollowUser = () => {
    let followId = { followId: props.userId }
    UserAPI.followUser(followId).then(data => {
      console.log(data);
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
      console.log(data)
      UserAPI.isAuthenticated().then(data => {
        setUser(data.user)
        setFollowing(data.user.following)
      });
    })
  }
    return (
    <div className="card mb-3 tweet-card">
        <div className="row no-gutters">
    <div className="col-md-4">
      <Link to={`/user/profile/${props.userId}`}>
      <img src={postImage} className="card-img tweet-img" alt="..."/>
      </Link>
    </div>
    <div className="col-md-8">
      <div className="card-body tweet-card-body">
      <div className="delete-btn">
      <Moment local format="MM/DD/YY hh:mm A" style={{fontSize:"10px"}}>{props.date}</Moment>
      { props.userId === user._id ? <button className="engagement-btn user-engagement" onClick={handleDelete}><i className="fas fa-trash-alt"></i></button> : null}
      {
        user.following === undefined ? null 
        : user.following.find((follow) => follow.id === props.userId) ?
        <button className="engagement-btn user-engagement" onClick={handleUnfollowUser} onMouseEnter={toggleIconClass} onMouseLeave={toggleIconFalse}>
          <i class={iconClass.isHovered? "fas fa-user-times" : "fas fa-user-check"} style={iconClass.isHovered? {color: "red"} : {color: "blue"}}></i>
        </button> 
        : props.userId !== user._id ?  
        <button className="engagement-btn user-engagement" onClick={handleFollowUser}><i class="fas fa-user-plus" style={{color: "green"}}></i></button> 
        : null
      }
      </div>
        {/* <button className="engagement-btn delete-btn"><i className="fas fa-trash-alt" style={{color: "red"}}></i></button> */}
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
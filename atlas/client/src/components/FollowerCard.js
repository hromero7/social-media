import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostAPI from "../utils/PostAPI";
import UserAPI from "../utils/UserAPI";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";

const FollowerCard = (props) => {
  const { user, setUser, setFollowing } = useContext(AuthContext);
  const [iconClass, setIconClass] = useState({ isHovered: false });
  // useEffect(() => {
  //   UserAPI.isAuthenticated().then(data => {
  //     setUser(data.user)
  //   })
  // },[])
  const toggleIconClass = () => {
    setIconClass({ isHovered: true });
  }
  const toggleIconFalse = () => {
    setIconClass({ isHovered: false });
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
      <img src={`data:image/jpeg;base64,${props.avatar}`} className="card-img tweet-img" alt="..."/>
    </Link>
    </div>
    <div className="col-md-8">
      <div className="card-body">
      <div className="delete-btn">
      {
       user.following === undefined? null :
        user.following.find((follow) => follow.id === props.userId) ?
        <button className="engagement-btn" onClick={handleUnfollowUser} onMouseEnter={toggleIconClass} onMouseLeave={toggleIconFalse}>
          <i class={iconClass.isHovered? "fas fa-user-times" : "fas fa-user-check"} style={iconClass.isHovered? {color: "red"} : {color: "blue"}}></i>
        </button> 
        : props.userId !== user._id ?  
        <button className="engagement-btn" onClick={handleFollowUser}><i class="fas fa-user-plus" style={{color: "green"}}></i></button> 
        : null
      }
      </div>
        <h5 className="card-title">{props.firstName} {props.lastName}</h5>
        <h5 className="card-title">@{props.username}</h5>
        <p className="card-text">{props.bio}</p>
      </div>
    </div>
  </div>
</div>
    )
}


export default FollowerCard;
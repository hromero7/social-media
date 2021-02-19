import React, { useEffect, useState, useContext } from "react";
import Modal from "./Modal";
import UserAPI from "../utils/UserAPI";
import { AuthContext } from "../context/AuthContext";
import FollowerModal from "./FollowerModal";
import FollowingModal from "./FollowingModal";

const ProfileCard = () => {
  const { user, followers, following } = useContext(AuthContext);
  // const [user,setUser] = useState("");
  // useEffect(() => {
  //   UserAPI.getImage(user._id).then(data => {
  //     setUserImage(data);
  // })
  // },[])
  

    return (
        <div className="card profile-card">
        <img
          src={`data:image/jpeg;base64,${user.avatar}`}
          className="card-img-top profile-card-top"
          alt="profile"
        />
        <div className="card-body">
          <h1 className="card-text name">{user.firstName} {user.lastName}</h1>
          <h1 className="card-text username">@{user.username}</h1>
          <p className="card-text">
            <span>Bio:</span> {user.bio}
          </p>
        <div className="user-followers">
          <a className="card-text">
            <FollowingModal following={following}/>
            {/* <span>Following:</span> {following === undefined? 0 : following.length} */}
          </a>
          <a className="card-text">
          <FollowerModal followers={followers}/>
            {/* <span>Followers:</span> {followers === undefined? 0 : followers.length } */}
          </a>
        </div>
          <div className="card-btn">
            {/* <button className="btn btn-primary">Edit Profile</button> */}
            <Modal/>
          </div>
        </div>
      </div>
    )
}

export default ProfileCard;
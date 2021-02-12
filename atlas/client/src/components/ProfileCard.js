import React, { useEffect, useState, useContext } from "react";
import Modal from "./Modal";
import UserAPI from "../utils/UserAPI";
import { AuthContext } from "../context/AuthContext";

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
          <h1 className="card-text username">@{user.username}</h1>
          <p className="card-text">
            <span>Bio:</span> {user.bio}
          </p>
          <p className="card-text">
            <span>Following:</span> {following === undefined? 0 : following.length}
          </p>
          <p className="card-text">
            <span>Followers:</span> {followers === undefined? 0 : followers.length }
          </p>
          <p className="card-text">
            <span>Age:</span> 21
          </p>
          <div className="card-btn">
            {/* <button className="btn btn-primary">Edit Profile</button> */}
            <Modal/>
          </div>
        </div>
      </div>
    )
}

export default ProfileCard;
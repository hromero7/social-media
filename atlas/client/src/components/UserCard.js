import React, { useEffect, useState, useContext } from "react";
import Modal from "./Modal";
import UserAPI from "../utils/UserAPI";
import { AuthContext } from "../context/AuthContext";
import UserFollowerModal from "./UserFollowerModal";
import UserFollowingModal from "./UserFollowingModal";

const UserCard = (props) => {
  const { user } = useContext(AuthContext);
    return (
        <div className="card user-profile">
        <img
          src={`data:image/jpeg;base64,${props.avatar}`}
          className="card-img-top profile-card-top"
          alt="profile"
        />
        <div className="card-body profile-card-body">
          <h1 className="card-text name">{props.firstName} {props.lastName}</h1>
          <h2 className="card-text username">@{props.username}</h2>
          <p className="card-text">
           {props.bio}
          </p>
            <div className="user-followers">
          <a className="card-text">
            <UserFollowingModal username={props.username}/>
            {/* <span>Following:</span> {props.following === undefined? 0 : props.following.length} */}
          </a>
          <a className="card-text">
            <UserFollowerModal username={props.username}/>
            {/* <span>Followers:</span> {props.followers === undefined? 0 : props.followers.length } */}
          </a>
          </div>
          <div className="card-btn">
            {user._id === props.userId ? <Modal/> : null}
          </div>
        </div>
      </div>
    )
}

export default UserCard;
import React, { useContext } from "react";
import Modal from "./Modal";
import UserAPI from "../utils/UserAPI";
import { AuthContext } from "../context/AuthContext";
import FollowerModal from "./FollowerModal";
import FollowingModal from "./FollowingModal";

const ProfileCard = () => {
  const { user, followers, following } = useContext(AuthContext);

    return (
        <div className="card profile-card user-profile">
        <img
          src={`data:image/jpeg;base64,${user.avatar}`}
          className="card-img-top profile-card-top"
          alt="profile"
        />
        <div className="card-body profile-card-body">
          <h1 className="card-text name">{user.firstName} {user.lastName}</h1>
          <h1 className="card-text username">@{user.username}</h1>
          <p className="card-text profile-bio">
            {user.bio}
          </p>
        <div className="user-followers">
          <a className="card-text follower-text">
            <FollowingModal username={user.username} following={following}/>
            {/* <span>Following:</span> {following === undefined? 0 : following.length} */}
          </a>
          <a className="card-text follower-text">
          <FollowerModal username={user.username} followers={followers}/>
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
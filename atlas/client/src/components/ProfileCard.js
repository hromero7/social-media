import React, { useEffect, useState } from "react";
import UserAPI from "../utils/UserAPI";


const ProfileCard = () => {
  const [user,setUser] = useState("");

  useEffect(() => {
    UserAPI.isAuthenticated().then(data => {
      console.log(data.user)
      setUser(data.user);
    })
  },[])

    return (
        <div className="card profile-card">
        <img
          src={"https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"}
          className="card-img-top profile-card-top"
          alt="profile"
        />
        <div className="card-body">
    <h1 className="card-text username">@{user.username}</h1>
          <p className="card-text">
            <span>Bio:</span> Hello world my name is {user.firstName} {user.lastName}
          </p>
          <p className="card-text">
            <span>Location:</span> London, UK
          </p>
          <p className="card-text">
            <span>Age:</span> 21
          </p>
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      </div>
    )
}

export default ProfileCard;
import React from "react";

const ProfileCard = () => {

    return (
        <div className="card profile-card">
        <img
          src={"https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"}
          className="card-img-top profile-card-top"
          alt="profile"
        />
        <div className="card-body">
          <h1 className="card-text username">@username</h1>
          <p className="card-text">
            <span>Bio:</span> Hello world my name is....
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
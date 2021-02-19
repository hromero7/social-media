import React, { useContext, useEffect, useState } from "react";
import UserAPI from "../utils/UserAPI";
import FollowerCard from "../components/FollowerCard";
import { AuthContext } from "../context/AuthContext";

const UserFollowingModal = (props) => {
const [following, setFollowing] = useState([]);
useEffect(() => {
    let id = window.location.pathname.split("/");
    console.log(id[3])
    UserAPI.getUserFollowing(id[3]).then(data => {
        setFollowing(data);
        console.log(data)
    })
  },[]);

    return (
    <div>
        <a type="button" data-toggle="modal" data-target="#userFollowingModal">
          Following: {following === undefined? 0 : following.length}
        </a>
        <div className="modal fade" id="userFollowingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Following</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                </button>
              </div>
              <div className="modal-body">
                {following.length === 0 ? `${props.username} is currently not following anyone`
                : following.map((following, i) => {
                    return (
                        <FollowerCard
                        key={i} 
                        username={following.username}
                        firstName={following.firstName}
                        lastName={following.lastName}
                        bio={following.bio}
                        userId={following._id}
                        avatar={following.avatar}
                        />
                    )
                })}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
}

export default UserFollowingModal;
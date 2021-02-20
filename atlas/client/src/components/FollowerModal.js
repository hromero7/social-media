import React, { useEffect, useState } from "react";
import UserAPI from "../utils/UserAPI";
import FollowerCard from "../components/FollowerCard";

const FollowerModal = (props) => {
const [followers, setFollowers] = useState([]);

useEffect(() => {
    UserAPI.getFollowersList().then(data => {
        setFollowers(data);
        console.log(data)
    })
  },[]);

    return (
    <div>
        <a type="button" data-toggle="modal" data-target="#followerModal">
          Followers: {props.followers === undefined? 0 : props.followers.length}
        </a>
        <div className="modal fade" id="followerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Followers</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                </button>
              </div>
              <div className="modal-body">
                {followers.length === 0? `${props.username} is currently not followed by anyone`
                : followers.map((follower, i) => {
                    return (
                        <FollowerCard
                        key={i} 
                        username={follower.username}
                        firstName={follower.firstName}
                        lastName={follower.lastName}
                        bio={follower.bio}
                        userId={follower._id}
                        avatar={follower.avatar}
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

export default FollowerModal;
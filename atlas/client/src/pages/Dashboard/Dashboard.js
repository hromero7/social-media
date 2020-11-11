import React from "react";
import ProfileCard from "../../components/ProfileCard";
import TweetCard from "../../components/TweetCard";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="container dashboard">
        
        <div>
            <ProfileCard/>
        </div>
        
        <div className="feed">
            <TweetCard/>
            <TweetCard/>
            <TweetCard/>
            <TweetCard/>
            <TweetCard/>
        </div>

        </div>
    )

}

export default Dashboard;
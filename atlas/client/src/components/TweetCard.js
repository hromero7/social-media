import React from "react";

const TweetCard = () => {
    return (
    <div className="card mb-3 tweet-card">
        <div className="row no-gutters">
    <div className="col-md-4">
      <img src={"https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"} className="card-img tweet-img" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div>
    )
}


export default TweetCard;
import React from "react";

const NavBar = () => {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Social Bug</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-link active" href="#">Login <span className="sr-only">(current)</span></a>
      <a className="nav-link" href="#">Home</a>
      <a className="nav-link" href="#">Sign Up</a>
    </div>
    </div>
    </nav>
    )
}

export default NavBar;
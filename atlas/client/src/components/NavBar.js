import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserAPI from "../utils/UserAPI";
import { AuthContext } from "../context/AuthContext";

const NavBar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

  const logoutHandler = () => {
    UserAPI.logout().then(data => {
      if (data.success) {
        setUser(data.user)
        setIsAuthenticated(false);
      }
    });
  }

  const logoutStyle = {
    position : "absolute",
    right: "1%"
  }
  const profileStyle = {
    position : "absolute",
    right: "8%"
  }
  const dashStyle = {
    position : "absolute",
    right: "15%"
  }

  //Nav items that will populate when user is not logged in
  const unauthenticatedNavBar = () => {
    return (
        <div className="navbar-nav">
          <Link to="/">
            <a className="nav-link active" href="#">Login <span className="sr-only">(current)</span></a>
          </Link>
          <Link to="/signup">
            <a className="nav-link" href="#">Sign Up</a>
          </Link>
        </div>
    );
  };

  //Nav items that will populate when user is logged in
  const authenticatedNavBar = () => {
    return (
    <div className="navbar-nav">
          <Link to="/dashboard">
            <a className="nav-link" style={dashStyle} href="#">Dashboard <i class="fas fa-list"></i></a>
          </Link>
          <Link to="/profile">
            <a className="nav-link" style={profileStyle} href="#">Profile <i class="far fa-user"></i></a>
          </Link>
          <button className="btn btn-primary" style={logoutStyle} onClick={logoutHandler}>Logout</button>
        </div>
    );
  }

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* <a className="navbar-brand" href="#">Social Bug</a> */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar() }
    
    </div>
    </nav>
    )
}

export default NavBar;
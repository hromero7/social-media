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
            <a className="nav-link" href="#">Dashboard <i className="fas fa-list"></i></a>
          </Link>
          <Link to="/profile">
            <a className="nav-link" href="#">Profile <i className="far fa-user"></i></a>
          </Link>
          <Link to="/settings">
            <a className="nav-link" href="#">Settings <i className="fas fa-cog"></i></a>
          </Link>
          <button className="btn btn-primary" onClick={logoutHandler}>Logout</button>
        </div>
    );
  }

    return (
    <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand social-brand-name" href="#">Social Bug</a>
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
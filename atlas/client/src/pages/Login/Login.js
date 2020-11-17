import React, { useState, useContext } from 'react';
import UserAPI from "../../utils/UserAPI";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
import Icon from "../assets/bugIcon.png";

const Login = () => {
    const [user, setUser] = useState({ username: "", password: "" });
    const authContext = useContext(AuthContext);
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    
    const handleChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        UserAPI.login(user).then(data => {
            console.log(data)
          const { isAuthenticated, user } = data;
          console.log(isAuthenticated)
          if (isAuthenticated) {
              authContext.setUser(user);
              authContext.setIsAuthenticated(isAuthenticated);
              setInvalidCredentials(false);
            //   window.location.replace("/dashboard");
          } else {
              setInvalidCredentials(true);
          }
        });
    }
    
    const renderWarningMsg = () => {
        return (
            <div className="alert alert-danger" role="alert">
                Please Enter Valid Credentials!
            </div>
        )
    }

    return(
        <div className="container loginPage">
            <h1 className="socialTitle">Social<span className="subtitle">Bug</span>
            {/* <i className="fas fa-bug"></i> */}
            <img className="bugIcon" src={Icon} alt=""/>
            </h1>
            
            <form className="loginForm" onSubmit={handleSubmit}>
                {invalidCredentials === true ? renderWarningMsg() : null }
            <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" name="username" onChange={handleChange}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
            <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name="password" onChange={handleChange}/>
        </div>
            <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label">Check me out</label>
        </div>
  <button type="submit" className="btn btn-primary">Login</button> or 
  <a href="/signup"> Register a new account</a>
</form>
        </div>
    )
}

export default Login;
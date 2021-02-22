import React, { useState, useContext } from 'react';
import UserAPI from "../../utils/UserAPI";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
import Icon from "../assets/bugIcon.png";
import Icon2 from "../assets/bugIconWhite.png";

import { Link } from "react-router-dom";


const Login = (props) => {
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
              window.location.replace("/dashboard");
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
        <div className="loginContainer">
            <div className="titleContainer" style={{textAlign: "center"}}>
                <h1 className="socialTitle">Social Bug</h1>
                <p style={{textAlign: "center", fontWeight: "bold"}}>New here? Click here to sign up!</p>
                <Link to="/signup">
                    <button className="btn btn-primary">Get Started</button>
                </Link>
            </div>

            <div className="circle animate__animated animate__rotateOutDownLeft animate__delay-1s">
            <img className="bugIcon2" src={Icon2} alt=""/>       
            </div>
            
        <div className="loginPage">
            <form className="loginForm" onSubmit={handleSubmit}>
                {invalidCredentials === true ? renderWarningMsg() : null }
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" name="username" onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>
        
        </div>
    )
}

export default Login;
import React from "react";
import "./SignUp.css";
import Icon from "../assets/bugIcon.png";

const SignUp = () => {
    return (
<div className="container">
<h1 className="socialTitle">Social<span className="subtitle">Bug</span>
            {/* <i className="fas fa-bug"></i> */}
    <img className="bugIcon" src={Icon} alt=""/>
</h1>

<div className="form">
<form className="signup-form">
<div className="form-group">
    <label for="firstName">First Name</label>
    <input type="text" className="form-control" id="firstName" aria-describedby="emailHelp"/>
  </div>
  <div className="form-group">
    <label for="lastName">Last Name</label>
    <input type="text" className="form-control" id="lastName" aria-describedby="emailHelp"/>
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
  </div>
  <div className="form-group">
    <label for="lastName">Username</label>
    <input type="text" className="form-control" id="username" aria-describedby="emailHelp"/>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password"/>
  </div>
  <button type="submit" className="btn btn-primary">Sign Up</button>
  <p className="login-link">Already have an account? Login <a href="/">here</a></p>
</form>
</div>
</div>
    )
}

export default SignUp;
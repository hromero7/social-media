import React, { useState, useContext } from "react";
import UserAPI from "../../utils/UserAPI";
import { AuthContext } from "../../context/AuthContext";
import "./SignUp.css";
import Icon from "../assets/bugIcon.png";

const SignUp = () => {
  const [user, setUser] = useState({firstName: "", lastName: "", email: "", username: "", password: ""})
  const authContext = useContext(AuthContext);

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    UserAPI.register(user).then(data => {
      console.log(data);
    });
  }

    return (
<div className="container">
<h1 className="socialTitle">Social<span className="subtitle">Bug</span>
            {/* <i className="fas fa-bug"></i> */}
    <img className="bugIcon" src={Icon} alt=""/>
</h1>

<div className="form">
<form className="signup-form" onSubmit={handleSubmit}>
<div className="form-group">
    <label for="firstName">First Name</label>
    <input type="text" className="form-control" name="firstName" onChange={handleChange} />
  </div>
  <div className="form-group">
    <label for="lastName">Last Name</label>
    <input type="text" className="form-control" name="lastName" onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input type="email" className="form-control" name="email" onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label for="lastName">Username</label>
    <input type="text" className="form-control" name="username" onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" name="password" onChange={handleChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Sign Up</button>
  <p className="login-link">Already have an account? Login <a href="/">here</a></p>
</form>
</div>
</div>
    )
}

export default SignUp;
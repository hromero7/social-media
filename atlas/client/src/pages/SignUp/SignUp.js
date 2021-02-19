import React, { useState, useContext } from "react";
import UserAPI from "../../utils/UserAPI";
import { AuthContext } from "../../context/AuthContext";
import "./SignUp.css";
import Icon from "../assets/bugIcon.png";
import Icon2 from "../assets/bugIconWhite.png";
import { Link } from "react-router-dom";


const SignUp = () => {
  const [user, setUser] = useState({firstName: "", lastName: "", email: "", username: "", password: ""});
  const [message, setMessage] = useState({});
  const authContext = useContext(AuthContext);

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const resetForm = () => {
    setUser({ firstName: "", lastName: "", email: "", username: "", password: "" })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    UserAPI.register(user).then(data => {
      const { message } = data;
      console.log(message);
      setMessage(message);
      resetForm();
     
    });
  }
  const renderSuccessMsg = () => {
    return (
        <div className="alert alert-primary" role="alert">
            {message.msgBody}
        </div>
    )
}

const renderWarningMsg = () => {
  return (
      <div className="alert alert-danger" role="alert">
          {message.msgBody}
      </div>
  )
}

    return (
      <div>
          <div className="circle2 animate__animated animate__rotateOutDownRight animate__delay-1s">
            <img className="bugIcon2" src={Icon2} alt=""/>       
          </div>

          <div className="titleContainer" style={{textAlign: "center"}}>
            <h1 className="socialTitle">Social Bug
            {/* <i className="fas fa-bug"></i> */}
            <img className="bugIcon" src={Icon} alt=""/>       
            </h1>
            <p className="subtitle" style={{textAlign: "center", fontWeight: "bold"}}>Already have an account? Click here to Login!</p>
            <Link to="/">
              <a href="#"><button className="btn btn-primary">Login</button></a>
            </Link>
          </div>

          <div className="form">
            <form className="signup-form" onSubmit={handleSubmit}>
              {message.msgBody && !message.msgError ? renderSuccessMsg() : message.msgBody && message.msgError 
              ? renderWarningMsg() : null}
            <div className="form-group">
                <label for="firstName">First Name</label>
                <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={handleChange}/>
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange}/>
              </div>
              <div className="form-group">
                <label for="lastName">Username</label>
                <input type="text" className="form-control" name="username" value={user.username} onChange={handleChange}/>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange}/>
              </div>
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
          </div>

</div>
    )
}

export default SignUp;
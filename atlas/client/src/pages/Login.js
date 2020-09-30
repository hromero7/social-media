import React from 'react';
import "./Login.css";
import Icon from "../pages/assets/bugIcon.png";

const Login = () => {
    return(
        <div className="container loginPage">
            <h1 className="socialTitle">Social<span className="subtitle">Bug</span>
            {/* <i className="fas fa-bug"></i> */}
            <img className="bugIcon" src={Icon} alt=""/>
            </h1>
            
            <form>
            <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
            <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
            <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <a href="/register">Register a new account</a>
</form>
        </div>
    )
}

export default Login
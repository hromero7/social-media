import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import NavBar from "./components/NavBar";
import Post from "./pages/Post/Post";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  console.log(user);
  console.log(isAuthenticated);
  return (
    <Router>
      <div>
      <NavBar/>
      <PublicRoute exact path= "/" component={Login}/>
      <PublicRoute exact path="/signup" component={SignUp}/>
      <PrivateRoute exact path="/post/:id" component={Post}/>
      <PrivateRoute exact path="/profile" component={Profile}/>
      <PrivateRoute path="/dashboard" component={Dashboard}/>
      </div>
    </Router>
    
  );
}

export default App;

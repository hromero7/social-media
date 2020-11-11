import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import NavBar from "./components/NavBar";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  console.log(user);
  console.log(isAuthenticated);
  return (
    <Router>
      <div>
      <NavBar/>
      <Route exact path= "/" component={Login}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      </div>
    </Router>
    
  );
}

export default App;

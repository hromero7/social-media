import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp";
import NavBar from "./components/NavBar";

function App(props) {
  return (
    <Router>
      <div>
      <NavBar/>
      <Route exact path= "/" component={Login}/>
      <Route exact path="/signup" component={SignUp}/>
      </div>
    </Router>
    
  );
}

export default App;

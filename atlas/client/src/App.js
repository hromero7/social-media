import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";

function App(props) {
  return (
    <Router>
      <div>
      <Route exact path= "/" component={Login}/>
      </div>
    </Router>
    
  );
}

export default App;

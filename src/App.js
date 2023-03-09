import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';

import TweetsList from "./components/tweets-list.component";

class App extends Component {
  render() {
    return (
      <div>
       <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tweets"} className="navbar-brand">
            tweets
          </Link>
       </nav>
        

        <div className="container mt-3">
          <Routes>
            <Route path="/tweets" element={<TweetsList/>} />
          </Routes>
        </div>
      </div>
    );
  }
}


export default App;

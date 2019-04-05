import React, { Component } from 'react';
// import ConfirmedTable from './ConfirmedTable.js';
import Homepage from './Homepage.js';
import Sessionpage from './Sessionpage.js';
import Topbar from './Topbar.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Dashboard extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
        <Router>
          <Topbar />
        hi
        {/* <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sessions">Sessions</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
  
          <hr /> */}
        <div>
          <Route exact path="/" component={Homepage} />
          <Route path="/sessions" component={Sessionpage} />
        </div>
      </Router>
    );
  }
}
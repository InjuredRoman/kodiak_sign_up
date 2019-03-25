import React, { Component } from 'react';
// import ConfirmedTable from './ConfirmedTable.js';
import Homepage from './Homepage.js';
import SessionPage from './SessionPage.js';
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
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">Sessions</Link>
            </li>
            {/* <li>
              <Link to="/topics">Topics</Link>
            </li> */}
          </ul>
  
          <hr />
  
          <Route exact path="/" component={Homepage} />
          <Route path="/sessions" component={SessionPage} />
          {/* <Route path="/somethingelse" component={SomethingElsePage} /> */}
        </div>
      </Router>
    );
  }
}
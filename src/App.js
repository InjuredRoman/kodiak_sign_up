import React, { Component } from 'react';
import SignupForm from './frontend/Form.js';
import Dashboard from './frontend/Dashboard.js';
import ActivitiesPage from './frontend/ActivitiesPage';
import ActivityForm from './frontend/ActivityForm';
import Homepage from './frontend/Homepage.js';
import Sessionpage from './frontend/Sessionpage.js';
import Topbar from './frontend/Topbar.js';
import EnrollmentUpdate from './frontend/EnrollmentUpdate.js';
import {Container, Header, Segment} from 'semantic-ui-react';
import './App.css';
import { Form, Field } from 'react-final-form';
import { HashRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div>
      {/* <Segment inverted> */}
        {/* <Container text>
          <Header
            as='h1'
            textAlign='center'
            inverted
            content='KIBSD After School Activity Sign-up'
            style={{
              fontSize: '4em',
              fontWeight: 'normal',
              marginBottom: '3em',
              marginTop: '2em',
            }}
          />
        </Container> */}
      {/* </Segment> */}
      {/* <center><Homepage /></center> */}

      <Router>
        <Topbar/>
      {/* </Router> */}
      {/* <Router> */}
          <Route path="/home" component={Homepage} />
          <Route path="/sessions" component={Sessionpage} />
          <Route path="/activity" component={ActivityForm} />
          <Route path="/activities" component={ActivitiesPage} />
          <Route path="/signup" component={SignupForm} />
          {/* <Route
            path='/confirm_enrollment/:enrollment_id'
            render={(props) => <EnrollmentUpdate {...props} update_type={'confirm'} />}
          />
          <Route
            path='/cancel_enrollment/:enrollment_id'
            render={(props) => <EnrollmentUpdate {...props} update_type={'cancel'} />}
          /> */}
      </Router>

      </div>
    );
  }
}

export default App;

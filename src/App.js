import React, { Component } from 'react';
import SignupForm from './Form.js';
import Dashboard from './Dashboard.js';
import Homepage from './Homepage.js';
import Sessionpage from './Sessionpage.js';
import Topbar from './Topbar.js';
import {Container, Header, Segment} from 'semantic-ui-react';
import './App.css';
import { Form, Field } from 'react-final-form';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div>
      <Segment inverted>
        <Container text>
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
        </Container>
      </Segment>
      <center><Homepage /></center>
      <Router>
      <Topbar />
        <div>
          <Route path="/sessions" component={Sessionpage} />
        </div>
      </Router>

      </div>
    );
  }
}

export default App;

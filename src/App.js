import React, { Component } from 'react';
import SignupForm from './Form.js';
import {Container, Header, Segment} from 'semantic-ui-react';
import './App.css';
import { Form, Field } from 'react-final-form';


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
        <SignupForm name="roman"/>

      </div>
    );
  }
}

export default App;

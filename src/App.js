import React, { Component } from 'react';
import SignupForm from './frontend/Form.js';
import Dashboard from './frontend/Dashboard.js';
import AuthorizedWrapper from './frontend/AuthorizedWrapper';
import ActivitiesPage from './frontend/ActivitiesPage';
import ActivityForm from './frontend/ActivityForm';
import LoginForm from './frontend/LoginForm';
import Homepage from './frontend/Homepage.js';
import EnrollmentsPage from './frontend/EnrollmentsPage.js';
import Topbar from './frontend/Topbar.js';
import EnrollmentUpdate from './frontend/EnrollmentUpdate.js';
import {Container, Header, Segment} from 'semantic-ui-react';
import './App.css';
import { Form, Field } from 'react-final-form';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import deepPurple from '@material-ui/core/colors/purple';
import yellow from '@material-ui/core/colors/yellow';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import { palette } from '@material-ui/system';
//https://material-ui.com/style/color/
const p = deepPurple[500];
const s = yellow[600];
// const theme = createMuiTheme({
//     palette: {
//         primary: deepPurple,
//         secondary: yellow,
//     },
//     typography: { useNextVariants: false },
// })

const theme = createMuiTheme({ // same theme, just dark
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
  // palette: {
  //     primary: deepPurple,
  //     secondary: yellow,
  // },
  typography: { useNextVariants: false },
});

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Grid container spacing={40}>
      <Router >
          <Grid item xs={12}>
          <Topbar />
          </Grid>
          <Grid item xs={12} style={{'margin-top':'10px'}}>
          <Route path="/home" component={Homepage} />
          <Route path="/login" component={LoginForm} />
          <Route path="/enrollments"
            render={(props) => <AuthorizedWrapper {...props}><EnrollmentsPage /></AuthorizedWrapper> }
          />
          <Route path="/activity"
            render={(props) => <AuthorizedWrapper {...props}><ActivityForm /></AuthorizedWrapper> }
          />
          <Route path="/sessions" 
            render={(props) => <AuthorizedWrapper {...props}><ActivitiesPage /></AuthorizedWrapper> }
          />
          <Route path="/signup" 
            render={(props) => <AuthorizedWrapper {...props}><SignupForm /></AuthorizedWrapper> }
          />
          </Grid>
      {/* </Router> */}
      {/* <Router> */}
          {/* <Route
            path='/confirm_enrollment/:enrollment_id'
            render={(props) => <EnrollmentUpdate {...props} update_type={'confirm'} />}
          />
          <Route
            path='/cancel_enrollment/:enrollment_id'
            render={(props) => <EnrollmentUpdate {...props} update_type={'cancel'} />}
          /> */}
      </Router>
      </Grid>
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

      </MuiThemeProvider>

    );
  }
}

export default App;

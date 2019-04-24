import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

//component imports
import Login from 'components/Admin/Login';
import Dashboard from 'components/Admin/Dashboard';
import Signup from 'components/Parent/Signup';

//routing support
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import { SnackbarProvider, withSnackbar } from 'notistack';
//theme for site
import deepPurple from '@material-ui/core/colors/deepPurple';
import amber from '@material-ui/core/colors/amber';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SnackEnrollmentUpdate from './components/Parent/EnrollmentUpdate';
const theme = createMuiTheme( // same theme, just dark
  {
  //   palette: {
  //     primary: deepPurple,
  //     secondary: amber,
  //   },
  // }
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
}
);
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
    <Router>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Dashboard} />
          <Route path="/update_enrollments/:token" 
            render={
                (props) => 
                <SnackbarProvider maxSnack={5}>
                  <SnackEnrollmentUpdate {...props}/>
                </SnackbarProvider>
              }
          />
        </Switch>
    </Router>
    </MuiThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

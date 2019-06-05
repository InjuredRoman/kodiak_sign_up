import React from 'react';
import ReactDOM from 'react-dom';
import './web.config';
import 'babel-polyfill';
import './index.css';
import * as serviceWorker from './serviceWorker';

import {SnackbarProvider} from 'notistack';

//component imports
import Login from 'components/Admin/Login';
import Registration from 'components/Admin/Registration';
import Homepage from 'components/Admin/Homepage';
import Signup from 'components/Parent/Signup';
import Signup_Redux from 'components/Parent/Signup_redux';
import NoMatch from 'components/NoMatch';

import 'semantic-ui-css/semantic.min.css'

//routing support
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import DateFnsUtils from '@date-io/date-fns'; // for datepickers, peer dependency of material-ui-pickers
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
//theme for site
import deepPurple from '@material-ui/core/colors/deepPurple';
import amber from '@material-ui/core/colors/amber';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SnackEnrollmentUpdate from './components/Parent/EnrollmentUpdate';
import 'assets/css/styles.css';
const theme = createMuiTheme({
    // same theme, just dark
    // palette: {
    //   type: 'dark', // Switching the dark mode on is a single property value change.
    // },
    typography: {
        useNextVariants: true,
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    // {
    //     palette: {
    //         primary: deepPurple,
    //         secondary: amber,
    //     },
    // }
    // typography: { useNextVariants: true },
});

// const theme = createMuiTheme(
//     // same theme, just dark
//     {
//         //   palette: {
//         //     primary: deepPurple,
//         //     secondary: amber,
//         //   },
//         // }
//         palette: {
//             primary: {
//                 light: '#757ce8',
//                 main: '#3f50b5',
//                 dark: '#002884',
//                 contrastText: '#fff',
//             },
//             secondary: {
//                 light: '#ff7961',
//                 main: '#f44336',
//                 dark: '#ba000d',
//                 contrastText: '#000',
//             },
//             background: {
//                 main: 'black',
//                 // main: '#e0e0e0'
//             },
//         },
//     }
// );
ReactDOM.render(

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={theme}>
    <SnackbarProvider>
        <Router>
            <Switch>
                {/* <Route path="/signup" component={Signup} /> */}
                <Route path="/login" component={Login} />
                <Route path="/register" component={Registration} />
                <Route path="/admin" component={Homepage} />
                <Route
                    path="/update_enrollments/:token"
                    render={props => (
                        <SnackbarProvider maxSnack={5}>
                            <SnackEnrollmentUpdate {...props} />
                        </SnackbarProvider>
                    )}
                />
                <Route path="/signup" component={Signup} />
                <Route component={NoMatch} />
            </Switch>
        </Router>
    </SnackbarProvider>
        </MuiThemeProvider>
    </MuiPickersUtilsProvider>
    ,
    document.getElementById('root')
);
export default theme;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

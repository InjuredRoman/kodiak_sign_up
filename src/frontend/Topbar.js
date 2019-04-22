import React, { Component } from 'react';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import NoSsr from '@material-ui/core/NoSsr';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter} from "react-router-dom";
// import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import deepPurple from '@material-ui/core/colors/purple';
import yellow from '@material-ui/core/colors/yellow';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({ // same theme, just dark
  // palette: {
  //   type: 'dark', // Switching the dark mode on is a single property value change.
  // },
  palette: {
      primary: deepPurple,
      secondary: yellow,
  },
  // typography: { useNextVariants: true },
});
// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));
function Topbar(props) {
  // const classes = useStyles();
  function getValue() {
    var val_key = props.history.location.pathname.substr(1);
    const valDict = {
      'home':0,
      'enrollments':1,
      'sessions':2,
    };
    return valDict[val_key];
  }
  function handleChange(event, value) {
    const routeDict = {
      0: 'home',
      1: 'enrollments',
      2: 'sessions'
    };
    props.history.push("/" + routeDict[value]);
  };
  return (
    <NoSsr>
      <div className={{flexGrow:1, backgroundColor: theme.palette.background.paper}}>
      <AppBar >
      <Tabs onChange={handleChange} variant="fullWidth" textColor="secondary" indicatorColor="secondary" value={getValue()}>
        <Tab component="a" style={{ textDecoration: 'none' }}onClick={event => event.preventDefault()}label="Overview"/>
        <Tab style={{ textDecoration: 'none',color:'none' }}component="a" label="Enrollments"/>
        <Tab style={{ textDecoration: 'none' }}component="a" label="Sessions" />

      </Tabs>

      </AppBar> 
      </div>
    </NoSsr>
  );
}
// class Topbar extends Component {
  // state = { activeItem: 'home' }
  // constructor(props) {
  //   super(props);
  //   this.handleItemClick = this.handleItemClick.bind(this);
  // }
  // handleItemClick = (e, { name }) => {
  //   this.setState({ activeItem: name })
  // }
//   handleChange = (event, value) => {
//     const routeDict = {
//       0: 'home',
//       1: 'enrollments',
//       2: 'sessions'
//     }
//     this.setState({ value });
//     this.props.history.push("/" + routeDict[value]);
//   };
//   render() {
//     return (
//       <div className={classes.root}>
//       <AppBar >
//       <Tabs onChange={this.handleChange} variant="fullWidth" textColor="secondary" indicatorColor="secondary">
//         <Tab component="a" onClick={event => event.preventDefault()}label="Overview"/>
//         <Tab component="a" label="Enrollments"/>
//         <Tab component="a" label="Sessions" />

//       </Tabs>

//       </AppBar> 
//       </div>

//     );
//   }
// }
export default withRouter((Topbar));
import React, { useState, useEffect } from 'react';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import NoSsr from '@material-ui/core/NoSsr';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    withRouter,
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import deepPurple from '@material-ui/core/colors/purple';
import amber from '@material-ui/core/colors/amber';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

function m() {
    var res = {};
    for (var i = 0; i < arguments.length; ++i) {
        if (arguments[i]) {
            Object.assign(res, arguments[i]);
        }
    }
    return res;
}
const theme = createMuiTheme(
    // same theme, just dark
    // palette: {
    //   type: 'dark', // Switching the dark mode on is a single property value change.
    // },
    {
        palette: {
            primary: deepPurple,
            secondary: amber,
        },
    }
    // typography: { useNextVariants: true },
);
// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
    tabsIndicator: {
        backgroundColor: '#1890ff',
    },
    tabRoot: {
        '&:hover': {
            color: '#1890ff', //theme.palette.secondary,
            opacity: 1,
        },
        // '&$tabSelected': {
        //   color: '#1890ff',
        //   fontWeight: theme.typography.fontWeightMedium,
        // },
        // '&:focus': {
        //   color: '#40a9ff',
        // },
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3,
    },
});

function Topbar(props) {
    // const classes = useStyles();
    var state = {
        0: false,
        1: false,
        2: false,
    };

    const nav_links = (
        <List>
            {props.routes.map((route, i) => {
                if (route.base === '/admin') {
                    return (
                        <NavLink to={route.base + route.path} key={i}>
                            <ListItem button>
                                <ListItemText primary={route.name} />
                            </ListItem>
                        </NavLink>
                    );
                }
            })}
        </List>
    );

    const [hovering] = useState(false);
    const styles = {
        hover: {
            backgroundColor: theme.palette.secondary.dark,
        },
    };
    function getValue() {
        var val_key = props.history.location.pathname.substr(1);
        const valDict = {
            home: 0,
            enrollments: 1,
            sessions: 2,
        };
        return valDict[val_key];
    }
    function handleChange(event, value) {
        const routeDict = {
            0: 'home',
            1: 'enrollments',
            2: 'sessions',
        };
        props.history.push('/' + routeDict[value]);
    }
    function onMouseEnter(event, value) {
        state[value] = true;
    }
    function onMouseLeave(event, value) {
        state[value] = true;
    }
    const classes = props;
    return (
        <div>{nav_links}</div>
        // <NoSsr>
        //   {/* <div className={{flexGrow:1, backgroundColor: theme.palette.secondary.dark}}> */}
        //    <div >
        //   <AppBar >
        //   <Tabs onChange={handleChange} variant="fullWidth" value={getValue()}>
        //     <Tab onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} component="div"label="Overview"
        //     classes={{root: classes.tabRoot, indicator: classes.tabIndicator}} textColor="primary"
        //     />
        //     <Tab style={{ textDecoration: 'none',color:'none' }}component="div" label="Enrollments"/>
        //     <Tab style={{ textDecoration: 'none', hover: theme.palette.secondary.light}}component="a" label="Sessions" />

        //   </Tabs>

        //   </AppBar>
        //   </div>
        // </NoSsr>
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
export default withRouter(withStyles(styles)(Topbar));

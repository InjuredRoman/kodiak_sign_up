import React, { useState, useEffect, Fragment } from 'react';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import NoSsr from '@material-ui/core/NoSsr';
import {
    BrowserRouter as Router,
    NavLink,
    withRouter,
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import ClassOutlinedIcon from '@material-ui/icons/ClassOutlined';
function m() {
    var res = {};
    for (var i = 0; i < arguments.length; ++i) {
        if (arguments[i]) {
            Object.assign(res, arguments[i]);
        }
    }
    return res;
}
const styles = theme => ({
    root: {
        // flexGrow: 1,
        // backgroundColor: theme.palette.background.paper,
        width: 500,
        marginTop: '10px',
    },
    // tabsRoot: {
    //     borderBottom: '1px solid #e8e8e8',
    // },
    // tabsIndicator: {
    //     backgroundColor: '#1890ff',
    // },
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
    tabItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    tabSelected: {},
    primary: {},
    typography: {
        padding: theme.spacing.unit * 3,
    },
});

function Topbar(props) {
    const {classes} = props;
    const [value, setValue] = useState('dashboard');

    function handleChange(event, newValue) {
        const newDest = "/admin/" + newValue;
        props.history.push(newDest);
        setValue(newValue);
    }
    // const nav_links = (
    //     <Paper square>
    //     <MenuList>
    //         {props.routes.map((route, i) => {
    //             if (route.base === '/admin') {
    //                 return (
    //                     <NavLink style={{ textDecoration: 'none' }} to={route.base + route.path} key={i}>
    //                         <MenuItem className={classes.tabItem} >
    //                             <ListItemText classes={{ primary: classes.primary }}primary={route.name} />
    //                         </MenuItem>
    //                     </NavLink>
    //                 );
    //             }
    //         })}
    //     </MenuList>
    //     </Paper>
    // );
    const icons = {
        "Dashboard": <DashboardOutlinedIcon />,
        "Enrollments": <AssignmentIndOutlinedIcon />,
        "Sessions": <ClassOutlinedIcon />,
    };
    const bottomNavLinks = (
        <Paper>
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            {props.routes.map((route, i) => {
                if (route.base === '/admin') {
                    return (
                            <BottomNavigationAction 
                                className={classes.tabItem}
                                key={i}
                                label={route.name} 
                                value={route.name.toLowerCase()} 
                                icon={icons[route.name]} 
                            />
                    );
                }
            })}
        </BottomNavigation>

        </Paper>
    );

    function getValue() {
        var val_key = props.history.location.pathname.substr(1);
        const valDict = {
            home: 0,
            enrollments: 1,
            sessions: 2,
        };
        return valDict[val_key];
    }
    function onMouseEnter(event, value) {
        state[value] = true;
    }
    function onMouseLeave(event, value) {
        state[value] = true;
    }
    return (
        <div className={classes.root}>
        {bottomNavLinks}
        </div>
    );
}
export default withStyles(styles)(Topbar);

import React, { Fragment } from 'react';
import { login } from '../../middleend/fetchers';
import UserProfile from './UserProfile';
import CubeGridSpinner from 'components/utils/Spinners';
import Avatar from '@material-ui/core/Avatar';
// import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import AutoForm from 'uniforms-material/AutoForm';
import TextField from 'uniforms-material/TextField';
import SubmitField from 'uniforms-material/SubmitField';
import ErrorsField from 'uniforms-material/ErrorsField';
// import { AutoForm } from 'uniforms-material';
import { LoginSchema } from 'assets/schema/LoginSchema';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

// import {
//     AutoForm, TextField, LongTextField, RadioField, SubmitField, ErrorsField
// } from 'uniforms-material';
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        backgroundColor: theme.palette.secondary.main,
        marginTop: theme.spacing.unit * 3,
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            user_info: [],
            username: '',
            password: '',
        };
        this.onClick = this.onClick.bind(this);
        this.getResponse = this.getResponse.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onClick() {
        const { username, password } = this.state;
        this.getResponse({ username: username, password: password });
    }

    storeInfo(user_info) {
        // var user_info = this.state.user_info;
        UserProfile.storeUserInformation(user_info);
    }

    getResponse(form_info) {
        var self = this;
        login(form_info).then(val => {
            self.setState({ sent: true }, self.storeInfo(val));
        });
        // var res = login(form_info);
        // self.setState({user_info: res})
    }
    handleChange(event) {
        const { value, name } = event.target;
        this.setState({ [name]: value }, () => {
            console.log(this.state);
        });
    }

    render() {
        const { classes } = this.props;
        const loginForm = (
            <Fragment>
                <Avatar className={classes.avatar}>
                    <AccountCircleOutlinedIcon />
                </Avatar>
                <AutoForm
                    schema={LoginSchema}
                    onSubmit={data => this.getResponse(data)}
                >
                    {/* <form onSubmit={this.getResponse}> */}
                    <TextField
                        name="username"
                        // label="Email"
                        type="email"
                        variant="outlined"
                        // value={this.state.name}
                        // onChange={this.handleChange}
                        // required
                    />
                    <TextField
                        // required
                        name="password"
                        // label="Password"
                        type="password"
                        // value={this.state.password}
                        // onChange={this.handleChange}
                        // autoComplete="current-password"
                        // margin="normal"
                        variant="outlined"
                    />
                    <SubmitField
                        fullWidth
                        value="login"
                        className={classes.submit}
                    />
                    <ErrorsField />
                </AutoForm>
            </Fragment>
        );
        const spinner = <CubeGridSpinner foreground="pink"/>;
        return (
            <div className={classes.main}>
                <Paper className={classes.paper}>
                    {this.state.sent ? (
                        sessionStorage.getItem('status') === 'authorized' ? (
                            <Redirect to="/admin/dashboard" />
                        ) : (
                            spinner
                        )
                    ) : (
                        loginForm
                    )}
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Login);

import React, { Fragment } from 'react';
import { registration } from 'middleend/fetchers';
import UserProfile from 'components/Admin/UserProfile';
import CubeGridSpinner from 'components/utils/Spinners';
import Avatar from '@material-ui/core/Avatar';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import AutoForm from 'uniforms-material/AutoForm';
import TextField from 'uniforms-material/TextField';
import SubmitField from 'uniforms-material/SubmitField';
import ErrorsField from 'uniforms-material/ErrorsField';
// import { AutoForm } from 'uniforms-material';
import { RegistrationSchema } from 'assets/schema/RegistrationSchema';
import {withSnackbar} from 'notistack';

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

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            received: false,
        };
        this.onClick = this.onClick.bind(this);
        this.getResponse = this.getResponse.bind(this);
        this.successSnackbar = this.successSnackbar.bind(this);
        this.failSnackbar = this.failSnackbar.bind(this);
    }

    onClick() {
        const { username, password } = this.state;
        this.getResponse({ username: username, password: password });
    }

    storeInfo(user_info) {
        // var user_info = this.state.user_info;
        UserProfile.storeUserInformation(user_info);
    }

    successSnackbar() {
        this.props.enqueueSnackbar(
                'Successfully created account!',
                { variant: 'success' }
        );
    }

    failSnackbar(err) {
        console.log(err);
        this.props.enqueueSnackbar(
                'Sorry, it seems that email is already in the system.',
                // err,
                { variant: 'error' }
        );
    }

    getResponse(form_info) {
        var self = this;
        self.setState({sent: true});
        // wait(2000);
        registration(form_info,
            (response) => self.setState({registered: true}, this.successSnackbar()),
            (err) => self.setState({sent: false},this.failSnackbar(err))
        );
        // var res = login(form_info);
        // self.setState({user_info: res})
    }

    render() {
        const { classes } = this.props;
        const registrationForm = (
            <Fragment>
                <Avatar className={classes.avatar}>
                    <AccountCircleOutlinedIcon />
                </Avatar>
                <AutoForm
                    schema={RegistrationSchema}
                    onSubmit={data => this.getResponse(data)}
                >
                    {/* <form onSubmit={this.getResponse}> */}
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        // variant="outlined"
                    />
                    <TextField
                        // required
                        name="password"
                        type="password"
                        // variant="outlined"
                    />
                    <TextField
                        // required
                        name="password2"
                        type="password"
                        // variant="outlined"
                    />
                    <SubmitField
                        fullWidth
                        label="Create Account"
                        className={classes.submit}
                    />
                    <ErrorsField />
                </AutoForm>
            </Fragment>
        );
        const spinner = <CubeGridSpinner foreground="#f50057" background="white"/>;
        const content = 
                    this.state.sent ? (
                        this.state.registered ? (
                            <Redirect to="/login" />
                        ) : (
                            spinner
                        )
                    ) : (
                        registrationForm
                    );
        return (
            <div className={classes.main}>
                <Paper className={classes.paper}>
                    {content}
                </Paper>
                <p>Back to login page <a href="#/login">here</a></p>
            </div>
        );
    }
}

const SnackRegistration = withStyles(styles)(withSnackbar(Registration));
export default SnackRegistration;

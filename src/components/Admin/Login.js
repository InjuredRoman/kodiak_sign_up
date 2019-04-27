import React, { Fragment } from 'react';
import { login } from '../../middleend/fetchers';
import UserProfile from './UserProfile';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { Redirect } from 'react-router-dom';
// import { AutoForm } from 'uniforms-material';
import AutoForm from 'uniforms-material/AutoForm';
import { LoginSchema } from 'assets/schema/LoginSchema';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_info: [],
            username: '',
            password: '',
            redirect: false,
        };
        this.onClick = this.onClick.bind(this);
        this.getResponse = this.getResponse.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onClick() {
        const { username, password } = this.state;
        this.getResponse({ username: username, password: password });
    }

    storeInfo() {
        var user_info = this.state.user_info;
        UserProfile.storeUserInformation(user_info);
    }

    getResponse(form_info) {
        var self = this;
        login(form_info).then(val => {
            self.setState({ user_info: val }, self.storeInfo);
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
        return (
            // <AutoForm
            //     schema={LoginSchema}
            //     onSubmit={data => console.log(data)}
            // />
            <Fragment>

            { sessionStorage.getItem("status")==="authorized" ?
            <Redirect to="/admin" /> :
            <Grid justify="center"
                    container
                    spacing={24}
                    direction="column"
                    alignItems="center"
                    style={{ minHeight: '100vh' }}
            >
            <Grid item >
                <FormControl>
                {/* <form onSubmit={this.getResponse}> */}
                    <TextField
                        name="username"
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                    />
                    <TextField
                        required
                        name="password"
                        label="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    />
                    <Button onClick={this.onClick} component="button" variant="contained" type="submit" coltar="primary">
                        Login
                    </Button>

                </FormControl>

            </Grid>
            </Grid>}
            </Fragment>
        );
    }
}

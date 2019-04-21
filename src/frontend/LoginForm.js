import React from 'react';
import {Form, Input} from 'formsy-react-components';
import {login} from '../middleend/fetchers';
import UserProfile from './UserProfile';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_info : []
        };
        this.getResponse = this.getResponse.bind(this);
    };

    storeInfo() {
        var user_info = this.state.user_info;
        UserProfile.storeUserInformation(user_info);
    }

    getResponse(form_info) {
        var self=this;
        login(form_info).then(val => {
            self.setState({user_info : val}, self.storeInfo);
        });
        // var res = login(form_info);
        // self.setState({user_info: res})
    };

    render() {
        return (
            <Form onSubmit={this.getResponse}>
                <Input
                    name="username"
                    placeholder="email"
                    validations="isEmail"
                    validationErrors={{
                        isEmail: 'This doesn’t look like a valid email address.',
                    }}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="password"
                    required
                />
                <button type="submit" className="button is-info">
                Create
                </button>
            </Form>
        )
    };
};
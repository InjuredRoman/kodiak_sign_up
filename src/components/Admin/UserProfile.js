import React from 'react';

export default class UserProfile extends React.Component {
    static state = {
        fields: ['status', 'username'],
        userInfo: {
            status: '',
            username: '',
            // first_name: "",
            // last_name: "",
        },
    };

    static storeUserInformation(user_information) {
        var i;
        var field;
        console.log(user_information);
        for (i = 0; i < this.state.fields.length; i++) {
            field = this.state.fields[i];
            sessionStorage.setItem(field, user_information[field]);
        }
        console.log('Session Storage:\n');
        console.log(sessionStorage.status);
    }

    static getUserInformation() {
        var userInformation = this.state.userInfo;
        var i;
        var field;
        for (i = 0; i < this.state.fields.length; i++) {
            field = this.state.fields[i];
            userInformation[field] = sessionStorage.getItem(field);
        }
        return userInformation;
    }
}

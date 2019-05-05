import React from 'react';

export default class UserProfile extends React.Component {
    static state = {
        fields: ['status', 'username'],
        userInfo: {
            status: '',
            username: '',
            token: '',
            first_name: "",
            last_name: "",
        },
    };

    /* user_info ex
    {
    "status": "authorized",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InJvbWFuLmEua2F1Zm1hbkBnbWFpbC5jb20iLCJleHAiOjE1NTcwNzI3MzYsImVtYWlsIjoicm9tYW4uYS5rYXVmbWFuQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNTU3MDY5MTM2fQ.EWTjcduQHbZM9lV6ZUm22BSGf_nfPkperjrjBPI7xss",
    "user": {
        "email": "roman.a.kaufman@gmail.com"
    }
    }
    */

    static storeUserInformation(user_info) {
        // var i;
        // var field;
        // console.log(user_information);
        sessionStorage.setItem("token", user_info.token)
        sessionStorage.setItem("status", user_info.status)
        sessionStorage.setItem("user_email", user_info.user.email)
        // for (i = 0; i < this.state.fields.length; i++) {
        //     field = this.state.fields[i];
        //     sessionStorage.setItem(field, user_information[field]);
        // }
        // console.log('Session Storage:\n');
        // console.log(sessionStorage.status);
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

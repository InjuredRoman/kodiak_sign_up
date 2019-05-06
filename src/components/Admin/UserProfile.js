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
    static getToken() {
        return sessionStorage.getItem("token");
    }

    static getStatus() {
        return sessionStorage.getItem("status");
    }

    static setToken(token){
        sessionStorage.setItem("token", token);
    }

    static setStatus(status){
        sessionStorage.setItem("status", status);
    }

    static storeUserInformation(user_info) {
        // var i;
        // var field;
        // console.log(user_information);
        this.setToken(user_info.token);
        this.setStatus(user_info.status);
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

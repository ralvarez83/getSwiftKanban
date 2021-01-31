import React from 'react';

export default interface IUser{
    userData: {
        dateTime: Date,
        firstName: string,
        lastName: string,
        loginId: string,
        emailId: string,
        personId: number
    },
    authDetails: {
        AuthorizationToken: string
    }
}
import React from "react";

export default interface IAuthenticationResponse {
    Response: {
        details: {
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
        },
        messageView: {
            type: string,
            message: [string],
            uriMap: {
                selfUri: string
            }
        }
    }
}
import React from 'react';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Login from './login';
import IUser from '../../interfaces/i-user';


const urlLogin : string = "/auth";

const server = setupServer(
    rest.post(urlLogin, (req, res, ctx) => {
        return res(ctx.json({
            "Response": {
                "details": {
                    "userData": {
                        "dateTime": "dd-MMM-yyyy",
                        "firstName": "Desarrollador",
                        "lastName": "01",
                        "loginId": "Kanal13",
                        "emailId": "kanbanal13@outlook.com",
                        "personId": 1484683
                    },
                    "authDetails": {
                        "AuthorizationToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJzb25JZCI6MTQ4NDY4MywiYXBwQWNjb3VudElkIjoxNjE0OTgxfQ.s7hi_Iwxlbs_Wa12DTTY7ZAwvx2jCiGoJZzB1I0oNNQ"
                    }
                },
                "messageView": {
                    "type": "success",
                    "message": [
                        "Authentication Successful!"
                    ],
                    "uriMap": {
                        "selfUri": "https://login.swiftkanban.com/restapi/secured/auth"
                    }
                }
            }
        }))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders learn react link', () => {
    const onLogin = (user: IUser) => {
        expect(user.userData.loginId).toEqual("Kanal13");
    };

    render(<Login onLogin={onLogin} urlLogin={urlLogin} />);
    
    
});

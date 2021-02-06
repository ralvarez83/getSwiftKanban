import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Login, {loginSwiftKanban} from './login';
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

test('Login on Component', async () => {
    const onLogin = (user: IUser) => {
        expect(user.authDetails.AuthorizationToken).toEqual("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJzb25JZCI6MTQ4NDY4MywiYXBwQWNjb3VudElkIjoxNjE0OTgxfQ.s7hi_Iwxlbs_Wa12DTTY7ZAwvx2jCiGoJZzB1I0oNNQ");
    };

    const { container, getByText, getByTestId } = render(<Login onLogin={onLogin} urlLogin={urlLogin} />);
    await waitFor(() => screen.getByRole('button'))
    
    const elemUserName = getByTestId(/username/i);
    elemUserName.value = "Kanal13";
    fireEvent.change(elemUserName);

    const elemPassword = getByTestId(/password/i);
    elemPassword.value = "AlumnoKSD";
    fireEvent.change(elemPassword);

    fireEvent.click(getByText('Entrar'))    
    
});

test('Login on Switf Kanban correct', () =>{
    const userLogin : string = "Kanal13";
    const password : string = "AlumnoKSD";
    loginSwiftKanban(urlLogin, userLogin,password)
    .then((user: IUser) => {
        expect(user.authDetails.AuthorizationToken).toEqual("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJzb25JZCI6MTQ4NDY4MywiYXBwQWNjb3VudElkIjoxNjE0OTgxfQ.s7hi_Iwxlbs_Wa12DTTY7ZAwvx2jCiGoJZzB1I0oNNQ");
    })
    .catch(() => {
        expect(1).toEqual(0);
    })
})

test('Login on Switf Kanban user/pass incorrect', () =>{
    const userLogin : string = "Kanal13";
    const password : string = "ddd";
    loginSwiftKanban(urlLogin, userLogin,password)
    .then((user: IUser) => {
        expect(1).toBe(0);
    })
    .catch((err) => {
        expect(err).toBe(null);
    })
})

test('Login on Switf Kanban server error', () =>{
    const userLogin : string = "Kanal13";
    const password : string = "ddd";
    server.use(
        rest.get('/auth', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    );

    loginSwiftKanban(urlLogin, userLogin,password)
    .then((user: IUser) => {
        expect(1).toBe(0);
    })
    .catch((err) => {
        expect(err).not.toBe(null);
    })
})
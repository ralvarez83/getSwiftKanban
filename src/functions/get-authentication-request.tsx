import IAuthenticationRequest from '../interfaces/i-authentication-request'

export default function getAuthenticationRequest (user: string |undefined, pass: string | undefined): IAuthenticationRequest{
        var base64 = require("base-64");
        
        return ({
            AuthenticationToken : `SwiftKanban ${base64.encode(`${user}:${pass}`)}`
        }) 
}
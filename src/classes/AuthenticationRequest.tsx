import IAuthenticationRequest from '../Interfaces/IAuthenticationRequest'

export default class AuthenticationRequest implements IAuthenticationRequest{
    
    AuthenticationToken: string

    constructor (user: string | undefined, pass: string | undefined){
        var base64 = require("base-64");
        
        this.AuthenticationToken = `SwiftKanban ${base64.encode(`${user}:${pass}`)}`;
        
    }

}
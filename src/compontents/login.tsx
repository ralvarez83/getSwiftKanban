import React, { Component, MouseEvent } from 'react';
import {Container, Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import AuthenticationRequest from '../classes/AuthenticationRequest';
import IUser from "../Interfaces/IUser";

interface LoginProps {
  onLogin : (user: IUser) => void;
  urlLogin: string
}

export default class Login extends Component<LoginProps>{

  private userRef = React.createRef<HTMLInputElement>();
  private passRef = React.createRef<HTMLInputElement>();

  constructor(props: LoginProps){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  
  handleLogin = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.props.urlLogin !== null && this.props.urlLogin !== ""){
      const url = this.props.urlLogin + "secured/auth";

      const user : String = new String(this.userRef.current?.value);
      const pass : String = new String(this.passRef.current?.value);


      var authenticationRequest : AuthenticationRequest = new AuthenticationRequest(user,pass);

      console.log(JSON.stringify(authenticationRequest));
      // const axiosInstance = axios.create({
      //   headers: {
      //     "Access-Control-Allow-Origin": "*"
      //   }
      // });
      // axiosInstance
      //   .post(url,authenticationRequest)
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(e => console.log(e));

      
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(authenticationRequest)
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(console.log)
    }

    // this.props.onLogin({
    //   user: "Usuario",
    //   token: "Token acceso"
    // })

  }

  render() {
    
    return (
        <Container fluid>
            <Row fluid>
              <Col className="col-sm-12 col-md-6 offset-md-3">
                <Form onSubmit={this.handleLogin} className="login-layout">
                  <FormGroup>
                    <Label for="user">User</Label>
                    <Input 
                      required
                      type="text" 
                      name="user" 
                      id="user" 
                      innerRef={this.userRef}
                      placeholder="User" 
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input 
                      required
                      type="password" 
                      name="password" 
                      id="password" 
                      placeholder="password"  
                      innerRef={this.passRef}
                    />
                  </FormGroup>
                  <Button>Submit</Button>
                </Form>
              </Col>
            </Row>
        </Container>
    );
  }
}

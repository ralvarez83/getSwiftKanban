import React, { Component, MouseEvent } from 'react';
import {Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap'
import AuthenticationRequest from '../classes/AuthenticationRequest';
import IAuthenticationResponse from '../Interfaces/IAuthenticationResponse';
import IUser from "../Interfaces/IUser";
import IAlert from "../Interfaces/IAlert";

interface LoginProps {
  onLogin : (user: IUser) => void;
  urlLogin: string
}

interface IState {
  alert: IAlert
}

export default class Login extends Component<LoginProps, IState>{

  private userRef = React.createRef<HTMLInputElement>();
  private passRef = React.createRef<HTMLInputElement>();

  constructor(props: LoginProps, ){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = { 
      alert: {
        isOpen: false,
        message: "Login incorrecto",
        color: "danger"
      }
    };
  }
  
  handleLogin = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.props.urlLogin !== null && this.props.urlLogin !== ""){
      const url = this.props.urlLogin + "secured/auth";

      const user : String = new String(this.userRef.current?.value);
      const pass : String = new String(this.passRef.current?.value);


      var authenticationRequest : AuthenticationRequest = new AuthenticationRequest(user,pass);

      console.log(JSON.stringify(authenticationRequest));      
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(authenticationRequest)
      })
      .then(res => res.json())
      .then((data) => {
        var respuesta : IAuthenticationResponse = data;
        if (respuesta.Response.messageView.type === "success") {
          console.log("login CORRECTO");
          const user : IUser = { ...respuesta.Response.details};
          this.props.onLogin(user);
        }
        else{
          const alert = {... this.state.alert};
          alert.isOpen = true;
          this.setState({
            alert: alert
          });
        }
      })
      .catch(console.log)
    }
  }

  render() {

    console.log(this.state);

    return (
        <Container fluid>
          <Container className="themed-container">
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
          <Container className="themed-container">
            <Row xs="3">
              <Col className="col-sm-12 col-md-6 offset-md-3">
                <Alert color={this.state.alert.color} isOpen={this.state.alert.isOpen} >
                  {this.state.alert.message}
                </Alert>
              </Col>
            </Row>
          </Container>
        </Container>
    );
  }
}

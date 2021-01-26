import React, { Component, MouseEvent } from 'react';
import {Container, Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import IUser from "../Interfaces/IUser";

interface LoginProps {
  onLogin : (user: IUser) => void;
}

export default class Login extends Component<LoginProps>{

  userRef = React.createRef();
  passRef = React.createRef();

  constructor(props: LoginProps){
    super(props);
    this.userRef = React.createRef();
    this.passRef = React.createRef();
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    this.props.onLogin({
      user: "Usuario",
      token: "Token acceso"
    })

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
                      type="text" 
                      name="user" 
                      id="user" 
                      ref={this.userRef}
                      placeholder="User" 
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="password" />
                  </FormGroup>
                  <Button>Submit</Button>
                </Form>
              </Col>
            </Row>
        </Container>
    );
  }
}

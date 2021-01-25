import React, { Component, MouseEvent } from 'react';
import {Container, Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import User from "../interfaces/user";

export default class Login extends Component<{ onLogin: (User) }>{

  onLogin = (event: MouseEvent<HTMLButtonElement>) => {

  }

  render() {
    
    return (
        <Container fluid>
            <Row fluid>
              <Col>
                <Form onSubmit={this.onLogin}>
                  <FormGroup>
                    <Label for="user">User</Label>
                    <Input type="text" name="user" id="user" placeholder="User" />
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

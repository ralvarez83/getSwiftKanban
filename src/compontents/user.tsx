import React, { Component } from 'react';
import { Card,  CardBody, CardText, CardTitle, CardSubtitle } from 'reactstrap';
import IUser from "../Interfaces/IUser";

interface IProps {
  user: IUser
}

export default class User extends Component<IProps>{


  render() {
      return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">Datos del usuario</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Usuario</CardSubtitle>
                <CardText>{this.props.user.userData.loginId}</CardText>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Rol</CardSubtitle>
                <CardText>{this.props.user.userData.firstName}</CardText>
            </CardBody>
        </Card>
      );
  }

}
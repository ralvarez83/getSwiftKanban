import React, { Component } from 'react';
import { Card,  CardBody, CardText, CardTitle, CardSubtitle, Button } from 'reactstrap';
import IBoard from '../Interfaces/IBoard';

interface IProps {
  board: IBoard
}

export default class Board extends Component<IProps>{


  render() {

    return (
    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
        <CardBody>
            <CardTitle tag="h5">{this.props.board.projectName}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">Estado</CardSubtitle>
            <CardText>{this.props.board.currentState}</CardText>
            <CardSubtitle tag="h6" className="mb-2 text-muted">Última Modificación</CardSubtitle>
            <CardText>{this.props.board.modifiedDate}</CardText>
            <Button>Button</Button>
        </CardBody>
    </Card>
    );
  }

}
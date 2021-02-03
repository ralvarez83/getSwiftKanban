import React, { Component, MouseEvent } from 'react';
import IUser from "../Interfaces/IUser";
import User from "./user";
import {URLS, HTTP_METHODS} from "../constants";
import IGetKanbanGame from '../Interfaces/IGetKanbanGame';
import IGetBoardsResponse from '../Interfaces/IGetBoardsResponse';
import IBoard from '../Interfaces/IBoard';
import BoardList from './boardlist';

interface IProps {
  user: IUser;
  urlBase: string;
  game: IGetKanbanGame | null
  onUpateGame : (game: IGetKanbanGame) => void;
}

interface IState {
    boards : IBoard[]
  }

export default class GetKanban extends Component<IProps, IState>{


//     constructor(props: IProps, ){
//         super(props);

//         this.state = { 
//             alert: {
//                 isOpen: false,
//                 message: "Error al cargar datos desde el servidor",
//                 color: "danger"
//             },
//             boards:[]
//         };
//         if (this.props.game === null){
//             this.getBoards();
//         }
//     }

//     getBoards(){
//         var url = this.props.urlBase + URLS.BOARD;
        
//         fetch(url, {
//             method: HTTP_METHODS.GET,
//             headers: {
//                 "AuthorizationToken": this.props.user.authDetails.AuthorizationToken
//             }
//           })
//           .then(res => res.json())
//           .then((data) => {
//             var respuesta : IGetBoardsResponse = data;
//             this.setState({ boards : respuesta.Response.details.board});
//           })
//           .catch(() => {
//             const alert = {...this.state.alert};
//             alert.isOpen = true;
//             this.setState({
//               alert: alert
//             });
//           });
//     }

//     render() {

//       return (
//           <Container>

//                 <Container className="themed-container" fluid="true">
//                     <Row xs="3" fluid="true">
//                     <Col className="col-sm-12 col-md-6 offset-md-3" fluid="true">
//                         <Alert color={this.state.alert.color} isOpen={this.state.alert.isOpen} >
//                         {this.state.alert.message}
//                         </Alert>
//                     </Col>
//                     </Row>
//                 </Container>
//                 <Row>
//                 <Col>
//                     <User user={this.props.user}/>
//                 </Col>
//                 <Col>
//                     <Card>
//                     <CardBody>
//                         <CardTitle tag="h5">Datos del juego</CardTitle>
//                         <CardSubtitle tag="h6" className="mb-2 text-muted">Usuario</CardSubtitle>
//                         <CardText>{this.props.user.userData.personId}</CardText>
//                         <CardSubtitle tag="h6" className="mb-2 text-muted">Rol</CardSubtitle>
//                         <CardText>{this.props.user.userData.firstName}</CardText>
//                     </CardBody>
//                     </Card>
//                 </Col>
//                 <Col>

//                 </Col>
//                 <Col>
//                 </Col>
//                 </Row>
//                 <Row>
//                     {(this.props.game === null) && <BoardList boards={this.state.boards}></BoardList>}
//                 </Row>
//           </Container>
//       );
//   }

}
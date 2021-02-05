import React from 'react';
import IUser from "../../interfaces/i-user";
import User from "../user/user";
import {URLS, HTTP_METHODS} from "../../constants";
import IGetKanbanGame from '../../interfaces/i-get-kanban-game';
import IGetBoardsResponse from '../../interfaces/i-get-boards-response';
import IBoard from '../../interfaces/i-board';
import BoardList from '../board-list/board-list';
import { createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

interface IProps {
  user: IUser;
  urlBase: string;
  game: IGetKanbanGame | null
  onUpateGame : (game: IGetKanbanGame) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function GetKanban (props: IProps){
  const classes = useStyles();
  const [boards, setBoards] = React.useState<IBoard[]>([]);
  const [alertGetDataBoard, setAlertGetDataBoard] = React.useState(false);

  const getBoards = () => {
        var url = props.urlBase + URLS.BOARD;
        
        fetch(url, {
            method: HTTP_METHODS.GET,
            headers: {
                "AuthorizationToken": props.user.authDetails.AuthorizationToken
            }
          })
          .then(res => res.json())
          .then((data) => {
            var respuesta : IGetBoardsResponse = data;
            setBoards(respuesta.Response.details.board);
          })
          .catch(() => {
            setAlertGetDataBoard(true);
          });
    }

    const showAlertDataBoard = () => {
      if (alertGetDataBoard){
        return (
          <Alert severity="error">
            Se ha producido un error al recuperar los datos de los tableros
          </Alert>
        );
      }
    }

    if(props.game === null && boards.length === 0){
      getBoards();
    }    

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
              <User user={props.user}/>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {(props.game === null) && <BoardList boards={boards}></BoardList>}
            {showAlertDataBoard()}
          </Grid>
        </Grid>
      </div>
       
       
      //  <Grid>
          
      //         <Row>
      //         <Col>
      //             <User user={props.user}/>
      //         </Col>
      //         <Col>
      //             <Card>
      //             <CardBody>
      //                 <CardTitle tag="h5">Datos del juego</CardTitle>
      //                 <CardSubtitle tag="h6" className="mb-2 text-muted">Usuario</CardSubtitle>
      //                 <CardText>{this.props.user.userData.personId}</CardText>
      //                 <CardSubtitle tag="h6" className="mb-2 text-muted">Rol</CardSubtitle>
      //                 <CardText>{this.props.user.userData.firstName}</CardText>
      //             </CardBody>
      //             </Card>
      //         </Col>
      //         <Col>

      //         </Col>
      //         <Col>
      //         </Col>
      //         </Row>
      //         <Row>
      //             {(props.game === null) && <BoardList boards={boards}></BoardList>}
      //         </Row>
      //         <div className={classes.margin}>
      //           {showError()}
      //         </div>
      //   </Grid>
    );

}
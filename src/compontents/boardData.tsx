import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IBoard from '../Interfaces/IBoard';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

interface IProps {
  board: IBoard
}

export default function BoardData (props:IProps){

  const classes = useStyles();
 
  return (
    <Card>
      <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/images/cards/KanbanBoard.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.board.projectName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Tablero con el ID {props.board.boardId} con ultima modificación realizada el {props.board.modifiedDate} del proyecto {props.board.projectName}
          </Typography>
        </CardContent>
    </Card>
  );

}
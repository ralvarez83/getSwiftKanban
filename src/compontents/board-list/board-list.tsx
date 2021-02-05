import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import IBoard from '../../interfaces/i-board';
import BoardData from '../board-data/board-data';

interface IProps {
  boards: IBoard[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    Grid: {
      width: 500,
      height: 450,
    },
  }),
);

export default function BoardList (props: IProps){
  const classes = useStyles();

  console.log(props.boards);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {props.boards.map((board) => (
          <Grid item xs={3}>
            <BoardData key={board.boardId} board={board}></BoardData>
          </Grid>
        ))}
      </Grid>
    </div>
  );

//     render(){
//         console.log(this.props.boards);
//         return( 
//             <CardColumns>   
//                 {this.props.boards.map((board) => {
//                     return (
//                         <Board key={board.boardId} board={board}></Board>
//                     )
//                 })}
//             </CardColumns>
//         );
//     }
}
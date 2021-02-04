import React from 'react';
import Login from "./compontents/login";
import IUser from "./Interfaces/IUser";
import GetKanban from "./compontents/getkanban";
import config from './config.json';
import IGetKanbanGame from './Interfaces/IGetKanbanGame';
import { createStyles, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

interface IProps {
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 300,
      },
    },
    paper: {
      padding: theme.spacing(5)
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);


export default function App (props: IProps) {

  const classes = useStyles();
  const [user, setUser] = React.useState<IUser | null>(null);
  const [game, setGame] = React.useState<IGetKanbanGame | null>(null);

  const handleLogin = (user: IUser) =>{
    console.log(user);
    setUser(user);
  }

  const handleUpdateGame = (game: IGetKanbanGame) =>{
    console.log(game);
    setGame(game);
  }

 
  return(
    <Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
    spacing={1}
  >
    { (user === null) && 
    <Paper className={`${classes.root} ${classes.paper}`}>
        <h1>Bienvenido a GetKanban</h1>
        <Login onLogin={handleLogin} urlLogin={config.URL_BASE} />
    </Paper>
    }
    { (user !== null) && 
    <Paper className={`${classes.root} ${classes.paper}`}>
      <h1>Juguemos a GetKanban</h1>
      <GetKanban 
        user={user} 
        urlBase={config.URL_BASE}  
        game={game}
        onUpateGame={handleUpdateGame}
      />
    </Paper>
    }
  </Grid>
  );
}

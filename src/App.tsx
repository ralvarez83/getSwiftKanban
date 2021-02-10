import React from 'react';
import Login from "./compontents/login/login";
import IUser from "./interfaces/i-user";
import GetKanban from "./compontents/getkanban/getkanban";
import config from './config.json';
import IGetKanbanGame from './interfaces/i-get-kanban-game';
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
    imgTitle: {
        verticalAlign: "middle"
    },
    footerPowerBy:{
      textAlign: "center",
      fontSize: "1em",
      '& a': {
        color: "green"
      }
    }
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
    spacing={2}
  >
    <Grid item>
    { (user === null) && 
    <Paper className={`${classes.root} ${classes.paper}`}>
      <h1><img className={classes.imgTitle} src="/images/logo.png" alt="logotipo" /> Bienvenido a GetKanban</h1>
      <Login onLogin={handleLogin} urlLogin={config.URL_BASE} />
    </Paper>
    }
    { (user !== null) && 
    <Paper className={`${classes.root} ${classes.paper}`}>
      <h1><img className={classes.imgTitle} src="/images/logo.png" alt="logotipo" /> Juguemos a GetKanban</h1>
      <GetKanban 
        user={user} 
        urlBase={config.URL_BASE}  
        game={game}
        onUpateGame={handleUpdateGame}
      />
    </Paper>
    }
    </Grid>
    <Grid item className={classes.footerPowerBy} xs={12}>
      Powered by <a href="https://www.estratecno.es" target="_blank" rel="noreferrer">www.estratecno.es</a>
    </Grid>
  </Grid>
  );
}

import React from 'react';
import getAuthenticationRequest from '../../functions/get-authentication-request';
import IAuthenticationResponse from '../../interfaces/i-authentication-response';
import IUser from "../../interfaces/i-user";
import {URLS, HTTP_METHODS} from "../../constants";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '../alert/alert';
import IAuthenticationRequest from '../../interfaces/i-authentication-request';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

type Props = {
  onLogin : (user: IUser) => void;
  urlLogin: string
};

type State = {
  user: string,
  pass: string,
  open: boolean,
  errorLogin: boolean
};

export default function Login(props: Props) {
  const classes = useStyles();
  const [state,setState] = React.useState<State>({
    user: "",
    pass: "",
    open: false,
    errorLogin: false
  });

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, ...{user: event.target.value}});
  };
  const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, ...{pass: event.target.value}});
  };

  const handleLogin = (url: string, user: string, pass: string) => {
    if (!state.open){
      setState({...state, ...{open: true, errorLogin: false}});
    }
    console.log("Entra en formulario");
    if (props.urlLogin !== null && props.urlLogin !== ""){

      var authenticationRequest : IAuthenticationRequest = getAuthenticationRequest(user,pass);

      console.log(JSON.stringify(authenticationRequest));      
      fetch(url, {
        method: HTTP_METHODS.POST,
        body: JSON.stringify(authenticationRequest)
      })
      .then(res => res.json())
      .then((data) => {
        var respuesta : IAuthenticationResponse = data;
        console.log(respuesta);
        if (respuesta.Response.messageView.type === "success") {
          console.log("login CORRECTO");
          const user : IUser = { ...respuesta.Response.details};
          props.onLogin(user);
        }
        else{     
          setState({...state, ...{open: false, errorLogin: true}});
        }
      })
      .catch(console.log)
    }
  }

  const showError = () => {
    if (state.errorLogin){
      return (
        <Alert severity="error">
          Usuario o contraseña incorrectos.
        </Alert>
      );
    }
  }

  return (
    <form action="/" method="POST" autoComplete="off">
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField 
              id="input-with-icon-grid" 
              label="Usuario" 
              value={state.user}
              onChange={handleChangeName}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item>
            <VpnKey />
          </Grid>
          <Grid item>
            <TextField 
              id="input-with-icon-grid"
              label="Password"      
              type="password"       
              value={state.pass}
              autoComplete="current-password"
              onChange={handleChangePass}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="center">
          <Button variant="contained" color="primary" onClick={() => handleLogin(props.urlLogin.concat(URLS.AUTH), state.user, state.pass)}>
            Entrar
          </Button>
        </Grid>
      </div>       

      <Backdrop className={classes.backdrop} open={state.open}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className={classes.margin}>
        {showError()}
      </div>
    </form>
  );
}
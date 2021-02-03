import React, { MouseEvent } from 'react';
import AuthenticationRequest from '../classes/AuthenticationRequest';
import IAuthenticationResponse from '../Interfaces/IAuthenticationResponse';
import IUser from "../Interfaces/IUser";
import {URLS, HTTP_METHODS} from "../constants";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from './alert';
import Paper from '@material-ui/core/Paper';

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


interface IProps {
  onLogin : (user: IUser) => void;
  urlLogin: string
}

export default function Login(props: IProps) {
  const classes = useStyles();
  const [user, setName] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [errorLogin, setErrorLogin] = React.useState(false);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const handleLogin = () => {
    setOpen(true);
    setErrorLogin(false);
    console.log("Entra en formulario");
    if (props.urlLogin !== null && props.urlLogin !== ""){
      const url = props.urlLogin.concat(URLS.AUTH);

      var authenticationRequest : AuthenticationRequest = new AuthenticationRequest(user,pass);

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
          setOpen(false);
          setErrorLogin(true);
        }
      })
      .catch(console.log)
    }
  }

  const showError = () => {
    if (errorLogin){
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
              value={user}
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
              value={pass}
              autoComplete="current-password"
              onChange={handleChangePass}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="center">
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Entrar
          </Button>
        </Grid>
      </div>       

      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className={classes.margin}>
        {showError()}
      </div>
    </form>
  );
}
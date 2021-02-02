import React, { Component, MouseEvent } from 'react';
import AuthenticationRequest from '../classes/AuthenticationRequest';
import IAuthenticationResponse from '../Interfaces/IAuthenticationResponse';
import IUser from "../Interfaces/IUser";
import IAlert from "../Interfaces/IAlert";
import {URLS, HTTP_METHODS} from "../constants";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
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

interface IState {
  alert: IAlert
}

export default class Login extends Component<IProps, IState>{

  private userRef = React.createRef<HTMLInputElement>();
  private passRef = React.createRef<HTMLInputElement>();

  constructor(props: IProps, ){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = { 
      alert: {
        isOpen: false,
        message: "Login incorrecto",
        color: "danger"
      }
    };
  }
  
  handleLogin = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.props.urlLogin !== null && this.props.urlLogin !== ""){
      const url = this.props.urlLogin.concat(URLS.AUTH);

      const user : string | undefined = this.userRef.current?.value;
      const pass : string | undefined = this.passRef.current?.value;


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
          this.props.onLogin(user);
        }
        else{
          const alert = {...this.state.alert};
          alert.isOpen = true;
          this.setState({
            alert: alert
          });
        }
      })
      .catch(console.log)
    }
  }

  render() {
    const classes = useStyles();
    console.log(this.state);

    const handleToggle = () => {
      setOpen(!open);
    };
    
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <form className={classes.root} noValidate autoComplete="off" onSubmit={this.handleLogin}>
          <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField id="input-with-icon-grid" label="Usuario" innerRef={this.userRef} />
              </Grid>
            </Grid>
          </div>
          <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <VpnKey />
              </Grid>
              <Grid item>
                <TextField 
                  id="input-with-icon-grid" 
                  label="Password"             
                  innerRef={this.passRef}
                  autoComplete="current-password" />
              </Grid>
            </Grid>
          </div>

          <Button variant="contained" color="primary" onClick={handleToggle}>
            Entrar
          </Button>
        </form>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              This is a success message!
            </Alert>
          </Snackbar>
          <Alert color={this.state.alert.color} isOpen={this.state.alert.isOpen} >
            {this.state.alert.message}
          </Alert>
      </Grid>
    );
  }
}

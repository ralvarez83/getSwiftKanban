import React from 'react';
import Container from '@material-ui/core/Container';
import Login from "./compontents/login";
import IUser from "./Interfaces/IUser";
import GetKanban from "./compontents/getkanban";
import config from './config.json';
import IGetKanbanGame from './Interfaces/IGetKanbanGame';

interface IState {
  user: IUser | null,
  game: IGetKanbanGame | null
}
interface IProps {
}

class App extends React.Component<IProps, IState>{

  constructor(props: IProps, ){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUpdateGame = this.handleUpdateGame.bind(this);

    this.state = {
      user: null,
      game: null
    };
  }

  handleLogin(user: IUser){
    console.log(user);
    this.setState({
      user: user
    })
  }

  handleUpdateGame(game: IGetKanbanGame){
    console.log(game);
    this.setState({
      game: game
    })
  }

  render() {
    
    if (this.state.user === null){
      return(
        <Container>
          <Login onLogin={this.handleLogin} urlLogin={config.URL_BASE} />
        </Container>
      )
    }
    return (
      <Container>
        <h1>Bienvenido a GetKanban</h1>
        <GetKanban 
          user={this.state.user} 
          urlBase={config.URL_BASE}  
          game={this.state.game}
          onUpateGame={this.handleUpdateGame}
        />
      </Container>
    );
  }
}

export default App;

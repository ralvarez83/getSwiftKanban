import React from 'react';
import Login from "./compontents/login";
import IUser from "./Interfaces/IUser";

interface IState {
  user: IUser | null
}
interface IProps {
}

class App extends React.Component<IProps, IState>{

  constructor(props: IProps, ){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      user: null
    };
  }

  

  handleLogin(user: IUser){
    console.log(user);
    this.setState({
      user: user
    })
  }

  render() {
    
    if (this.state.user === null){
      return(
        <Login onLogin={this.handleLogin} urlLogin="https://getswiftkanban-proxy.herokuapp.com/proxy/" />
      )
    }
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Hola {this.state.user.userData.firstName}.
          </p>
        </header>
      </div>
    );
  }
}

export default App;

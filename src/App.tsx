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

    this.setState({ user: null });
  }

  

  handleLogin(user: IUser){
    console.log(user);
    // this.setState({
    //   user: user
    // })
  }

  render() {
    
    if (this.state === null){
      return(
        <Login onLogin={this.handleLogin} />
      )
    }
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

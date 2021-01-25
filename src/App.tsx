import React, { FC } from 'react';
import Login from "./compontents/login";
import User from "./interfaces/user";

class App extends React.Component{

  state = {
    user: null
  };

  handleLogin(user: User){
    this.setState({
      user: user
    })
  }

  render() {
    
    if (this.state.user === null){
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

import React, { Component } from 'react';
import Board from './components/Board';
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import './App.css';

class App extends Component {

  state = {
      username: "",
      password: "",
      wins: [], 
      auth: false
    };

  getUserData = (username,password,wins) => {
    this.setState({username: username,
                  password: password,
                  wins:wins,
                  auth: true})
  }
  
  render() {

    return (
      <div className="App">
        <div className ="Buttons">
        {this.state.auth ? 
            <button onClick={()=> this.setState({auth: false})}>Log out</button>: <Register />}
        {this.state.auth ? 
            <Profile username = {this.state.username} 
                     password = {this.state.password}
                     wins = {this.state.wins}
            /> : <Login getUserData = {this.getUserData}/>}
        </div>
        <div className="Board">
          <Board username = {this.state.username} wins = {this.state.wins} auth = {this.state.auth}/>
        </div>  
      </div>
    );
  }
}

export default App;

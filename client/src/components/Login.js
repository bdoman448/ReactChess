import React, { Component } from 'react'
import axios from 'axios'
import '../css/board.css';

export default class Login extends Component {
    constructor(props) {
        super('getUserData');

        this.state = {
            username: "",
            password: "",
            wins: [],
        }
    }

handleSubmit = (event) => {
    axios.get("http://localhost:5000/login", {
        user: {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username
        }
    },

    ).then( result => {
        this.props.getUserData(result.data.username, result.data.password, result.data.wins);

    }).catch( error => {
        console.log( error)
    })
    event.preventDefault();
}

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

render() {
    return (
            <form onSubmit={this.handleSubmit} >
            
            <input type="username" name="username" 
            placeholder="Username" value={this.state.username} 
            onChange={this.handleChange} required/>

            <input type="password" name="password" 
            placeholder="Password" value={this.state.password} 
            onChange={this.handleChange} required/>

            <button type="submit">LogIn</button>

            </form>
    )
}
}

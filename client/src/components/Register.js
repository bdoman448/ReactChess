import React, { Component } from 'react'
import axios from 'axios'

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_conf: "",
            username: ""
        }
    }

handleSubmit = (event) => {
    axios.post("http://localhost:5000/register", {
        user: {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
            wins: [0,0,0]
        }
    },
    ).then( result => {
        console.log(result)
    }).catch( error => {
        console.log(error)
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
            <div>
               <form onSubmit={this.handleSubmit} >
               <input type="email" name="email" 
                placeholder="Something@something.com" value={this.state.email} 
                onChange={this.handleChange} required/>
                
                <input type="password" name="password" 
                placeholder="Password" value={this.state.password} 
                onChange={this.handleChange} required/>

                <input type="password" name="password_conf" 
                placeholder="Password confirmation" value={this.state.password_confirmation} 
                onChange={this.handleChange} required/>

                <input type="username" name="username" 
                placeholder="Username" value={this.state.username} 
                onChange={this.handleChange} required/>

                <button type="submit">Register</button>

               </form>
            </div>
        )
    }
}

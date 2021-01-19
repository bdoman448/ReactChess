import React, { Component } from 'react'
import '../css/board.css';

export default class Profile extends Component {
    render() {
        let total_games = this.props.wins[0] + this.props.wins[1] + this.props.wins[2] 
        return (
            <div>
                <h1>Username: {this.props.username}</h1>
                <h1>Wins : </h1>
                <div className="Statistics">
                    <div className="Block"> <h1>White</h1>{this.props.wins[0] / total_games }</div>
                    <div className="Block"> <h1>Draw</h1>{this.props.wins[1] / total_games }</div>
                    <div className="Block"> <h1>Black</h1>{this.props.wins[2] / total_games }</div>
                </div>
            </div>
        )
    }
}

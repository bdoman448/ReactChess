import React, { Component } from 'react'
import Queen from './pieces/Queen';
import Rook from './pieces/Rook'
import Knight from './pieces/Knight'
import Bishop from './pieces/Bishop'
import Q_W from '../images/white_queen.png'
import Q_B from '../images/black_queen.png'
import R_W from '../images/white_rook.png'
import R_B from '../images/black_rook.png'
import K_W from '../images/white_knight.png'
import K_B from '../images/black_knight.png'
import B_W from '../images/white_bishop.png'
import B_B from '../images/black_bishop.png'

export default class Popup extends Component {

    constructor(player) 
    {
        super()

        this.state = {
            images: [
                {Q_W: "../images/white_queen.png"},
                {Q_B: "../images/black_queen.jpg"}
            ]
        }
    }

    render() {
        return (        
            <div>
                <button>
                    <img src={this.props.player === 1? Q_B : Q_W}
                    onClick = {() => this.props.pieceSwap(new Queen(1))}
                     style={ {height: '100%', width: '100%'}}/>
                </button>
                <button>
                    <img src={this.props.player === 1? R_B : R_W}   
                    onClick = {() => this.props.pieceSwap(new Rook(1))}
                     style={ {height: '100%', width: '100%'}}/>
                </button>

                <button>
                    <img src={this.props.player === 1? B_B : B_W}  
                    onClick = {() => this.props.pieceSwap(new Bishop(1))}
                     style={ {height: '100%', width: '100%'}}/>
                </button>
                <button>
                    <img src={this.props.player === 1? K_B : K_W}   
                    onClick = {() => this.props.pieceSwap(new Knight(1))}
                     style={ {height: '100%', width: '100%'}}/>
                </button>
    c
    
            </div>
            )
    }
}

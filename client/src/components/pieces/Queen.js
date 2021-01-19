import React, { Component } from 'react'
import img_bk from '../../images/black_queen.png'
import img_wt from '../../images/white_queen.png'

export default class Queen extends Component {

    constructor(player)
    {
        super()
        
        this.state = {
            alive: true,
            style: player === 1? img_wt : img_bk,
            available_moves: [],
            player: player,
            moves: [1,2,3,4,5,6,7],
            blocked: [
                {left: false},
                {right: false},
                {up: false},
                {down: false},
                {top_left: false},
                {top_right: false},
                {bottom_left: false},
                {bottom_right: false}
            ]
        }

    }

checkMoves(squares,available_moves,col,row)
{

    let move;
    let newBlock = [...this.state.blocked]
    this.state.moves.map(diff => {


        if(col-diff >= 0 && !newBlock.left )  {// MOVE LEFT
            
            move = (row)*8 + (col-diff)
            available_moves.push(move);
            if(squares[move]) {
                newBlock.left = true;
                if(squares[move].state.player === this.state.player ) {
                    available_moves.pop()
                }
            }
        }

        if(col+diff <= 7 && !newBlock.right ) { // MOVE RIGHT
                move = (row)*8 + (col+diff)
                available_moves.push(move);
                if(squares[move]) {
                newBlock.right = true;
                    if(squares[move].state.player === this.state.player ) {
                        available_moves.pop()
                    }
                }
            }

            if(row-diff >= 0 && !newBlock.down) {  // MOVE DOWN
            
            move = (row-diff)*8 + col
            available_moves.push(move);
            if(squares[move]) {
                newBlock.down = true;
                if(squares[move].state.player === this.state.player ) {
                    available_moves.pop()
                }
            }
            }

        if(row+diff <= 7 && !newBlock.up) { // MOVE UP

            move = (row+diff)*8 + col
            available_moves.push(move);
            if(squares[move]) {
                newBlock.up = true;
                if(squares[move].state.player === this.state.player ) {
                    available_moves.pop()
                }
            }
            }


        if(col-diff >= 0 && row+diff <= 7 && // MOVE TOP_LEFT
            !newBlock.top_left ) {
                
                move = (row+diff)*8 + (col-diff)
                available_moves.push(move);
                if(squares[move]) {
                    newBlock.top_left = true;
                    if(squares[move].state.player === this.state.player ) {
                        
                        available_moves.pop()
                        
                    }
                }
            }
            if(col+diff <= 7 && row+diff <= 7 &&  // MOVE TOP_RIGHT
            !newBlock.top_right ) {
            
                move = (row+diff)*8 + (col+diff)
                available_moves.push(move);
                if(squares[move]) {
                    newBlock.top_right = true;
                    if(squares[move].state.player === this.state.player ) {                  
                        available_moves.pop()
                    }
                }
            }

            
            if(col-diff >= 0 && row-diff >= 0 &&   // MOVE BOTTOM_LEFT
                !newBlock.bottom_left)  {

                move = (row-diff)*8 + (col-diff)
                available_moves.push(move);
                if(squares[move]) {
                    newBlock.bottom_left = true;
                    if(squares[move].state.player === this.state.player ) {
                        available_moves.pop()
                    }
                }
            }

            if(col+diff <= 7 && row-diff >= 0 &&   // MOVE BOTTOM_RIGHT
                !newBlock.bottom_right) {
            
                move = (row-diff)*8 + (col+diff)
                available_moves.push(move);
                if(squares[move]) {
                    newBlock.bottom_right = true;
                    if(squares[move].state.player === this.state.player ) {
                    available_moves.pop()
                    }
                }
            }
    })
}
    possibleMoves(pos,squares)
    {

        let available_moves = []
        let col = pos % 8;
        let row = Math.floor(pos / 8)

        this.checkMoves(squares,available_moves,col,row)


        return available_moves;
    }
}





 


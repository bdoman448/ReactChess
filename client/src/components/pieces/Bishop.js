import React, { Component } from 'react'
import img_bk from '../../images/black_bishop.png'
import img_wt from '../../images/white_bishop.png'

export default class Bishop extends Component {
    constructor(player)
    {
        super()
        
        this.state = {
            style: player === 1? img_wt : img_bk,
            available_moves: [],
            player: player,
            moves: [1,2,3,4,5,6,7],
            blocked: [
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

            if(col-diff >= 0 && row+diff <= 7 && !newBlock.left ) {  // MOVE TOP_LEFT
                move = (row+diff)*8 + (col-diff)
                available_moves.push(move);
                if(squares[move]) {
                    newBlock.left = true;
                    if(squares[move].state.player === this.state.player ) {
                        available_moves.pop()
                    }
                }
            }

            if(col+diff <= 7 && row+diff <= 7 && !newBlock.right ) {  // MOVE TOP_RIGHT
                move = (row+diff)*8 + (col+diff)
                available_moves.push(move);
                if(squares[move]) {
                   newBlock.right = true;
                    if(squares[move].state.player === this.state.player ) {
                        available_moves.pop()
                    }
                }
            }

             if(col-diff >= 0 && row-diff >= 0 && !newBlock.down) { // MOVE BOTTOM_LEFT
                move = (row-diff)*8 + (col-diff)
                available_moves.push(move);
                if(squares[move]) {
                    newBlock.down = true;
                    if(squares[move].state.player === this.state.player ) {
                        available_moves.pop()
                    }
                }
             }

             if(col+diff <= 7 && row-diff >= 0 && !newBlock.up) {  // MOVE BOTTOM_RIGHT
                move = (row-diff)*8 + (col+diff)
                available_moves.push(move);
                if(squares[move]) {
                    newBlock.up = true;
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

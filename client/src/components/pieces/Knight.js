import { Component } from 'react'
import img_bk from '../../images/black_knight.png'
import img_wt from '../../images/white_knight.png'

export default class Knight extends Component {

    constructor(player)
    {
        super()
        
        this.state = {
            alive: true,
            style: player === 1? img_wt : img_bk,
            available_moves: [],
            player: player,
            moves: [
                {col:1, row:2},
                {col:2, row:1},
            ]
        }
    }

checkMoves(squares,available_moves,col,row)
{
    let move_up;
    let move_down;
    this.state.moves.map(diff => {

        if(col-diff.col >= 0) { // MOVE LEFT 
            move_up = (row+diff.row)*8 + (col-diff.col)
            move_down = (row-diff.row)*8 + (col-diff.col)
            if(!squares[move_up] || squares[move_up]?.state.player !== this.state.player)
                available_moves.push(move_up)
            
            if(!squares[move_down] || squares[move_down]?.state.player !== this.state.player)
                available_moves.push(move_down)
        }

        if(col+diff.col <= 7) { // MOVE RIGHT 
            move_up = (row+diff.row)*8 + (col+diff.col)
            move_down = (row-diff.row)*8 + (col+diff.col)
            if(!squares[move_up] || squares[move_up]?.state.player !== this.state.player)
                available_moves.push(move_up)
            
            if(!squares[move_down] || squares[move_down]?.state.player !== this.state.player)
                available_moves.push(move_down)
        }

        }
    )
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

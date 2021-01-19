import { Component } from 'react'
import img_bk from '../../images/black_pawn.png'
import img_wt from '../../images/white_pawn.png'


export default class Pawn extends Component {

constructor(player)
{
    super()
    
    this.state = {
        style: player === 1? img_wt : img_bk,
        player: player,
        pawn: true,
        initalPos: {
            1: [8,9,10,11,12,13,14,15],
            2: [48,49,50,51,52,53,54,55]
        },
        moves: [
            {col:0, row:1},
            {col:0, row:2},
            {col:1, row:1},
            {col:-1, row:1}
        ],
    }
}

    checkDiagEnemies = (pos,squares,available_moves) =>
    {
        let diag1 = this.state.player === 1 ? pos+7 : pos-9
        let diag2 = this.state.player === 1 ? pos+9 : pos-7

        if(squares[diag1] && 
           pos%8 !== 0 &&
           squares[diag1]?.state.player !== this.state.player)  {
            available_moves.push(diag1)
        }

        if(squares[diag2] && 
           pos%8 !== 7 &&
           squares[diag2]?.state.player !== this.state.player) {
            available_moves.push(diag2)

        }

        return available_moves
    }

checkIfOcupied = (pos,available_moves,squares) =>
{
    if(!squares[pos])
        available_moves.push(pos)
}


    possibleMoves(current_pos,squares)
    {
        let available_moves = []

        // Provjera za pomak 1 polja unaprijed
        this.checkIfOcupied(this.state.player === 1 ? current_pos+8 : current_pos-8,available_moves,squares)  
        
        // Provjera za pomak 2 polja unaprijed
        if(this.state.initalPos[this.state.player].find(el => el === current_pos)) 
        {
            this.checkIfOcupied(this.state.player === 1 ? current_pos+16 : 
                                current_pos-16,available_moves,squares)
        }

        // Provjera dijagonala
        this.checkDiagEnemies(current_pos,squares,available_moves) 

        return available_moves;
    }


}

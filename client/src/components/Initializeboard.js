import React from 'react'
import Pawn from './pieces/Pawn'
import Rook from './pieces/Rook';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import Queen from './pieces/Queen';
import King from './pieces/King';

export default function Initialize_board() {

    const Init_board = Array(64).fill(null);

    for (let i = 0; i < 63; i++) {

        if(i > 7 && i < 16) {
            Init_board[i] = new Pawn(1)
            Init_board[i+40] = new Pawn(2)  
            Init_board[50] = new Pawn(1)  
        }

        if(i === 0 || i === 7) {
            Init_board[i] = new Rook(1)
            Init_board[i+56] = new Rook(2)
        }

        if(i === 1 || i === 6) {
            Init_board[i] = new Knight(1)
            Init_board[i+56] = new Knight(2)
        }

        if(i === 2 || i === 5) {
            Init_board[i] = new Bishop(1)
            Init_board[i+56] = new Bishop(2)
        }

        if(i === 3) {
            Init_board[i] = new Queen(1)
            Init_board[i+56] = new Queen(2)
        }

        if(i === 4) {
            Init_board[i] =  new King(1)
            Init_board[i+56] = new King(2)
        }
    }
    return Init_board;
}

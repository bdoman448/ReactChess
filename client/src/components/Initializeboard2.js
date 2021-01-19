import React from 'react'
import Pawn from './pieces/Pawn'
import Rook from './pieces/Rook';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import Queen from './pieces/Queen';
import King from './pieces/King';

export default function Initialize_board() {

    const Init_board = Array(64).fill(null);

    Init_board[4] = new King(1)
    Init_board[60] = new King(2)

    Init_board[44] = new Pawn(1)
    Init_board[45] = new Rook(1)
    Init_board[43] = new Rook(1)

    Init_board[36] = new Queen(1)

    return Init_board;
}

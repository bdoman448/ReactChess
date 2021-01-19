import React, { Component } from 'react';
import Square from './Square';
import init from './Initializeboard'
import Pawn from './pieces/Pawn'
import Popup from './Popup'
import axios from 'axios'
import '../css/board.css';

class Board extends Component {
    state = {
        squares: init(),
        selected_square: [],
        selected_piece: null,
        available_moves: [],
        player: 1,
        change_pawn: false,
        check: false,
        pat: false,
        popup: false
    }

    checkColour = (i,j) => {
        if(i*8+j === this.state.selected_square) {
            return '#45b6fe';
        }

        if((i+j)%2 == 1 ) {
            return '#fff';
        }
        return '#383838';
    }

    checkIfEndGame = (newSquares) => { 
        let test_squares =  [...this.state.squares];

        let king_moves = []
        let king_index;
        let inital_king_moves = [];

        let friendly_moves = [];
        let blockable = []

        newSquares.map((piece,index) => {
            if(piece && piece?.state.player === this.state.player){  /// ADD ALL MOVES EXPECT THE KINGS
                if(piece.state.king === undefined)
                    friendly_moves.push(...piece.possibleMoves(index,newSquares))

                if(piece.state?.king) /// ADD KING MOVES FOR SEPARRATE PROCESSING
                {
                    inital_king_moves.push(...piece.possibleMoves(index,newSquares))
                    king_index = index
                }
            }
        })

        friendly_moves = Array.from(new Set(friendly_moves)) // REMOVES DUPLICATES
        friendly_moves = friendly_moves.filter(move => move <= 64 && move >= 0) // CHECKS BOUNDS

        //// CHECK IF THE KING CAN MOVE
        inital_king_moves = Array.from(new Set(inital_king_moves)) // REMOVES DUPLICATES
        inital_king_moves = inital_king_moves.filter(move => move <= 64 && move >= 0) // CHECKS BOUNDS

        this.kingMoves(king_moves,inital_king_moves,king_index)
        if(friendly_moves.length === 0 && king_moves.length === 0 && !this.checkIfCheck2(test_squares)) {
            window.location.reload(true);
            axios.patch("http://localhost:5000/profile", {
                user: {
                    username: this.props.username,
                    wins: this.props.wins[0] + 1
                }
            })   
        }     

        this.blockableMoves(blockable,friendly_moves)
        if(blockable.length === 0 && king_moves.length === 0 && this.checkIfCheck2(test_squares)) {
            window.location.reload(true);
            axios.patch("http://localhost:5000/profile", {
                user: {
                    username: this.props.username,
                    wins: this.props.wins[this.state.player] + 1
                }
            })
        }
    }


    blockableMoves = (blockable_moves, friendly_moves) => {
        let test_squares;

        friendly_moves.map((move) => {
            test_squares = [...this.state.squares];
            test_squares[move]= new Pawn(this.state.player);
            if(!this.checkIfCheck2(test_squares)) {
                blockable_moves.push(move)
            }
        })
    }

    kingMoves = (king_moves,inital_king_moves,king_index) => {
        let test_squares;

        inital_king_moves.map((move) => {

            test_squares = [...this.state.squares];
            test_squares[move]= test_squares[king_index];
            test_squares[king_index] = null
            if(!this.checkIfCheck2(test_squares)) {
                king_moves.push(move)
            }
        })
        king_moves = Array.from(new Set(king_moves))
    }
 
    getAllFriendlyMoves = (all_moves) =>
    {
        this.state.squares.map((piece,index) => {
            if(piece && piece.state.player === this.state.player)
                all_moves.push(...piece.possibleMoves(index,this.state.squares))
        })

        all_moves = Array.from(new Set(all_moves)) // REMOVES DUPLICATES
    }

    checkIfCheck2 = (newSquares) => {
        let all_moves = []
        let check = false
        console.log("DOBIA SAM", newSquares)
        this.getAllEnemyMoves(all_moves,newSquares)
        console.log("SVI NEPRIJATELJSKI",all_moves);
        all_moves.map( id => {
            if(newSquares[id] && newSquares[id]?.state?.king && newSquares[id]?.state?.player === this.state.player){
                check = true;
                all_moves.splice(id,1)
            }
        })

        return check
    }

    pieceSwap = (piece) => {

        let newSquares = [...this.state.squares];
        newSquares[this.state.selected_square] = piece;
        this.setState({ popup: false,
                        squares: newSquares})
    }

    
    getAllEnemyMoves = (enemy_moves,newSquares) =>   {
        newSquares.map((piece,index) => {
            if(piece && piece.state.player !== this.state.player)
                enemy_moves.push(...piece.possibleMoves(index,newSquares))
        })
    }
    
    getPieceInfo = (id,piece) => {

        let newSquares = [...this.state.squares];
        const border = this.state.player === 1? 7:0

        if(piece !== null && piece.state.player === this.state.player) {
            this.setState({ selected_square: id,
                            available_moves: piece.possibleMoves(id,this.state.squares),
                            selected_piece: piece
                          },()=> { });
            console.log("MOVES JE ")
            console.log(piece.possibleMoves(id,this.state.squares))
            //this.checkIfCheck2(newSquares)
        }

        if (this.state.selected_piece?.state.player === this.state.player &&
            id === this.state.available_moves.find(el => id === el)) {
            console.log("MOVES 2 je", this.state.available_moves)
            newSquares[id]= this.state.selected_piece;
            newSquares[this.state.selected_square] = null;
            
            if(!this.checkIfCheck2(newSquares)) 
            {
                console.log("CHECK JE", Math.floor(id / 8))
                console.log("BORDER JE", border)
                if( (Math.floor(id / 8) ===  border) && this.state.selected_piece?.state?.pawn)
                {
                    this.setState({popup: true,
                                   selected_square: id })
                }

                this.setState({
                    squares: newSquares,
                    player: this.state.player === 1? 2:1
                })
            }

        }

        this.checkIfEndGame(newSquares)
    }

    render() {
        const board = [];
        let key_val = 0;

        for(let i = 0; i < 8; i++){
            const basket_arr = [];
            for(let j = 0; j < 8; j++){
                basket_arr.push(
                    <Square
                    colour = {this.checkColour(i,j)}
                    id= {key_val}
                    callback = {this.getPieceInfo}
                    piece = {this.state.squares[key_val]}
                    key={key_val++}
                    />
                )
            }
            board.push(basket_arr)
          }


        return(
            <div className="GameBoard">
                <div className="BoardWrapper">
                {board}
                </div>
                <div className="Popup">
                {this.state.popup ?
                    <Popup pieceSwap = {this.pieceSwap} player = {this.state.player} /> : null
                }
                </div>
            </div>
        )
    }

}

const board = Array(8).fill(0).map(x => Array(8).fill(1));



export default Board;
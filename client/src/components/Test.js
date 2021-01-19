checkIfEndGame = (newSquares) => {  
  let test_squares =  [...this.state.squares];

  let king_moves = []
  let king_index;
  let inital_king_moves = [];

  let friendly_moves = [];
  let blockable = []
  let new_wins = []

  newSquares.map((piece,index) => {
      if(piece && piece?.state.player === this.state.player){  
          if(piece.state.king === undefined)
             friendly_moves.push(...piece.possibleMoves(index,
                                                        newSquares))
          if(piece.state?.king) {
             inital_king_moves.push(...piece.possibleMoves(index,
                                                           newSquares))
              king_index = index
          }
      }
  })

  friendly_moves = Array.from(new Set(friendly_moves)) 
  friendly_moves = friendly_moves.filter(move => move <= 64 && move >= 0) 

  inital_king_moves = Array.from(new Set(inital_king_moves)) 
  inital_king_moves = inital_king_moves.filter(move => move <= 64 && move >= 0) 

  this.kingMoves(king_moves,inital_king_moves,king_index)
      if(friendly_moves.length === 0 && king_moves.length === 0 && 
         !this.checkIfCheck2(test_squares)) {
          window.location.reload(true);
          axios.patch("http://localhost:5000/profile", {
              user: {
                  username: this.props.username,
                  wins: this.props.wins[0] + 1
              }
          })   
      }     

  this.blockableMoves(blockable,friendly_moves)
      if(blockable.length === 0 && king_moves.length === 0 && 
         this.checkIfCheck2(test_squares)) {
          window.location.reload(true);
          axios.patch("http://localhost:5000/profile", {
              user: {
                  username: this.props.username,
                  wins: this.props.wins[this.state.player] + 1
              }
          })
      }
}


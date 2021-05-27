
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'grid',
  'gridTemplate': 'repeat(3, 1fr) / repeat(3, 1fr)',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onClick}) {
    return (
        <button style={squareStyle} onClick={onClick}>{value}</button>
    );
}

function Board( {squares, onClick, winner, setBoard, xIsNext} ) {
    return (
      <div style={containerStyle} className="gameBoard">
        <div id="statusArea" className="status" style={instructionsStyle}>{winner ? null : "Next player: " + (xIsNext ? "X" : "O")}</div>
        <div id="winnerArea" className="winner" style={instructionsStyle}>{winner ? "Winner: " + winner + "!" : "Waiting for the winner!"}</div>
        <button style={buttonStyle} onClick={() => setBoard(Array(9).fill(null))}>Reset</button>
        <div style={boardStyle}>
          {squares.map((square, i) => {
            return <Square key={i} value={square} onClick={() => onClick(i)}/>
          })}
        </div>
      </div>
    );
}

function Game() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(i) {
    const boardCopy = [...board];

    if (winner || boardCopy[i]) return;

    boardCopy[i] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={board} onClick={handleClick} winner={winner} setBoard={setBoard} xIsNext={xIsNext}/>
        </div>
      </div>
    )
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

import React, { useState } from "react";

const rowStyle = {
  display: "flex",
};

const boxStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const messageStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

function Square({ value, ClickSquare }) {
  return (
    <div className="square" style={boxStyle} onClick={ClickSquare}>
      {value}
    </div>
  );
}

function Board({ WhosTurn, squares, PlayNow }) {
  const markSquare = (index) => {
    if (calculateWin(squares) || squares[index]) {
      return;
    }
    const FutureActs = squares.slice();
    if (WhosTurn) {
      FutureActs[index] = "X";
    } else {
      FutureActs[index] = "O";
    }
    PlayNow(FutureActs);
  };
  const winner = calculateWin(squares);
  const reloadPage = () => {
    window.location.reload(false);
  };
  return (
    <div style={containerStyle} className="tttBoard">
      <div id="statusArea" className="status" style={messageStyle}>
        Current player: <span>{WhosTurn ? "X" : "O"}</span>
      </div>
      <div id="winnerArea" className="winner" style={messageStyle}>
        Winner: <span>{winner}</span>
      </div>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square value={squares[0]} ClickSquare={() => markSquare(0)} />
          <Square value={squares[1]} ClickSquare={() => markSquare(1)} />
          <Square value={squares[2]} ClickSquare={() => markSquare(2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={squares[3]} ClickSquare={() => markSquare(3)} />
          <Square value={squares[4]} ClickSquare={() => markSquare(4)} />
          <Square value={squares[5]} ClickSquare={() => markSquare(5)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={squares[6]} ClickSquare={() => markSquare(6)} />
          <Square value={squares[7]} ClickSquare={() => markSquare(7)} />
          <Square value={squares[8]} ClickSquare={() => markSquare(8)} />
        </div>
      </div>
      <button onClick={reloadPage} style={buttonStyle}>
        Reset
      </button>
    </div>
  );
}
function calculateWin(squares) {
  const cords = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < cords.length; i++) {
    const [a, b, c] = cords[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  const [past, setPast] = useState([Array(9).fill("")]);
  const [currenTurn, setCurrentTurn] = useState(0);
  const WhosTurn = currenTurn % 2 === 0;
  const nowSquares = past[currenTurn];

  const handlePlayNow = (FutureActs) => {
    const nextFuture = [...past.slice(0, currenTurn + 1), FutureActs];
    setPast(nextFuture);
    setCurrentTurn(nextFuture.length - 1);
  };
  return (
    <div className="ttt">
      <div className="ttt-board">
        <Board
          WhosTurn={WhosTurn}
          squares={nowSquares}
          PlayNow={handlePlayNow}
        />
      </div>
    </div>
  );
}

export default App;

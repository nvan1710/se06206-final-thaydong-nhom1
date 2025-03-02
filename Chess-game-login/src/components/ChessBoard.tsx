import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Square from "./Square"; 

const initialBoardSetup = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

const Chessboard = () => {
  const [board, setBoard] = useState(initialBoardSetup);

  const movePiece = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      const piece = newBoard[fromRow][fromCol];
      const targetPiece = newBoard[toRow][toCol];

      if (piece === "") return prevBoard;

      const isWhite = "♙♖♘♗♕♔".includes(piece);
      const isTargetWhite = "♟♜♞♝♛♚".includes(targetPiece);

      if (targetPiece !== "" && isWhite === isTargetWhite) return prevBoard;

      newBoard[toRow][toCol] = piece;
      newBoard[fromRow][fromCol] = "";

      return newBoard;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center mt-5">
        <h1 className="text-3xl font-bold mb-4">Chess Game</h1>
        <div className="grid grid-cols-8 border-4 border-black">
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => (
              <>
              <Square piece={piece} row={rowIndex} col={colIndex} movePiece={movePiece} />
            </>
            

            ))
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default Chessboard;

import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { initialBoardSetup } from "../data/chessPieces";
import { isValidMove } from "../utils/moveRules";

const ItemTypes = { PIECE: "piece" };

const Square = ({ piece, row, col, movePiece }) => {
  const isDark = (row + col) % 2 === 1;
    const isWhiteTeam = "♙♖♘♗♕♔".includes(piece); // White pieces
    const pieceColor = isWhiteTeam ? "text-white" : "text-brown-700"; // Milk white & Brown
  // Drag logic
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PIECE,
    item: { row, col, piece },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Drop logic
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.PIECE,
    drop: (item) => movePiece(item.row, item.col, row, col),
  }));

  return (
    <div
      ref={drop}
      className={`w-16 h-16 flex justify-center items-center text-2xl font-bold
        ${isDark ? "bg-[#9A6553] " : "bg-[#D5B793] "}`}
    >
      {piece && (
        <span
          ref={drag}
          className={`${pieceColor} ${isDragging ? "opacity-50" : "cursor-grab"}`}
        >
          {piece}
        </span>
      )}
    </div>
  );
};



const Chessboard = () => {
  const [board, setBoard] = useState(initialBoardSetup);
  const [moveHistory, setMoveHistory] = useState([]); // Store moves

  // const movePiece = (fromRow, fromCol, toRow, toCol) => {
  //   const piece = board[fromRow][fromCol];

  //   if (isValidMove(piece, fromRow, fromCol, toRow, toCol, board)) {
  //     const newBoard = board.map((row) => [...row]);
  //     newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
  //     newBoard[fromRow][fromCol] = "";
  //     setBoard(newBoard);

  //     // Convert board positions to chess notation
  //     const move = `${piece} ${convertToChessNotation(fromRow, fromCol)} → ${convertToChessNotation(toRow, toCol)}`;
  //     setMoveHistory([...moveHistory, move]);
  //   }
  // };

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]); // Clone board
      const piece = newBoard[fromRow][fromCol];
      const targetPiece = newBoard[toRow][toCol];
  
      // Ensure the move is valid before updating
      if (isValidMove(piece, fromRow, fromCol, toRow, toCol, newBoard)) {
        const isWhitePiece = "♙♖♘♗♕♔".includes(piece);
        const isTargetWhite = "♟♜♞♝♛♚".includes(targetPiece);
  
        // Prevent capturing own team's pieces
        if (targetPiece !== "" && isWhitePiece === isTargetWhite) {
          return prevBoard; // Invalid move
        }
  
        // Capture opponent piece (removes from board)
        newBoard[toRow][toCol] = piece;
        newBoard[fromRow][fromCol] = ""; // Empty old position
  
        // Store move history correctly
        setMoveHistory((prevHistory) => [
          ...prevHistory,
          targetPiece
            ? `${piece} ${convertToChessNotation(fromRow, fromCol)} captures ${targetPiece} at ${convertToChessNotation(toRow, toCol)}`
            : `${piece} ${convertToChessNotation(fromRow, fromCol)} → ${convertToChessNotation(toRow, toCol)}`,
        ]);
  
        return newBoard; // Return updated board
      }
  
      return prevBoard; // If move is invalid, keep board unchanged
    });
  };
  
  
  

  // Convert (row, col) to chess notation (e.g., (0,0) → "a8")
  const convertToChessNotation = (row, col) => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return `${files[col]}${8 - row}`;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        {/* Chessboard */}
        <div className="grid grid-cols-8 w-128 h-128 border-4 border-black">
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => (
              <Square
                key={`${rowIndex}-${colIndex}`}
                piece={piece}
                row={rowIndex}
                col={colIndex}
                movePiece={movePiece}
              />
            ))
          )}
        </div>

        {/* Move History */}
        <div className="ml-4">
          <h2 className="text-lg font-bold mb-2">Move History</h2>
          <ul className="text-sm bg-gray-200 p-2 rounded w-40 h-64 overflow-y-auto">
            {moveHistory.map((move, index) => (
              <li key={index} className="mb-1">{`${index + 1}. ${move}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </DndProvider>
  );
};

export default Chessboard;

import React, { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { initialBoardSetup } from "../data/chessPieces";
import { isValidMove, isKingInCheck, getAllPossibleMoves } from "../utils/moveRules";

const ItemTypes = { PIECE: "piece" };

const Square = ({ piece, row, col, movePiece, turn }) => {
  const isDark = (row + col) % 2 === 1;
  const isWhitePiece = "♙♖♘♗♕♔".includes(piece);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PIECE,
    item: { row, col, piece },
    canDrag: (isWhitePiece && turn === "white") || (!isWhitePiece && turn === "black"), // Allow only current turn player to move
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.PIECE,
    drop: (item) => movePiece(item.row, item.col, row, col),
  }));

  return (
    <div
      ref={drop}
      className={`w-16 h-16 flex justify-center items-center text-2xl font-bold ${
        isDark ? "bg-[#9A6553]" : "bg-[#D5B793]"
      }`}
    >
      {piece && (
        <span
          ref={drag}
          className={`cursor-grab ${isDragging ? "opacity-50" : ""}`}
        >
          {piece}
        </span>
      )}
    </div>
  );
};

const Chessboard = () => {
  const [board, setBoard] = useState(initialBoardSetup);
  const [moveHistory, setMoveHistory] = useState([]);
  const [turn, setTurn] = useState("white");
  const [checkStatus, setCheckStatus] = useState(null);

  useEffect(() => {
    // Check if the current player's king is in check
    const kingInCheck = isKingInCheck(turn, board);
    setCheckStatus(kingInCheck ? `${turn} is in CHECK!` : null);
  }, [board, turn]);

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      const piece = newBoard[fromRow][fromCol];
  
      if (!isValidMove(piece, fromRow, fromCol, toRow, toCol, newBoard, turn)) return prevBoard;
  
      newBoard[toRow][toCol] = piece;
      newBoard[fromRow][fromCol] = "";
  
      setMoveHistory((prevHistory) => [
        ...prevHistory,
        `${piece} ${convertToChessNotation(fromRow, fromCol)} → ${convertToChessNotation(toRow, toCol)}`,
      ]);
  
      setTurn(turn === "white" ? "black" : "white");
  
      return newBoard;
    });
  };
  
  
  const convertToChessNotation = (row, col) => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return `${files[col]}${8 - row}`;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">{turn.toUpperCase()}'s Turn</h2>
        {checkStatus && <div className="text-red-500 font-bold">{checkStatus}</div>}
        
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
                  turn={turn}
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
      </div>
    </DndProvider>
  );
};

export default Chessboard;

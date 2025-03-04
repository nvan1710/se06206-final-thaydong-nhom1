import React, { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { initialBoardSetup } from "../data/chessPieces";
import { isValidMove, isKingInCheck, isValidCastling } from "../utils/moveRules";
import pieceImages from "../assets/pieceImages";

const ItemTypes = { PIECE: "piece" };

const Square = ({ piece, row, col, movePiece, turn, highlighted, onClick }) => {
  const isDark = (row + col) % 2 === 1;
  const isWhitePiece = "♙♖♘♗♕♔".includes(piece);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PIECE,
    item: { row, col, piece },
    canDrag: (turn === "white" && isWhitePiece) || (turn === "black" && !isWhitePiece),
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));
  
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.PIECE,
    drop: (item) => movePiece(item.row, item.col, row, col),
  }));

  return (
    <div
      ref={drop}
      onClick={onClick}
      className={`w-16 h-16 flex justify-center items-center relative border ${
        isDark ? "bg-[#8B5A2B]" : "bg-[#F0D9B5]"
      } ${highlighted ? "ring-4 ring-yellow-500" : ""}`}
    >
      {piece && (
        <img
          ref={drag}
          src={pieceImages[piece]}
          alt={piece}
          className={`w-12 h-12 cursor-pointer transition-transform ${
            isDragging ? "opacity-50 scale-90" : "hover:scale-110"
          }`}
        />
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
    setCheckStatus(isKingInCheck(turn, board) ? `${turn} is in CHECK!` : null);
  }, [board, turn]);

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      const piece = newBoard[fromRow][fromCol];
      if (!isValidMove(piece, fromRow, fromCol, toRow, toCol, newBoard, turn)) return prevBoard;
      
      if (newBoard[toRow][toCol]) {
        console.log(`Captured ${newBoard[toRow][toCol]}`);
      }
      
      newBoard[toRow][toCol] = piece;
      newBoard[fromRow][fromCol] = "";

      if ((piece === "♙" && toRow === 0) || (piece === "♟" && toRow === 7)) {
        newBoard[toRow][toCol] = piece === "♙" ? "♕" : "♛";
      }
      
      setMoveHistory([...moveHistory, `${piece} ${fromRow},${fromCol} → ${toRow},${toCol}`]);
      setTurn(turn === "white" ? "black" : "white");
      return newBoard;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">{turn.toUpperCase()}'s Turn</h2>
        {checkStatus && <div className="text-red-500 font-bold">{checkStatus}</div>}
        <div className="flex">
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

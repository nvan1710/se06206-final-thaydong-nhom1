import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getValidMoves } from "../utils/moveRules";
import { initialBoardSetup } from "../config/boardSetup";
import { isKingInCheck, isCheckmate, findKingPosition } from "../utils/checkmate";
import pieceImages from "../assets/pieceImages";

const ItemTypes = { PIECE: "piece" };

// Component cho từng ô trên bàn cờ
const Square = ({ piece, row, col, movePiece, isKingInCheck, selectedPiece, setSelectedPiece, currentTurn, board, validMoves }) => {
  const isDark = (row + col) % 2 === 1;
  const isSelected = selectedPiece && selectedPiece.row === row && selectedPiece.col === col;
  const isValidMoveSquare = validMoves.some((move) => move.row === row && move.col === col);
  const isCaptureMove = isValidMoveSquare && board[row][col]; // Nếu có quân ở ô này, tô viền đỏ

  // Kéo thả quân cờ
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PIECE,
    item: { row, col, piece },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Nhận quân cờ được kéo vào
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.PIECE,
    drop: (item) => movePiece(item.row, item.col, row, col),
  }));

  // Click vào ô cờ
  const handleClick = () => {
    if (selectedPiece) {
      const isValidMove = validMoves.some(move => move.row === row && move.col === col);
      if (isValidMove) {
        movePiece(selectedPiece.row, selectedPiece.col, row, col);
      }
      setSelectedPiece(null);
    } else if (piece) {
      const isWhite = "♙♖♘♗♕♔".includes(piece);
      if (isWhite === currentTurn) {
        setSelectedPiece({ row, col, piece });
      }
    }
  };

  return (
    <div
      ref={drop}
      className={`w-16 h-16 flex justify-center items-center 
        ${isDark ? "bg-[#9A6553]" : "bg-[#D5B793]"}
        ${isKingInCheck ? "border-4 border-red-500" : ""}
        ${isSelected ? "border-4 border-yellow-500" : ""}
        ${isValidMoveSquare ? "bg-green-500" : ""}
        ${isCaptureMove ? "border-4 border-red-500" : ""}
      `}
      onClick={handleClick}
    >
      {piece && pieceImages[piece] && (
        <img
          ref={drag}
          src={pieceImages[piece]}
          alt={piece}
          className={`w-12 h-12 object-contain ${isDragging ? "opacity-50" : "cursor-pointer"}`}
        />
      )}
    </div>
  );
};

// Component chính của bàn cờ
const Chessboard = () => {
  const [board, setBoard] = useState(initialBoardSetup);
  const [moveHistory, setMoveHistory] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(true); // true: Trắng, false: Đen
  const [isCheck, setIsCheck] = useState(false);
  const [isCheckMate, setIsCheckMate] = useState(false);
  const [checkedKing, setCheckedKing] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  // Hàm di chuyển quân cờ
  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map(row => [...row]);
      const piece = newBoard[fromRow][fromCol];

      // Kiểm tra nước đi hợp lệ
      if (getValidMoves(piece, fromRow, fromCol, newBoard).some(move => move.row === toRow && move.col === toCol)) {
        newBoard[toRow][toCol] = piece;
        newBoard[fromRow][fromCol] = "";

        const isWhiteTurn = "♙♖♘♗♕♔".includes(piece);
        setCurrentTurn(!currentTurn);

        // Kiểm tra vua có bị chiếu hay không
        const isNowCheck = isKingInCheck(newBoard, !isWhiteTurn);
        setIsCheck(isNowCheck);
        setCheckedKing(isNowCheck ? findKingPosition(newBoard, !isWhiteTurn) : null);
        setIsCheckMate(isCheckmate(newBoard, !isWhiteTurn));

        // Lưu lịch sử nước đi
        setMoveHistory([...moveHistory, `${piece} ${convertToChessNotation(fromRow, fromCol)} ➝ ${convertToChessNotation(toRow, toCol)}`]);

        // Xóa trạng thái chọn quân
        setSelectedPiece(null);
        setValidMoves([]);
        return newBoard;
      }

      setSelectedPiece(null);
      return prevBoard;
    });
  };

  // Hàm chuyển đổi vị trí thành ký hiệu cờ vua (a1, b2, ...)
  const convertToChessNotation = (row, col) => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return `${files[col]}${8 - row}`;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-200">
        <h1 className="text-2xl font-bold mb-4">♟️ Chess Game ♟️</h1>

        <div className="mb-2">
          {isCheckMate ? (
            <div className="text-red-800 text-lg font-bold">🏆 Checkmate! Game Over 🏆</div>
          ) : isCheck ? (
            <div className="text-red-600 text-lg font-bold">🔥 King is in check! 🔥</div>
          ) : (
            <div className="text-lg font-bold">🎭 Current Turn: {currentTurn ? "White" : "Black"}</div>
          )}
        </div>

        <div className="grid grid-cols-8 border-4 border-black shadow-lg">
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => (
              <Square
                key={`${rowIndex}-${colIndex}`}
                piece={piece}
                row={rowIndex}
                col={colIndex}
                movePiece={movePiece}
                isKingInCheck={checkedKing?.row === rowIndex && checkedKing?.col === colIndex}
                selectedPiece={selectedPiece}
                setSelectedPiece={setSelectedPiece}
                currentTurn={currentTurn}
                board={board}
                validMoves={selectedPiece ? getValidMoves(selectedPiece.piece, selectedPiece.row, selectedPiece.col, board) : []}
              />
            ))
          )}
        </div>

        <div className="mt-4 bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-bold mb-2">📜 Move History</h2>
          <ul className="text-sm text-gray-700 h-32 overflow-auto">
            {moveHistory.map((move, index) => (
              <li key={index}>{index + 1}. {move}</li>
            ))}
          </ul>
        </div>
      </div>
    </DndProvider>
  );
};

export default Chessboard;

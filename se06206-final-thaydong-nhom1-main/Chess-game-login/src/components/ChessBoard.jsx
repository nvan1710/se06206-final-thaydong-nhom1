import React, { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getValidMoves } from "../utils/moveRules";
import { initialBoardSetup } from "../config/boardSetup";
import { isKingInCheck, isCheckmate, findKingPosition } from "../utils/checkmate";
import pieceImages from "../assets/pieceImages";
import { connectWebSocket, sendMove } from "../websocket"; // Import WebSocket
import ChessBoard from "./ChessBoard";
const ItemTypes = { PIECE: "piece" };
const ChessGame = () => {
  const [roomId, setRoomId] = useState(""); // Lưu roomId nhập vào
  const [joined, setJoined] = useState(false); // Kiểm tra đã vào phòng chưa
  const [isBlack, setIsBlack] = useState(false); // Xác định người chơi là bên nào

  const handleJoinRoom = () => {
    if (roomId.trim() !== "") {
      connectWebSocket(roomId, (playerColor) => {
        setIsBlack(playerColor === "black"); // Nếu là người chơi thứ 2 thì sẽ là đen
      });
      setJoined(true); // Đánh dấu đã vào phòng
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      {!joined ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">🔑 Enter Room ID</h2>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            placeholder="Enter Room ID"
          />
          <button
            onClick={handleJoinRoom}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Join Room
          </button>
        </div>
      ) : (
        <ChessBoard roomId={roomId} isBlack={isBlack} /> // Chuyển sang bàn cờ với thông tin màu sắc
      )}
    </div>
  );
};
const Square = ({ piece, row, col, movePiece, isKingSquare, selectedPiece, setSelectedPiece, currentTurn, board, validMoves }) => {
  const isDark = (row + col) % 2 === 1;
  const isSelected = selectedPiece && selectedPiece.row === row && selectedPiece.col === col;
  const isValidMoveSquare = validMoves.some((move) => move.row === row && move.col === col);
  const isCaptureMove = isValidMoveSquare && board[row][col];

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PIECE,
    item: { row, col, piece },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.PIECE,
    drop: (item) => movePiece(item.row, item.col, row, col),
  }));

  const handleClick = () => {
    if (selectedPiece) {
      if (isValidMoveSquare) {
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
        ${isKingSquare ? "bg-red-500 animate-pulse" : ""}
        ${isSelected ? "border-4 border-yellow-500" : ""}
        ${isValidMoveSquare ? "border-4 border-green-500" : ""}
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

const Chessboard = ({ isBlack }) => {
  const [board, setBoard] = useState(initialBoardSetup);
  const [moveHistory, setMoveHistory] = useState([]); // 🆕 Lưu lịch sử nước đi
  const [currentTurn, setCurrentTurn] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [isCheckMate, setIsCheckMate] = useState(false);
  const [checkedKing, setCheckedKing] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [gameMessage, setGameMessage] = useState("🎭 New Game Started! White's Turn");

  const resetGame = () => {
    setBoard(initialBoardSetup);
    setMoveHistory([]); // 🆕 Reset lịch sử nước đi
    setCurrentTurn(true);
    setIsCheck(false);
    setIsCheckMate(false);
    setCheckedKing(null);
    setSelectedPiece(null);
    setValidMoves([]);
    setGameMessage("🎭 New Game Started! White's Turn");
  };

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      const piece = newBoard[fromRow][fromCol];
  
      // Lấy danh sách nước đi hợp lệ
      const validMoves = getValidMoves(piece, fromRow, fromCol, prevBoard);
      if (!validMoves.some((move) => move.row === toRow && move.col === toCol)) {
        return prevBoard; // Không cho phép đi nước không hợp lệ
      }
  
      newBoard[toRow][toCol] = piece;
      newBoard[fromRow][fromCol] = "";
  
      // 🆕 Kiểm tra trạng thái vua
      const nextTurn = !currentTurn;
      const kingPos = findKingPosition(newBoard, nextTurn);
      const kingCheck = isKingInCheck(newBoard, nextTurn);
      const checkmate = isCheckmate(newBoard, nextTurn);
  
      console.log("King Position:", kingPos);
      console.log("Is Check:", kingCheck);
  
      setCurrentTurn(nextTurn);
      setIsCheck(kingCheck);
      setCheckedKing(kingCheck ? kingPos : null); // Nếu vua bị chiếu thì cập nhật vị trí
      setIsCheckMate(checkmate);
      setSelectedPiece(null);
      setValidMoves([]);
  
      if (checkmate) {
        setGameMessage(`🏆 Checkmate! ${currentTurn ? "Black Wins!" : "White Wins!"}`);
      } else if (kingCheck) {
        setGameMessage(`🔥 ${nextTurn ? "White" : "Black"} King is in check! 🔥`);
      } else {
        setGameMessage(`🎭 Current Turn: ${nextTurn ? "White" : "Black"}`);
      }
  
      // 🆕 Gửi nước đi qua WebSocket
      sendMove({ fromRow, fromCol, toRow, toCol, piece });
  
      return newBoard;
    });
  };
  

  useEffect(() => {
    connectWebSocket((moveData) => {
      setBoard((prevBoard) => {
        if (!prevBoard || !Array.isArray(prevBoard)) return prevBoard;
        
        const newBoard = prevBoard.map(row => row ? [...row] : []);
        if (!newBoard[moveData.toRow]) newBoard[moveData.toRow] = [];
        
        newBoard[moveData.toRow][moveData.toCol] = moveData.piece;
        newBoard[moveData.fromRow][moveData.fromCol] = "";
        return newBoard;
      });
    });
  }, []);
  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-200">
        <h1 className="text-2xl font-bold mb-4">♟️ Chess Game ♟️</h1>
        
        {isCheck && !isCheckMate && checkedKing && (
          <div className="fixed top-5 right-5 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg font-bold animate-pulse">
            🔥 Warning! {currentTurn ? "Black" : "White"} King is in Check! 🔥
          </div>
        )}



        {gameMessage && (
          <div className="mb-2 bg-yellow-300 text-black px-4 py-2 rounded text-center font-bold shadow-md">
            {gameMessage}
          </div>
        )}

        <div className="flex gap-8">
          <div className="grid grid-cols-8 border-4 border-black shadow-lg">
            {board.map((row, rowIndex) =>
              row.map((piece, colIndex) => (
                <Square key={`${rowIndex}-${colIndex}`} piece={piece} row={rowIndex} col={colIndex} movePiece={movePiece} isKingSquare={checkedKing?.row === rowIndex && checkedKing?.col === colIndex} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} currentTurn={currentTurn} board={board} validMoves={selectedPiece ? getValidMoves(selectedPiece.piece, selectedPiece.row, selectedPiece.col, board) : []} />
              ))
            )}
          </div>

          {/* 🆕 Lịch sử nước đi */}
          <div className="w-64 bg-white p-4 rounded-lg shadow-md h-fit">
            <h2 className="text-lg font-semibold mb-2">📜 Move History</h2>
            <ul className="list-decimal pl-5">
              {moveHistory.map((move, index) => <li key={index}>{move}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Chessboard;

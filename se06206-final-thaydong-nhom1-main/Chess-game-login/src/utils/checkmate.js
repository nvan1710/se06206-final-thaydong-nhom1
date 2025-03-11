import { isValidMove } from "./moveRules"; // Import luật di chuyển

// 📍 Tìm vị trí của vua trên bàn cờ
export const findKingPosition = (board, isWhite) => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === (isWhite ? "♔" : "♚")) {
        return { row, col };
      }
    }
  }
  return null;
};

// 📍 Kiểm tra xem vua có bị chiếu không
export const isKingInCheck = (board, isWhite) => {
    const kingPos = findKingPosition(board, isWhite);
    if (!kingPos) return false; // Nếu không tìm thấy vua, không thể bị chiếu
  
    const { row: kingRow, col: kingCol } = kingPos;
  
    console.log(`🔍 Kiểm tra chiếu cho vua ${isWhite ? "trắng" : "đen"} tại (${kingRow}, ${kingCol})`);
  
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (!piece) continue; // Không có quân cờ ở ô này
  
        const isEnemy = "♙♖♘♗♕♚".includes(piece) !== isWhite; // Nếu quân cờ là của đối thủ
        if (isEnemy && isValidMove(piece, row, col, kingRow, kingCol, board)) {
          console.log(`⚠️ Vua đang bị chiếu bởi quân ${piece} từ (${row}, ${col})`);
          return true;
        }
      }
    }
  
    return false;
  };
  
  
  

// 📍 Kiểm tra chiếu hết (Checkmate)
export const isCheckmate = (board, isWhite) => {
    if (!isKingInCheck(board, isWhite)) return false; // Nếu không bị chiếu, không phải chiếu hết.
  
    console.log(`🔎 Kiểm tra chiếu hết cho vua ${isWhite ? "trắng" : "đen"}...`);
  
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (!piece) continue;
  
        const isFriendly = "♙♖♘♗♕♔".includes(piece) === isWhite;
        if (!isFriendly) continue;
  
        for (let newRow = 0; newRow < 8; newRow++) {
          for (let newCol = 0; newCol < 8; newCol++) {
            if (isValidMove(piece, row, col, newRow, newCol, board)) {
              // Sao chép bàn cờ đúng cách
              const newBoard = board.map(innerRow => [...innerRow]);
              newBoard[newRow][newCol] = piece;
              newBoard[row][col] = "";
  
              if (!isKingInCheck(newBoard, isWhite)) {
                console.log(`✅ Tìm thấy một nước thoát tại (${row}, ${col}) → (${newRow}, ${newCol})`);
                return false; // Nếu có nước đi thoát chiếu, không phải chiếu hết
              }
            }
          }
        }
      }
    }
  
    console.log(`🏆 Chiếu hết! Không còn nước nào hợp lệ.`);
    return true; // Không có nước nào hợp lệ → chiếu hết
  };
  
  
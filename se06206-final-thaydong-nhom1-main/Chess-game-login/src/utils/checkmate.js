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

// 📍 Kiểm tra xem quân cờ có phải là quân địch không
const isEnemyPiece = (piece, isWhite) => {
  const whitePieces = ["♙", "♖", "♘", "♗", "♕", "♔"];
  const blackPieces = ["♟", "♜", "♞", "♝", "♛", "♚"];
  return isWhite ? blackPieces.includes(piece) : whitePieces.includes(piece);
};

// 📍 Kiểm tra đường đi có bị cản trở không (áp dụng cho xe, tượng, hậu)
const isPathClear = (board, startRow, startCol, endRow, endCol, piece) => {
  if (["♖", "♜"].includes(piece)) { // Xe
    if (startRow === endRow) {
      let step = startCol < endCol ? 1 : -1;
      for (let c = startCol + step; c !== endCol; c += step) {
        if (board[startRow][c] !== "") return false;
      }
    } else if (startCol === endCol) {
      let step = startRow < endRow ? 1 : -1;
      for (let r = startRow + step; r !== endRow; r += step) {
        if (board[r][startCol] !== "") return false;
      }
    }
  } else if (["♗", "♝", "♕", "♛"].includes(piece)) { // Tượng / Hậu
    let rowStep = startRow < endRow ? 1 : -1;
    let colStep = startCol < endCol ? 1 : -1;
    let r = startRow + rowStep;
    let c = startCol + colStep;
    while (r !== endRow && c !== endCol) {
      if (board[r][c] !== "") return false;
      r += rowStep;
      c += colStep;
    }
  }
  return true; // Không bị cản trở
};

// 📍 Kiểm tra xem vua có bị chiếu không
export const isKingInCheck = (board, isWhite) => {
  const kingPos = findKingPosition(board, isWhite);
  if (!kingPos) return false;

  const { row: kingRow, col: kingCol } = kingPos;
  console.log(`🔍 Kiểm tra chiếu cho vua ${isWhite ? "trắng" : "đen"} tại (${kingRow}, ${kingCol})`);

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (!piece) continue; // Bỏ qua ô trống

      if (isEnemyPiece(piece, isWhite) && isValidMove(piece, row, col, kingRow, kingCol, board)) {
        console.log(`⚠️ Vua ${isWhite ? "trắng" : "đen"} đang bị chiếu bởi quân ${piece} từ (${row}, ${col})`);

        // 🛑 Hiển thị cảnh báo trên màn hình
        alert(`⚠️ CẢNH BÁO! Vua ${isWhite ? "trắng" : "đen"} đang bị chiếu!`);

        return true;
      }
    }
  }
  return false;
};


// 📍 Kiểm tra xem vua có thể thoát chiếu không
const canKingEscape = (board, isWhite) => {
  const kingPos = findKingPosition(board, isWhite);
  if (!kingPos) return false;

  const { row, col } = kingPos;
  const directions = [
    [-1, -1], [-1, 0], [-1, 1], 
    [0, -1],          [0, 1], 
    [1, -1], [1, 0], [1, 1]
  ]; 

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      if (board[newRow][newCol] === "" || isEnemyPiece(board[newRow][newCol], isWhite)) {
        const tempBoard = JSON.parse(JSON.stringify(board));
        tempBoard[newRow][newCol] = tempBoard[row][col];
        tempBoard[row][col] = "";

        if (!isKingInCheck(tempBoard, isWhite)) {
          console.log(`✅ Vua có thể thoát đến (${newRow}, ${newCol})`);
          return true;
        }
      }
    }
  }
  return false;
};

// 📍 Kiểm tra chiếu hết (Checkmate)
export const isCheckmate = (board, isWhite) => {
  if (!isKingInCheck(board, isWhite)) return false;

  console.log(`🔎 Kiểm tra chiếu hết cho vua ${isWhite ? "trắng" : "đen"}...`);

  if (canKingEscape(board, isWhite)) return false;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (!piece) continue;

      const isFriendly = isWhite
        ? ["♙", "♖", "♘", "♗", "♕", "♔"].includes(piece)
        : ["♟", "♜", "♞", "♝", "♛", "♚"].includes(piece);

      if (!isFriendly) continue;

      for (let newRow = 0; newRow < 8; newRow++) {
        for (let newCol = 0; newCol < 8; newCol++) {
          if (isValidMove(piece, row, col, newRow, newCol, board) &&
              isPathClear(board, row, col, newRow, newCol, piece)) {
            
            const newBoard = JSON.parse(JSON.stringify(board));
            newBoard[newRow][newCol] = piece;
            newBoard[row][col] = "";

            if (!isKingInCheck(newBoard, isWhite)) {
              console.log(`✅ Tìm thấy một nước thoát tại (${row}, ${col}) → (${newRow}, ${newCol})`);
              return false;
            }
          }
        }
      }
    }
  }

  console.log(`🏆 Chiếu hết! Không còn nước nào hợp lệ.`);
  return true;
};

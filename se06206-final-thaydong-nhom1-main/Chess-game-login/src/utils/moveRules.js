
let currentTurn = true; // true là Trắng, false là Đen
export const getValidMoves = (piece, row, col, board) => {
  let validMoves = [];

  // Kiểm tra quân cờ là Trắng hay Đen
  const isWhite = "♙♖♘♗♕♔".includes(piece);
  const isOpponent = (targetPiece) => targetPiece && isWhite !== "♙♖♘♗♕♔".includes(targetPiece);

  // Logic di chuyển từng loại quân
  switch (piece) {
    case "♙": // Tốt trắng
      if (row > 0 && !board[row - 1][col]) validMoves.push({ row: row - 1, col }); // Đi thẳng
      if (row === 6 && !board[row - 1][col] && !board[row - 2][col]) validMoves.push({ row: row - 2, col }); // Đi 2 ô từ vị trí ban đầu
      if (col > 0 && isOpponent(board[row - 1][col - 1])) validMoves.push({ row: row - 1, col: col - 1 }); // Ăn chéo trái
      if (col < 7 && isOpponent(board[row - 1][col + 1])) validMoves.push({ row: row - 1, col: col + 1 }); // Ăn chéo phải
      break;

    case "♟": // Tốt đen
      if (row < 7 && !board[row + 1][col]) validMoves.push({ row: row + 1, col });
      if (row === 1 && !board[row + 1][col] && !board[row + 2][col]) validMoves.push({ row: row + 2, col });
      if (col > 0 && isOpponent(board[row + 1][col - 1])) validMoves.push({ row: row + 1, col: col - 1 });
      if (col < 7 && isOpponent(board[row + 1][col + 1])) validMoves.push({ row: row + 1, col: col + 1 });
      break;

    case "♖": // Xe (Rook)
    case "♜":
      addLinearMoves(validMoves, row, col, board, isWhite);
      break;

    case "♘": // Mã (Knight)
    case "♞":
      addKnightMoves(validMoves, row, col, board, isWhite);
      break;

    case "♗": // Tượng (Bishop)
    case "♝":
      addDiagonalMoves(validMoves, row, col, board, isWhite);
      break;

    case "♕": // Hậu (Queen)
    case "♛":
      addLinearMoves(validMoves, row, col, board, isWhite);
      addDiagonalMoves(validMoves, row, col, board, isWhite);
      break;

    case "♔": // Vua (King)
    case "♚":
      addKingMoves(validMoves, row, col, board, isWhite);
      break;

    default:
      break;
  }

  return validMoves;
};


export const isValidMove = (piece, fromRow, fromCol, toRow, toCol, board) => {
  const dx = toCol - fromCol;
  const dy = toRow - fromRow;

  if (fromRow === toRow && fromCol === toCol) return false;

  const isWhite = "♙♖♘♗♕♔".includes(piece);
  if (isWhite !== currentTurn) return false;

  const targetPiece = board[toRow][toCol];

  if (targetPiece && "♙♖♘♗♕♔".includes(targetPiece) === isWhite) return false;

  let validMove = false;
  switch (piece) {
    case "♙": validMove = isValidPawnMove(fromRow, fromCol, toRow, toCol, board, true); break;
    case "♟": validMove = isValidPawnMove(fromRow, fromCol, toRow, toCol, board, false); break;
    case "♖": case "♜": validMove = isValidRookMove(fromRow, fromCol, toRow, toCol, board); break;
    case "♘": case "♞": validMove = isValidKnightMove(dx, dy); break;
    case "♗": case "♝": validMove = isValidBishopMove(fromRow, fromCol, toRow, toCol, board); break;
    case "♕": case "♛": validMove = isValidQueenMove(fromRow, fromCol, toRow, toCol, board); break;
    case "♔": case "♚": validMove = isValidKingMove(dx, dy); break;
    default: return false;
  }

  if (validMove) {
    // Giả lập bàn cờ mới sau nước đi
    const newBoard = board.map((row) => [...row]);
    newBoard[toRow][toCol] = piece;
    newBoard[fromRow][fromCol] = "";

    // Kiểm tra nếu nước đi làm vua bị chiếu => không hợp lệ
    if (isKingInCheck(newBoard, isWhite)) return false;

    currentTurn = !currentTurn; // Đổi lượt
    return true;
  }

  return false;
};





// ✅ Tốt (Pawn) - sửa lại kiểm tra nhảy 2 ô & ăn chéo hợp lệ
const isValidPawnMove = (fromRow, fromCol, toRow, toCol, board, isWhite) => {
  const direction = isWhite ? -1 : 1; // Trắng đi lên (-1), Đen đi xuống (+1)
  const startRow = isWhite ? 6 : 1;
  const dy = toRow - fromRow;
  const dx = Math.abs(toCol - fromCol);
  const targetPiece = board[toRow][toCol];

  // Di chuyển thẳng (không được có quân cờ chặn)
  if (dx === 0 && !targetPiece) {
      if (dy === direction) return true; // Đi 1 ô hợp lệ
      if (fromRow === startRow && dy === 2 * direction && !board[fromRow + direction][toCol]) {
          return true; // Đi 2 ô từ vị trí ban đầu hợp lệ (không nhảy qua quân cờ)
      }
  }

  // Ăn quân chéo (chỉ khi có quân địch ở ô đích)
  if (dx === 1 && dy === direction && targetPiece) {
      return true;
  }

  return false;
};

// ✅ Xe (Rook) - đảm bảo có thể ăn quân đối thủ hợp lệ
const isValidRookMove = (fromRow, fromCol, toRow, toCol, board) => {
  if (fromRow !== toRow && fromCol !== toCol) return false;
  return isPathClear(fromRow, fromCol, toRow, toCol, board);
};

// ✅ Mã (Knight) - không cần sửa (nước đi đã đúng)
const isValidKnightMove = (dx, dy) => {
  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2);
};

// ✅ Tượng (Bishop) - đảm bảo không bị chặn đường đi
const isValidBishopMove = (fromRow, fromCol, toRow, toCol, board) => {
  if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) return false;
  return isPathClear(fromRow, fromCol, toRow, toCol, board);
};

// ✅ Hậu (Queen) - kết hợp Xe & Tượng
const isValidQueenMove = (fromRow, fromCol, toRow, toCol, board) => {
  return (
      isValidRookMove(fromRow, fromCol, toRow, toCol, board) ||
      isValidBishopMove(fromRow, fromCol, toRow, toCol, board)
  );
};

// ✅ Vua (King) - giữ nguyên
const isValidKingMove = (dx, dy) => {
  return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
};

// ✅ Sửa lại kiểm tra đường đi `isPathClear()`
const isPathClear = (fromRow, fromCol, toRow, toCol, board) => {
  const dx = Math.sign(toCol - fromCol);
  const dy = Math.sign(toRow - fromRow);
  let x = fromCol + dx;
  let y = fromRow + dy;

  while (x !== toCol || y !== toRow) {
      if (board[y][x] !== "") return false; // Nếu có quân cờ chặn đường, không hợp lệ
      x += dx;
      y += dy;
  }

  return true;
};
const findKingPosition = (board, isWhite) => {
  const king = isWhite ? "♔" : "♚";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === king) return { row, col };
    }
  }
  return null;
};
const isKingInCheck = (board, isWhite) => {
  const kingPos = findKingPosition(board, isWhite);
  if (!kingPos) return false; // Không tìm thấy vua (tránh lỗi)

  const { row: kingRow, col: kingCol } = kingPos;

  // Duyệt qua toàn bộ bàn cờ để tìm quân đối phương có thể chiếu vua
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (!piece) continue; // Ô trống bỏ qua

      const isEnemy = "♙♖♘♗♕♔".includes(piece) !== isWhite;
      if (isEnemy && isValidMove(piece, row, col, kingRow, kingCol, board)) {
        return true; // Nếu có quân địch có thể đi đến vị trí vua, vua đang bị chiếu
      }
    }
  }

  return false; // Không có quân nào chiếu vua
};


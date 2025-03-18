export const getValidMoves = (piece, row, col, board) => {
  let validMoves = [];
  const isWhite = "♙♖♘♗♕♔".includes(piece); // Xác định màu quân cờ

  switch (piece) {
    case "♙": case "♟": // Tốt
      validMoves = getPawnMoves(row, col, board, isWhite);
      break;
    case "♖": case "♜": // Xe
      validMoves = getRookMoves(row, col, board, isWhite);
      break;
    case "♘": case "♞": // Mã
      validMoves = getKnightMoves(row, col, board, isWhite);
      break;
    case "♗": case "♝": // Tượng
      validMoves = getBishopMoves(row, col, board, isWhite);
      break;
    case "♕": case "♛": // Hậu
      validMoves = [...getRookMoves(row, col, board, isWhite), ...getBishopMoves(row, col, board, isWhite)];
      break;
    case "♔": case "♚": // Vua
      validMoves = getKingMoves(row, col, board, isWhite);
      break;
  }

  return validMoves;
};

// ✅ Kiểm tra quân địch
const isOpponent = (piece, targetPiece) => {
  return targetPiece && ("♙♖♘♗♕♔".includes(piece) !== "♙♖♘♗♕♔".includes(targetPiece));
};

// ✅ Xử lý nước đi của Tốt
const getPawnMoves = (row, col, board, isWhite) => {
  let moves = [];
  const direction = isWhite ? -1 : 1;
  const startRow = isWhite ? 6 : 1;
  const endRow = isWhite ? 0 : 7;

  // Đi thẳng
  if (!board[row + direction][col]) {
    moves.push({ row: row + direction, col, promote: row + direction === endRow });

    // Nếu là nước đi đầu tiên, có thể đi 2 ô
    if (row === startRow && !board[row + 2 * direction][col]) {
      moves.push({ row: row + 2 * direction, col });
    }
  }

  // Ăn chéo
  if (col > 0 && isOpponent(board[row][col], board[row + direction][col - 1])) {
    moves.push({ row: row + direction, col: col - 1, promote: row + direction === endRow });
  }
  if (col < 7 && isOpponent(board[row][col], board[row + direction][col + 1])) {
    moves.push({ row: row + direction, col: col + 1, promote: row + direction === endRow });
  }

  return moves;
};

// ✅ Xử lý di chuyển Xe
const getRookMoves = (row, col, board, isWhite) => {
  return getLinearMoves(row, col, board, [[-1, 0], [1, 0], [0, -1], [0, 1]]);
};

// ✅ Xử lý di chuyển Tượng
const getBishopMoves = (row, col, board, isWhite) => {
  return getLinearMoves(row, col, board, [[-1, -1], [-1, 1], [1, -1], [1, 1]]);
};

// ✅ Xử lý di chuyển Hậu
const getQueenMoves = (row, col, board, isWhite) => {
  return [...getRookMoves(row, col, board, isWhite), ...getBishopMoves(row, col, board, isWhite)];
};

// ✅ Xử lý di chuyển Mã
const getKnightMoves = (row, col, board) => {
  const moves = [];
  const knightMoves = [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]];
  knightMoves.forEach(([dr, dc]) => {
    const r = row + dr, c = col + dc;
    if (r >= 0 && r < 8 && c >= 0 && c < 8 && (!board[r][c] || isOpponent(board[row][col], board[r][c]))) {
      moves.push({ row: r, col: c });
    }
  });
  return moves;
};

// ✅ Xử lý di chuyển Vua (bao gồm kiểm tra nước đi)
const getKingMoves = (row, col, board, isWhite) => {
  const moves = [];
  const kingMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  kingMoves.forEach(([dr, dc]) => {
    const r = row + dr, c = col + dc;
    if (r >= 0 && r < 8 && c >= 0 && c < 8 && (!board[r][c] || isOpponent(board[row][col], board[r][c]))) {
      moves.push({ row: r, col: c });
    }
  });
  return moves;
};

// ✅ Xử lý nước đi theo đường thẳng (Xe, Tượng, Hậu)
const getLinearMoves = (row, col, board, directions) => {
  const moves = [];
  directions.forEach(([dr, dc]) => {
    let r = row + dr, c = col + dc;
    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
      if (!board[r][c]) {
        moves.push({ row: r, col: c });
      } else {
        if (isOpponent(board[row][col], board[r][c])) {
          moves.push({ row: r, col: c });
        }
        break;
      }
      r += dr;
      c += dc;
    }
  });
  return moves;
};

// ✅ Kiểm tra nước đi hợp lệ
export const isValidMove = (piece, fromRow, fromCol, toRow, toCol, board) => {
  const validMoves = getValidMoves(piece, fromRow, fromCol, board);
  return validMoves.some(move => move.row === toRow && move.col === toCol);
};

// ✅ Xử lý phong cấp tốt
export const promotePawn = async (row, col, board, isWhite) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const promotedPiece = window.prompt("Chọn quân để phong cấp: (Q) Hậu, (R) Xe, (B) Tượng, (N) Mã", "Q");
      let newPiece;
      switch (promotedPiece?.toUpperCase()) {
        case "R": newPiece = isWhite ? "♖" : "♜"; break;
        case "B": newPiece = isWhite ? "♗" : "♝"; break;
        case "N": newPiece = isWhite ? "♘" : "♞"; break;
        default: newPiece = isWhite ? "♕" : "♛"; // Mặc định là Hậu
      }
      board[row][col] = newPiece;
      resolve();
    }, 100);
  });
};

// ✅ Xuất các hàm cần thiết
export { getPawnMoves, getRookMoves, getBishopMoves, getKnightMoves, getKingMoves, getLinearMoves };

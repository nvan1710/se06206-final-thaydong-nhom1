let currentTurn = true; // true là Trắng, false là Đen

export const getValidMoves = (piece, row, col, board) => {
  let validMoves = [];

  // Kiểm tra màu quân cờ
  const isWhite = "♙♖♘♗♕♔".includes(piece);

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
    default:
      break;
  }

  return validMoves;
};

// ✅ Xác minh nước đi có hợp lệ không
export const isValidMove = (piece, fromRow, fromCol, toRow, toCol, board) => {
  const validMoves = getValidMoves(piece, fromRow, fromCol, board);
  return validMoves.some(move => move.row === toRow && move.col === toCol);
};

// ✅ Xử lý di chuyển Tốt (Pawn) + Phong cấp
const getPawnMoves = (row, col, board, isWhite) => {
  let moves = [];
  const direction = isWhite ? -1 : 1;
  const startRow = isWhite ? 6 : 1;
  const endRow = isWhite ? 0 : 7;

  // Tiến lên một ô (nếu trống)
  if (row + direction >= 0 && row + direction < 8) {
    if (!board[row + direction][col]) {
      moves.push({ row: row + direction, col, promote: row + direction === endRow });

      // Nếu là nước đi đầu tiên của tốt, có thể đi hai ô
      if (row === startRow && !board[row + 2 * direction][col]) {
        moves.push({ row: row + 2 * direction, col });
      }
    }

    // Ăn chéo (bắt quân đối thủ)
    if (col > 0 && board[row + direction][col - 1] && "♙♖♘♗♕♔".includes(board[row + direction][col - 1]) !== isWhite) {
      moves.push({ row: row + direction, col: col - 1, promote: row + direction === endRow });
    }
    if (col < 7 && board[row + direction][col + 1] && "♙♖♘♗♕♔".includes(board[row + direction][col + 1]) !== isWhite) {
      moves.push({ row: row + direction, col: col + 1, promote: row + direction === endRow });
    }
  }
  return moves;
};


export const promotePawn = async (row, col, board, isWhite) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const promotedPiece = window.prompt(
        "Chọn quân để phong cấp: (Q) Hậu, (R) Xe, (B) Tượng, (N) Mã",
        "Q"
      );

      let newPiece;
      switch (promotedPiece?.toUpperCase()) {
        case "R": newPiece = isWhite ? "♖" : "♜"; break;
        case "B": newPiece = isWhite ? "♗" : "♝"; break;
        case "N": newPiece = isWhite ? "♘" : "♞"; break;
        default: newPiece = isWhite ? "♕" : "♛"; // Mặc định là Hậu
      }

      board[row][col] = newPiece; // Cập nhật bàn cờ
      resolve();
    }, 100); // Chờ một chút để tránh lỗi UI
  });
};


// ✅ Xử lý di chuyển Xe (Rook)
const getRookMoves = (row, col, board, isWhite) => {
  return getLinearMoves(row, col, board, isWhite, [[1, 0], [-1, 0], [0, 1], [0, -1]]);
};

// ✅ Xử lý di chuyển Tượng (Bishop)
const getBishopMoves = (row, col, board, isWhite) => {
  return getLinearMoves(row, col, board, isWhite, [[1, 1], [-1, -1], [1, -1], [-1, 1]]);
};

// ✅ Xử lý di chuyển Mã (Knight)
const getKnightMoves = (row, col, board, isWhite) => {
  let moves = [];
  const knightMoves = [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]];

  knightMoves.forEach(([dx, dy]) => {
    let newRow = row + dx, newCol = col + dy;
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      let target = board[newRow][newCol];
      if (!target || "♙♖♘♗♕♔".includes(target) !== isWhite) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  });

  return moves;
};

// ✅ Xử lý di chuyển Vua (King)
const getKingMoves = (row, col, board, isWhite) => {
  let moves = [];
  const kingMoves = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]];

  kingMoves.forEach(([dx, dy]) => {
    let newRow = row + dx, newCol = col + dy;
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      let target = board[newRow][newCol];
      if (!target || "♙♖♘♗♕♔".includes(target) !== isWhite) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  });

  return moves;
};

// ✅ Xử lý nước đi theo đường thẳng
const getLinearMoves = (row, col, board, isWhite, directions) => {
  let moves = [];

  directions.forEach(([dx, dy]) => {
    let newRow = row + dx, newCol = col + dy;
    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      let target = board[newRow][newCol];
      if (!target) {
        moves.push({ row: newRow, col: newCol });
      } else {
        if ("♙♖♘♗♕♔".includes(target) !== isWhite) {
          moves.push({ row: newRow, col: newCol });
        }
        break;
      }
      newRow += dx;
      newCol += dy;
    }
  });

  return moves;
};

// ✅ Xuất tất cả các hàm cần thiết
export { getPawnMoves, getRookMoves, getBishopMoves, getKnightMoves, getKingMoves, getLinearMoves };

let currentTurn = true; // true là Trắng, false là Đen

export const getValidMoves = (piece, row, col, board) => {
<<<<<<< HEAD
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

  const moves = [];
  const isWhite = "♙♖♘♗♕♔".includes(piece);
  const direction = isWhite ? -1 : 1; // Trắng đi lên (-1), Đen đi xuống (+1)

=======
  const moves = [];
  const isWhite = "♙♖♘♗♕♔".includes(piece);
  const direction = isWhite ? -1 : 1; // Trắng đi lên (-1), Đen đi xuống (+1)

>>>>>>> origin/tien-update-code
  switch (piece) {
    case "♙": // Tốt trắng
    case "♟": // Tốt đen
      if (!board[row + direction][col]) {
        moves.push({ row: row + direction, col });
        if ((isWhite && row === 6) || (!isWhite && row === 1)) {
          if (!board[row + 2 * direction][col]) {
            moves.push({ row: row + 2 * direction, col });
          }
        }
      }
      if (col > 0 && board[row + direction][col - 1] && isOpponent(piece, board[row + direction][col - 1])) {
        moves.push({ row: row + direction, col: col - 1 });
      }
      if (col < 7 && board[row + direction][col + 1] && isOpponent(piece, board[row + direction][col + 1])) {
        moves.push({ row: row + direction, col: col + 1 });
      }
      break;

    case "♖": case "♜": // Xe
      moves.push(...getLinearMoves(row, col, board, [[-1, 0], [1, 0], [0, -1], [0, 1]]));
      break;

    case "♘": case "♞": // Mã
      moves.push(...getKnightMoves(row, col, board));
      break;

    case "♗": case "♝": // Tượng
      moves.push(...getLinearMoves(row, col, board, [[-1, -1], [-1, 1], [1, -1], [1, 1]]));
      break;

    case "♕": case "♛": // Hậu
      moves.push(...getLinearMoves(row, col, board, [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]));
      break;

    case "♔": case "♚": // Vua
      moves.push(...getKingMoves(row, col, board));
<<<<<<< HEAD

=======
>>>>>>> origin/tien-update-code
      break;
  }

  return moves;
};

// Kiểm tra xem có phải quân địch không
const isOpponent = (piece, targetPiece) => {
  return targetPiece && ("♙♖♘♗♕♔".includes(piece) !== "♙♖♘♗♕♔".includes(targetPiece));
};

// Lấy nước đi tuyến tính (dùng cho Xe, Tượng, Hậu)
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

// Lấy nước đi của Mã
const getKnightMoves = (row, col, board) => {
  const moves = [];
  const knightMoves = [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]];
  knightMoves.forEach(([dr, dc]) => {
    const r = row + dr, c = col + dc;
    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
      if (!board[r][c] || isOpponent(board[row][col], board[r][c])) {
        moves.push({ row: r, col: c });
      }
    }
  });
  return moves;
};

// Lấy nước đi của Vua
const getKingMoves = (row, col, board) => {
  const moves = [];
  const kingMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  kingMoves.forEach(([dr, dc]) => {
    const r = row + dr, c = col + dc;
    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
      if (!board[r][c] || isOpponent(board[row][col], board[r][c])) {
        moves.push({ row: r, col: c });
      }
    }
  });
  return moves;
};



// ✅ Xác minh nước đi có hợp lệ không
// Kiểm tra xem có phải quân địch không
const isOpponent = (piece, targetPiece) => {
  return targetPiece && ("♙♖♘♗♕♔".includes(piece) !== "♙♖♘♗♕♔".includes(targetPiece));
};

// Lấy nước đi tuyến tính (dùng cho Xe, Tượng, Hậu)
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

// Lấy nước đi của Mã
const getKnightMoves = (row, col, board) => {
  const moves = [];
  const knightMoves = [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]];
  knightMoves.forEach(([dr, dc]) => {
    const r = row + dr, c = col + dc;
    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
      if (!board[r][c] || isOpponent(board[row][col], board[r][c])) {
        moves.push({ row: r, col: c });
      }
    }
  });
  return moves;
};

// Lấy nước đi của Vua
const getKingMoves = (row, col, board) => {
  const moves = [];
  const kingMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  kingMoves.forEach(([dr, dc]) => {
    const r = row + dr, c = col + dc;
    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
      if (!board[r][c] || isOpponent(board[row][col], board[r][c])) {
        moves.push({ row: r, col: c });
      }
    }
  });
  return moves;
};
}
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

<<<<<<< HEAD
      // Nếu là nước đi đầu tiên của tốt, có thể đi hai ô
      if (row === startRow && !board[row + 2 * direction][col]) {
        moves.push({ row: row + 2 * direction, col });
=======
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
const isKingInCheck = (board, isWhiteTurn) => {
  const kingPos = findKingPosition(board, isWhiteTurn);
  if (!kingPos) return false; // Nếu không tìm thấy vua, trả về false

  // Kiểm tra xem có quân đối phương nào có thể tấn công vua không
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && "♙♖♘♗♕♔".includes(piece) !== isWhiteTurn) {
        const validMoves = getValidMoves(piece, row, col, board);
        if (validMoves.some(move => move.row === kingPos.row && move.col === kingPos.col)) {
          return true;
        }
>>>>>>> origin/tien-update-code
      }
    }

<<<<<<< HEAD
    // Ăn chéo (bắt quân đối thủ)
    if (col > 0 && board[row + direction][col - 1] && "♙♖♘♗♕♔".includes(board[row + direction][col - 1]) !== isWhite) {
      moves.push({ row: row + direction, col: col - 1, promote: row + direction === endRow });
    }
    if (col < 7 && board[row + direction][col + 1] && "♙♖♘♗♕♔".includes(board[row + direction][col + 1]) !== isWhite) {
      moves.push({ row: row + direction, col: col + 1, promote: row + direction === endRow });
    }
  }
  return moves;
=======
  return false;
};
// Kiểm tra xem vua có thể thoát chiếu hay không
const canKingEscape = (board, isWhite) => {
  const kingPos = findKingPosition(board, isWhite);
  if (!kingPos) return false;

  const kingMoves = getKingMoves(kingPos.row, kingPos.col, board);
  return kingMoves.some(move => {
      const newBoard = board.map(row => [...row]);
      newBoard[move.row][move.col] = isWhite ? "♔" : "♚";
      newBoard[kingPos.row][kingPos.col] = "";
      return !isKingInCheck(newBoard, isWhite);
  });
};

// Kiểm tra nếu có quân nào có thể chặn hoặc ăn quân đang chiếu vua
const canBlockOrCapture = (board, isWhite) => {
  const kingPos = findKingPosition(board, isWhite);
  if (!kingPos) return false;

  let attackers = [];
  // Xác định tất cả quân cờ đang chiếu vua
  for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
          const piece = board[row][col];
          if (piece && "♙♖♘♗♕♔".includes(piece) !== isWhite) {
              const moves = getValidMoves(piece, row, col, board);
              if (moves.some(move => move.row === kingPos.row && move.col === kingPos.col)) {
                  attackers.push({ row, col });
              }
          }
      }
  }

  // Nếu có nhiều hơn 1 quân chiếu, không thể chặn => Checkmate
  if (attackers.length > 1) return false;

  // Nếu chỉ có 1 quân chiếu, kiểm tra có thể ăn hoặc chặn không
  const attacker = attackers[0];
  for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
          const piece = board[row][col];
          if (piece && "♙♖♘♗♕♔".includes(piece) === isWhite) {
              const moves = getValidMoves(piece, row, col, board);
              if (moves.some(move => move.row === attacker.row && move.col === attacker.col)) {
                  return true; // Có thể ăn quân đang chiếu
              }
          }
      }
  }

  return false;
>>>>>>> origin/tien-update-code
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

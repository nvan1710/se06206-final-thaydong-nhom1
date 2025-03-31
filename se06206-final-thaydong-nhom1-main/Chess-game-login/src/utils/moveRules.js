let currentTurn = true; // true là Trắng, false là Đen
export const getValidMoves = (piece, row, col, board) => {
  const moves = [];
  const isWhite = "♙♖♘♗♕♔".includes(piece);
  const direction = isWhite ? -1 : 1; // Trắng đi lên (-1), Đen đi xuống (+1)

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

// ✅ Sửa lại kiểm tra đường đi isPathClear()
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
      }
    }
  }

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
};

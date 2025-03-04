export const isValidMove = (piece, fromRow, fromCol, toRow, toCol, board, turn, lastMove) => {
  console.log(`Move check: ${piece} from (${fromRow},${fromCol}) to (${toRow},${toCol}), Turn: ${turn}`);

  if (fromRow === toRow && fromCol === toCol) return false;

  const isWhite = "♙♖♘♗♕♔".includes(piece);
  if ((turn === "white" && !isWhite) || (turn === "black" && isWhite)) return false;

  const targetPiece = board[toRow][toCol];
  const isTargetWhite = targetPiece && "♙♖♘♗♕♔".includes(targetPiece);

  if (targetPiece && isWhite === isTargetWhite) return false;

  switch (piece) {
    case "♙": return isValidPawnMove(fromRow, fromCol, toRow, toCol, board, true, lastMove);
    case "♟": return isValidPawnMove(fromRow, fromCol, toRow, toCol, board, false, lastMove);
    case "♖": case "♜": return isValidRookMove(fromRow, fromCol, toRow, toCol, board);
    case "♘": case "♞": return isValidKnightMove(toCol - fromCol, toRow - fromRow);
    case "♗": case "♝": return isValidBishopMove(fromRow, fromCol, toRow, toCol, board);
    case "♕": case "♛": return isValidQueenMove(fromRow, fromCol, toRow, toCol, board);
    case "♔": case "♚": return isValidKingMove(fromRow, fromCol, toRow, toCol, board);
    default: return false;
  }
};

// 🏇 Knight move
const isValidKnightMove = (dx, dy) => {
  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2);
};

// 🏰 Rook move (straight lines)
const isValidRookMove = (fromRow, fromCol, toRow, toCol, board) => {
  if (fromRow !== toRow && fromCol !== toCol) return false;
  return isPathClear(fromRow, fromCol, toRow, toCol, board);
};

// 🏹 Bishop move (diagonal)
const isValidBishopMove = (fromRow, fromCol, toRow, toCol, board) => {
  if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) return false;
  return isPathClear(fromRow, fromCol, toRow, toCol, board);
};

// 👑 Queen move (Rook + Bishop combined)
const isValidQueenMove = (fromRow, fromCol, toRow, toCol, board) => {
  return isValidRookMove(fromRow, fromCol, toRow, toCol, board) || isValidBishopMove(fromRow, fromCol, toRow, toCol, board);
};

// ⚔ King move (1 square + Castling)
const isValidKingMove = (fromRow, fromCol, toRow, toCol, board) => {
  if (Math.abs(fromCol - toCol) <= 1 && Math.abs(fromRow - toRow) <= 1) return true; // Normal King move
  return isValidCastling(fromRow, fromCol, toRow, toCol, board); // Castling check
};

// 🏇 Pawn move (En Passant + Promotion)
const isValidPawnMove = (fromRow, fromCol, toRow, toCol, board, isWhite, lastMove) => {
  const direction = isWhite ? -1 : 1;
  const startRow = isWhite ? 6 : 1;
  const promotionRow = isWhite ? 0 : 7;
  const dy = toRow - fromRow;
  const dx = Math.abs(toCol - fromCol);

  // Normal forward move
  if (dx === 0) {
    if (dy === direction && !board[toRow][toCol]) {
      return toRow === promotionRow ? "promotion" : true;
    }
    if (fromRow === startRow && dy === 2 * direction && !board[toRow][toCol] && !board[fromRow + direction][fromCol]) return true;
  }

  // Capture move
  if (dx === 1 && dy === direction && board[toRow][toCol]) return true;

  // En Passant
  if (dx === 1 && dy === direction && lastMove?.piece.toLowerCase() === "♙" && Math.abs(lastMove.fromRow - lastMove.toRow) === 2) {
    if (lastMove.toRow === fromRow && lastMove.toCol === toCol) return "en passant";
  }

  return false;
};

// 🏰 Castling
const isValidCastling = (fromRow, fromCol, toRow, toCol, board) => {
  if (Math.abs(fromCol - toCol) !== 2 || fromRow !== toRow) return false;
  const king = board[fromRow][fromCol];
  const rookCol = toCol > fromCol ? 7 : 0;
  const rook = board[fromRow][rookCol];

  if (king !== "♔" && king !== "♚") return false;
  if (rook !== "♖" && rook !== "♜") return false;
  if (!isPathClear(fromRow, fromCol, fromRow, rookCol, board)) return false;

  return true;
};

// 📏 Check if path is clear
const isPathClear = (fromRow, fromCol, toRow, toCol, board) => {
  const dx = Math.sign(toCol - fromCol);
  const dy = Math.sign(toRow - fromRow);
  let x = fromCol + dx;
  let y = fromRow + dy;

  while (x !== toCol || y !== toRow) {
    if (board[y][x]) return false;
    x += dx;
    y += dy;
  }
  return true;
};

// 🔎 Check detection
export const isKingInCheck = (turn, board) => {
  let kingPos = null;
  board.forEach((row, rIdx) =>
    row.forEach((piece, cIdx) => {
      if ((turn === "white" && piece === "♔") || (turn === "black" && piece === "♚")) {
        kingPos = { row: rIdx, col: cIdx };
      }
    })
  );

  return board.some((row, rIdx) =>
    row.some((piece, cIdx) => {
      if (piece && ((turn === "white" && "♟♜♞♝♛♚".includes(piece)) || (turn === "black" && "♙♖♘♗♕♔".includes(piece)))) {
        return isValidMove(piece, rIdx, cIdx, kingPos.row, kingPos.col, board, turn);
      }
      return false;
    })
  );
};

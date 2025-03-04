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
    case "♘": case "♞": return isValidKnightMove(fromRow, fromCol, toRow, toCol);
    case "♗": case "♝": return isValidBishopMove(fromRow, fromCol, toRow, toCol, board);
    case "♕": case "♛": return isValidQueenMove(fromRow, fromCol, toRow, toCol, board);
    case "♔": case "♚": return isValidKingMove(fromRow, fromCol, toRow, toCol, board);
    default: return false;
  }
};

export const isKingInCheck = (turn, board) => {
  let kingPos = null;
  board.forEach((row, rIdx) =>
    row.forEach((piece, cIdx) => {
      if ((turn === "white" && piece === "♔") || (turn === "black" && piece === "♚")) {
        kingPos = { row: rIdx, col: cIdx };
      }
    })
  );

  if (!kingPos) return false;

  return board.some((row, rIdx) =>
    row.some((piece, cIdx) => {
      if (piece && ((turn === "white" && "♟♜♞♝♛♚".includes(piece)) || (turn === "black" && "♙♖♘♗♕♔".includes(piece)))) {
        return isValidMove(piece, rIdx, cIdx, kingPos.row, kingPos.col, board, turn);
      }
      return false;
    })
  );
};

const isValidKingMove = (fromRow, fromCol, toRow, toCol, board) => {
  if (Math.abs(toCol - fromCol) <= 1 && Math.abs(toRow - fromRow) <= 1) return true;
  return isValidCastling(fromRow, fromCol, toRow, toCol, board);
};

const isValidCastling = (fromRow, fromCol, toRow, toCol, board) => {
  if (Math.abs(fromCol - toCol) !== 2 || fromRow !== toRow) return false;

  const king = board[fromRow][fromCol];
  const rookCol = toCol > fromCol ? 7 : 0;
  const rook = board[fromRow][rookCol];

  if (king !== "♔" && king !== "♚") return false;
  if (rook !== "♖" && rook !== "♜") return false;
  if (!isPathClear(fromRow, fromCol, fromRow, rookCol, board)) return false;

  // Perform castling by swapping the king and rook positions
  const newRookCol = toCol > fromCol ? toCol - 1 : toCol + 1;
  board[fromRow][rookCol] = null;
  board[fromRow][newRookCol] = rook;

  return true;
};

const isValidKnightMove = (fromRow, fromCol, toRow, toCol) => {
  return (Math.abs(toCol - fromCol) === 2 && Math.abs(toRow - fromRow) === 1) ||
         (Math.abs(toCol - fromCol) === 1 && Math.abs(toRow - fromRow) === 2);
};

const isValidBishopMove = (fromRow, fromCol, toRow, toCol, board) => {
  if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) return false;
  return isPathClear(fromRow, fromCol, toRow, toCol, board);
};

const isValidRookMove = (fromRow, fromCol, toRow, toCol, board) => {
  if (fromRow !== toRow && fromCol !== toCol) return false;
  return isPathClear(fromRow, fromCol, toRow, toCol, board);
};

const isValidQueenMove = (fromRow, fromCol, toRow, toCol, board) => {
  return isValidRookMove(fromRow, fromCol, toRow, toCol, board) || isValidBishopMove(fromRow, fromCol, toRow, toCol, board);
};

const isValidPawnMove = (fromRow, fromCol, toRow, toCol, board, isWhite, lastMove) => {
  const direction = isWhite ? -1 : 1;
  const startRow = isWhite ? 6 : 1;
  const promotionRow = isWhite ? 0 : 7;
  const dy = toRow - fromRow;
  const dx = Math.abs(toCol - fromCol);

  if (dx === 0) {
    if (dy === direction && !board[toRow][toCol]) {
      if (toRow === promotionRow) return "promotion";
      return true;
    }
    if (fromRow === startRow && dy === 2 * direction && !board[toRow][toCol] && !board[fromRow + direction][fromCol]) {
      return true;
    }
  }
  if (dx === 1 && dy === direction && board[toRow][toCol]) return true;
  return false;
};

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

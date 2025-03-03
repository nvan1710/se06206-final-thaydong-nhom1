export const isValidMove = (piece, fromRow, fromCol, toRow, toCol, board) => {
  const dx = toCol - fromCol;
  const dy = toRow - fromRow;

  if (fromRow === toRow && fromCol === toCol) return false;

  const isWhite = "♙♖♘♗♕♔".includes(piece);
  const targetPiece = board[toRow][toCol];
  const isTargetWhite = targetPiece && "♙♖♘♗♕♔".includes(targetPiece);

  if (targetPiece && isWhite === isTargetWhite) return false;

  switch (piece) {
    case "♙": return isValidPawnMove(fromRow, fromCol, toRow, toCol, board, true);
    case "♟": return isValidPawnMove(fromRow, fromCol, toRow, toCol, board, false);
    case "♖": case "♜": return isValidRookMove(fromRow, fromCol, toRow, toCol, board);
    case "♘": case "♞": return isValidKnightMove(dx, dy);
    case "♗": case "♝": return isValidBishopMove(fromRow, fromCol, toRow, toCol, board);
    case "♕": case "♛": return isValidQueenMove(fromRow, fromCol, toRow, toCol, board);
    case "♔": case "♚": return isValidKingMove(dx, dy);
    default: return false;
  }
};

const isValidPawnMove = (fromRow, fromCol, toRow, toCol, board, isWhite) => {
  const direction = isWhite ? -1 : 1;
  const startRow = isWhite ? 6 : 1;
  const dy = toRow - fromRow;
  const dx = Math.abs(toCol - fromCol);

  if (dx === 0) {
    if (dy === direction && !board[toRow][toCol]) return true;
    if (fromRow === startRow && dy === 2 * direction && !board[toRow][toCol] && !board[fromRow + direction][fromCol]) return true;
  }

  if (dx === 1 && dy === direction && board[toRow][toCol]) return true;

  return false;
};

const isValidRookMove = (fromRow, fromCol, toRow, toCol, board) => {
  if (fromRow !== toRow && fromCol !== toCol) return false;
  return isPathClear(fromRow, fromCol, toRow, toCol, board);
};

const isValidKnightMove = (dx, dy) => {
  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2);
};

const isValidBishopMove = (fromRow, fromCol, toRow, toCol, board) => {
  if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) return false;
  return isPathClear(fromRow, fromCol, toRow, toCol, board);
};

const isValidQueenMove = (fromRow, fromCol, toRow, toCol, board) => {
  return isValidRookMove(fromRow, fromCol, toRow, toCol, board) || isValidBishopMove(fromRow, fromCol, toRow, toCol, board);
};

const isValidKingMove = (dx, dy) => {
  return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
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

const movePiece = (fromRow, fromCol, toRow, toCol) => {
  setBoard((prevBoard) => {
    const newBoard = prevBoard.map((row) => [...row]);
    const piece = newBoard[fromRow][fromCol];
    const targetPiece = newBoard[toRow][toCol];

    if (isValidMove(piece, fromRow, fromCol, toRow, toCol, newBoard)) {
      newBoard[toRow][toCol] = piece;
      newBoard[fromRow][fromCol] = "";

      setMoveHistory((prevHistory) => [
        ...prevHistory,
        targetPiece
          ? `${piece} ${convertToChessNotation(fromRow, fromCol)} captures ${targetPiece} at ${convertToChessNotation(toRow, toCol)}`
          : `${piece} ${convertToChessNotation(fromRow, fromCol)} → ${convertToChessNotation(toRow, toCol)}`,
      ]);

      return newBoard;
    }
    return prevBoard;
  });
};

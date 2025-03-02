export const isValidMove = (piece, fromRow, fromCol, toRow, toCol, board) => {
    const dx = toCol - fromCol;
    const dy = toRow - fromRow;
  
    // Prevent moving to the same position
    if (fromRow === toRow && fromCol === toCol) return false;
  
    // Get the piece color
    const isWhite = piece === piece.toUpperCase(); // White pieces are uppercase
    const targetPiece = board[toRow][toCol];
  
    // Prevent capturing same-color pieces
    if (targetPiece && (isWhite === (targetPiece === targetPiece.toUpperCase()))) {
      return false;
    }
  
    switch (piece.toLowerCase()) {
      case "♙": // White Pawn
        return isValidPawnMove(fromRow, fromCol, toRow, toCol, board, true);
      case "♟": // Black Pawn
        return isValidPawnMove(fromRow, fromCol, toRow, toCol, board, false);
      case "♖": case "♜": // Rook
        return isValidRookMove(fromRow, fromCol, toRow, toCol, board);
      case "♘": case "♞": // Knight
        return isValidKnightMove(dx, dy);
      case "♗": case "♝": // Bishop
        return isValidBishopMove(fromRow, fromCol, toRow, toCol, board);
      case "♕": case "♛": // Queen
        return isValidQueenMove(fromRow, fromCol, toRow, toCol, board);
      case "♔": case "♚": // King
        return isValidKingMove(dx, dy);
      default:
        return false;
    }
  };
  
  // Pawn movement
  const isValidPawnMove = (fromRow, fromCol, toRow, toCol, board, isWhite) => {
    const direction = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;
    const dy = toRow - fromRow;
    const dx = Math.abs(toCol - fromCol);
  
    if (dx === 0) {
      // Move forward one square
      if (dy === direction && !board[toRow][toCol]) return true;
      // Move forward two squares from starting position
      if (fromRow === startRow && dy === 2 * direction && !board[toRow][toCol]) return true;
    }
  
    // Capture diagonally
    if (dx === 1 && dy === direction && board[toRow][toCol]) return true;
  
    return false;
  };
  
  // Rook movement
  const isValidRookMove = (fromRow, fromCol, toRow, toCol, board) => {
    if (fromRow !== toRow && fromCol !== toCol) return false;
    return isPathClear(fromRow, fromCol, toRow, toCol, board);
  };
  
  // Knight movement
  const isValidKnightMove = (dx, dy) => {
    return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2);
  };
  
  // Bishop movement
  const isValidBishopMove = (fromRow, fromCol, toRow, toCol, board) => {
    if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) return false;
    return isPathClear(fromRow, fromCol, toRow, toCol, board);
  };
  
  // Queen movement (combines rook and bishop)
  const isValidQueenMove = (fromRow, fromCol, toRow, toCol, board) => {
    return (
      isValidRookMove(fromRow, fromCol, toRow, toCol, board) ||
      isValidBishopMove(fromRow, fromCol, toRow, toCol, board)
    );
  };
  
  // King movement
  const isValidKingMove = (dx, dy) => {
    return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
  };
  
  // Checks if the path is clear (for Rook, Bishop, and Queen)
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
  
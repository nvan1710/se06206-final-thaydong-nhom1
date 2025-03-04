import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = { PIECE: "piece" };

const Square = ({ piece, row, col, movePiece }) => {
  const isWhitePiece = "♙♖♘♗♕♔".includes(piece);
const isBlackPiece = "♟♜♞♝♛♚".includes(piece); // Identify black pieces properly

const [{ isDragging }, drag] = useDrag(() => ({
  type: ItemTypes.PIECE,
  item: { row, col, piece },
  canDrag: (turn === "white" && isWhitePiece) || (turn === "black" && isBlackPiece), // Now allows black pieces to move on black's turn
  collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
}));
  
  

  const [, dropRef] = useDrop(() => ({
    accept: ItemTypes.PIECE,
    drop: (item) => {
      movePiece(item.row, item.col, row, col);
    },
  }));

  return (
    <div
      ref={dropRef}
      className={`w-16 h-16 flex justify-center items-center text-2xl font-bold
        ${isDark ? "bg-[#9A6553]" : "bg-[#D5B793]"}`}
    >
{piece && (
  <img
    ref={drag}
    src={pieceImages[piece]}
    alt={piece}
    className={`w-12 h-12 cursor-pointer transition-transform ${isDragging ? "opacity-50 scale-90" : "hover:scale-110"}`}
  />
)}

    </div>
  );
};

export default Square;

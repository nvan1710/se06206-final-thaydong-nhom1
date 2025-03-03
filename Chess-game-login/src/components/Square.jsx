import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = { PIECE: "piece" };

const Square = ({ piece, row, col, movePiece }) => {
  const isDark = (row + col) % 2 === 1;
  const pieceColor = "♙♖♘♗♕♔".includes(piece) ? "text-white" : "text-brown-700";

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.PIECE,
    item: { row, col, piece },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
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
        <span
          ref={dragRef}
          className={`${pieceColor} ${isDragging ? "opacity-50" : "cursor-grab"}`}
        >
          {piece}
        </span>
      )}
    </div>
  );
};

export default Square;

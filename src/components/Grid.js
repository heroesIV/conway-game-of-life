import React, { useState } from "react";
import produce from "immer";

function Grid({ grid, setGrid, numCols, numRows, generations }) {
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const handleMouseDown = (i, j) => {
    const newGrid = produce(grid, (gridCopy) => {
      gridCopy[i][j] = !gridCopy[i][j];
    });
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (i, j) => {
    if (!mouseIsPressed) return;
    const newGrid = produce(grid, (gridCopy) => {
      gridCopy[i][j] = !gridCopy[i][j];
    });
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  return (
    <>
      <div
        className="grid"
        style={{
          width: 900,
          gridTemplateColumns: `repeat(${numCols}, 15px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              className="box"
              style={{
                backgroundColor: grid[i][j] ? "#ef233c" : "#000",
              }}
              onMouseDown={() => handleMouseDown(i, j)}
              onMouseEnter={() => handleMouseEnter(i, j)}
              onMouseUp={() => handleMouseUp()}
            />
          ))
        )}
      </div>
      <h4>{generations} Generations</h4>
    </>
  );
}

export default Grid;

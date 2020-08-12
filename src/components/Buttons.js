import React, { useRef, useState, useEffect } from "react";
import produce from "immer";
import Button from "react-bootstrap/Button";

const speed = 150;

function Buttons({
  grid,
  setGrid,
  numCols,
  numRows,
  generations,
  setGenerations,
}) {
  const handleClick = (event) => {
    const { name } = event.target;
    const newGrid = produce(grid, (gridCopy) => {
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          if (name === "seed") {
            if (Math.floor(Math.random() * 4) === 1) {
              gridCopy[i][j] = true;
            }
          }
          if (name === "clear") {
            gridCopy[i][j] = false;
          }
        }
      }
    });
    setGrid(newGrid);
    if (name === "clear") {
      setGenerations(0);
    }
  };

  let intervalId;

  const [running, setRunning] = useState(false);

  const playButton = () => {
    // clearInterval(intervalId);
    intervalId = setInterval(play, speed);
  };

  useEffect(() => {
    playButton();
  }, []);

  const pauseButton = () => {
    setRunning(!running);
  };

  const runningRef = useRef(running);
  runningRef.current = running;

  const gridRef = useRef(grid);
  gridRef.current = grid;
  const play = () => {
    if (!runningRef.current) return;
    const newGrid = produce(gridRef.current, (gridCopy) => {
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          let neighbours = 0;

          if (i > 0) if (gridRef.current[i - 1][j]) neighbours++;
          if (i > 0 && j > 0) if (gridRef.current[i - 1][j - 1]) neighbours++;
          if (i > 0 && j < numCols - 1)
            if (gridRef.current[i - 1][j + 1]) neighbours++;
          if (j < numCols - 1) if (gridRef.current[i][j + 1]) neighbours++;
          if (j > 0) if (gridRef.current[i][j - 1]) neighbours++;
          if (i < numRows - 1) if (gridRef.current[i + 1][j]) neighbours++;
          if (i < numRows - 1 && j > 0)
            if (gridRef.current[i + 1][j - 1]) neighbours++;
          if (i < numRows - 1 && j < numCols - 1)
            if (gridRef.current[i + 1][j + 1]) neighbours++;
          if (gridRef.current[i][j] && (neighbours < 2 || neighbours > 3))
            gridCopy[i][j] = false;
          if (!gridRef.current[i][j] && neighbours === 3) gridCopy[i][j] = true;
        }
      }
    });
    setGrid(newGrid);
    setGenerations((prev) => prev + 1);
  };

  return (
    <div className="buttons">
      <Button
        variant="outline-secondary"
        name="seed"
        size="sm"
        onClick={handleClick}
        style={{
          borderRadius: "30px",
          fontWeight: "bold",
          letterSpacing: "3px",
          height: "30px",
        }}
      >
        SEED
      </Button>
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={pauseButton}
        style={{
          borderRadius: "30px",
          fontWeight: "bold",
          letterSpacing: "3px",
          height: "30px",
        }}
      >
        {running ? "PAUSE" : "PLAY"}
      </Button>
      <Button
        variant="outline-secondary"
        size="sm"
        name="clear"
        onClick={handleClick}
        style={{
          borderRadius: "30px",
          fontWeight: "bold",
          letterSpacing: "3px",
          height: "30px",
        }}
      >
        CLEAR
      </Button>
    </div>
  );
}

export default Buttons;

import React, { useState } from "react";
import Header from "./components/Header";
import Grid from "./components/Grid";
import Buttons from "./components/Buttons";

function App() {
  const numRows = 30;
  const numCols = 60;

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => false));
    }
    return rows;
  });

  const [generations, setGenerations] = useState(0);

  return (
    <div>
      <Header />
      <Buttons
        grid={grid}
        setGrid={setGrid}
        numRows={numRows}
        numCols={numCols}
        generations={generations}
        setGenerations={setGenerations}
      />
      <Grid
        grid={grid}
        setGrid={setGrid}
        numRows={numRows}
        numCols={numCols}
        generations={generations}
      />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { getRandomNum, generateColors } from "./color-generator";
import "./main.css";

function App() {
  const [difficulty, setDifficulty] = useState(6),
        [colorsArray, setColors] = useState(generateColors(6)),
        [secretColor, setSecret] = useState(colorsArray[getRandomNum(6)]),
        [gameState, setGameState] = useState('start');

  useEffect(() => {
    setColors(generateColors(difficulty));
    setSecret(colorsArray[getRandomNum(difficulty)])
  }, [difficulty]); //Change to useReducer 

  const tiles = colorsArray.map((color, i) => {
    return (
      <div
      key={i}
      className="tile"
      style={{
        background: color,
      }}
    ></div>
    )
  });

  return (
    <>
      <h1>the color game</h1>
      <h2 className="color"> {secretColor} </h2>
      <h2>is your color for this round</h2>

      <button onClick={() => setDifficulty(6)}>EASY</button>
      <button onClick={() => setDifficulty(9)}>HARD</button>

      <div className="container">
        {tiles}
      </div>
    </>
  );
}

export default App;

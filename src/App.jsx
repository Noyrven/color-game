import React, { useReducer, useState } from "react";
import { getRandomNum, generateColors } from "./color-generator";
import "./main.css";

function App() {
  const [difficulty, setDifficulty] = useState(6),
        [colorsArray, setColors] = useState(generateColors(6)),
        [secretColor, setSecret] = useState(colorsArray[getRandomNum(5)]),
        [gameState, setGameState] = useState("start");

  const checkMatch = e => {
    const tile = e.target.style;
    if (secretColor === tile.background) {
      setGameState("won");
      setColors(Array.from(new Array(difficulty), () => secretColor));
    } else {
      setGameState("wrong");
      tile.background = "#131313";
      tile.boxShadow = "none";
      tile.webkitBoxShadow = "none";
      tile.cursor = "default";
    }
  };

  const reducer = () => setSecret(colorsArray[getRandomNum(difficulty - 1)]);
  const [, dispatch] = useReducer(reducer, colorsArray);

  const newGame = () => {
    setGameState("start");
    setColors(generateColors(difficulty));
    dispatch();
  };

  const tiles = colorsArray.map((color, i) => {
    return (
      <div
        key={i}
        className="tile"
        onClick={checkMatch}
        style={{
          background: color,
          cursor: gameState !== "won" ? "pointer" : "default",
          boxShadow: "0px 0px 13px 0px " + color,
          webkitBoxShadow: "0px 0px 13px 0px " + color,
        }}
      ></div>
    );
  });

  return (
    <>
    <h1>the color game</h1>
    <h2 className="color"> {secretColor} </h2>
    <h2>is your color for this round</h2>

    <div>
      <span>game mode: </span>
      <button onClick={() => { setDifficulty(6); setGameState('start') }}>easy</button>
      <button onClick={() => { setDifficulty(9); setGameState('start') }}>hard</button>
      <button onClick={() => newGame()}>new round</button>
    </div>

    <div className="container">{tiles}</div>
  </>
  )
}

export default App;

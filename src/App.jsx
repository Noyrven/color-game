import React, { useEffect, useState } from "react";
import { getRandomNum, generateColors } from "./color-generator";
import "./main.css";

function App() {
  const [difficulty, setDifficulty] = useState(6),
    [colorsArray, setColors] = useState(generateColors(6)),
    [secretColor, setSecret] = useState(colorsArray[getRandomNum(5)]),
    [gameState, setGameState] = useState("start");

  //Change to useReducer
  // useEffect(() => {
  //   setColors(generateColors(difficulty));
  // }, [difficulty]);
  // useEffect(() => {
  //   setSecret(colorsArray[getRandomNum(difficulty - 1)]);
  // }, [colorsArray]);
  ///

  const checkMatch = e => {
    const tile = e.target.style
    if (secretColor === tile.background) {
      setGameState("won");
      setColors(Array.from(new Array(difficulty), () => secretColor));
    } else {
      setGameState("wrong");
      tile.background = "#131313";
      tile.cursor = "default"
    }
  };

  const newGame = () => {
    setGameState('start');
    setColors(generateColors(difficulty));
    setSecret(colorsArray[getRandomNum(difficulty - 1)]);
  }

  const tiles = colorsArray.map((color, i) => {
    return (
      <div
        key={i}
        className="tile"
        style={{ background: color, cursor: gameState !== 'won' ? 'pointer' : 'default' }}
        onClick={checkMatch}
      ></div>
    )
  });

  return (
    <>
      <h1>the color game</h1>
      <h2 className="color"> {secretColor} </h2>
      <h2>is your color for this round</h2>

      <div>
        <button onClick={() => { setDifficulty(6); setGameState('start') }}>EASY</button>
        <button onClick={() => { setDifficulty(9); setGameState('start') }}>HARD</button>
        <button onClick={() => newGame()}>NEW ROUND</button>
      </div>

      <div className="container">{tiles}</div>
    </>
  )
}

export default App;

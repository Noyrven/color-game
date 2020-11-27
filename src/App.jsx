import React, { useReducer, useState } from "react";
import { getRandomNum, generateColors } from "./color-generator";
import "./main.css";

function App() {
  const [difficulty, setDifficulty] = useState(6),
        [colorsArray, setColors] = useState(generateColors(6)),
        [secretColor, setSecret] = useState(colorsArray[getRandomNum(5)]),
        [gameState, setGameState] = useState("start"),
        [isEasy, setEasy] = useState(true),
        [isHard, setHard] = useState(false);

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

  const clickHandler = num => {
    setDifficulty(num);
    setGameState("start");
    setEasy(!isEasy);
    setHard(!isHard)
  }

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
      <div className="title" style={{background: gameState==="won"? secretColor : ''}}>
        <h1>the color game</h1>
        <h2 className="color"> {secretColor} </h2>
        <h2>is your color for this round</h2>

        <div className="header">
          <span>game mode: </span>
          <span className={`button ${isEasy ? 'selected' : ''}`} onClick={() => clickHandler(6)}>easy</span>
          <span className={`button ${isHard ? 'selected' : ''}`} onClick={() => clickHandler(9)}>hard</span>
          <span className="button new" style={{color: gameState==="won"? secretColor :'#131313' }} onClick={() => newGame()}>new round</span>
        </div>
      </div>

      <div className="container">{tiles}</div>
    </>
  )
}

export default App;

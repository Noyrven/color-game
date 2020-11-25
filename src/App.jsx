import React, { useEffect, useState } from "react";

function App() {
  const [color, setColor] = useState("");
  const [level, setLevel] = useState(6);
  const [colorsArray, setColorsArray] = useState([]);

  useEffect(() => {
    const newArray = [];
    for (let i = 1; i <= level; i++) {
      newArray.push(
        `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
      )
    };
    setColorsArray(newArray);
  }, [level]);


  useEffect(() => {
    setColor(colorsArray[Math.floor(Math.random() * (colorsArray.length - 1))])
  }, [colorsArray]);

  const styles = {
    width: 100,
    height: 100,
  }


  return (
    <>
      <h1>the color game</h1>
      <h2> {color} </h2>
      <h2>is your color for this round</h2>

      <div>
        {colorsArray.map(tilecolor =>
          <div style={{ ...styles, backgroundColor: tilecolor }}></div>
        )}
      </div>

      <button onClick={() => { setLevel(6) }}>EASY</button>
      <button onClick={() => { setLevel(9) }}>HARD</button>
    </>
  );
}

export default App;

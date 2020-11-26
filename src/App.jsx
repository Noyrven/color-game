import React, { useEffect, useState } from "react";
import './main.css'

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

  const [isWin, setWin] = useState(false);
  const [styles, setStyles] = useState({
    width: 100,
    height: 100,
  });


  const checkColors = e => {
    if (e.target.style.backgroundColor===color) {
      setStyles({...styles, visibility: 'visible'});
      setWin(true);
    } else {
      e.target.style.visibility = 'hidden'
    }
  }


  return (
    <>
      <h1>the color game</h1>
      <h2 className='color'> {color} </h2>
      <h2>is your color for this round</h2>

      <button onClick={() => { setLevel(6); setWin(false) }}>EASY</button>
      <button onClick={() => { setLevel(9); setWin(false) }}>HARD</button>

      <div className='container'>
        {colorsArray.map(tilecolor =>
          <div 
          className='tile' 
          style={{ ...styles, backgroundColor: isWin? color : tilecolor }} 
          onClick={checkColors}
          >
          </div>
        )}
      </div>

    </>
  );
}

export default App;

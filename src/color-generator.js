export function getRandomNum(num) {
  return Math.floor(Math.random() * num);
}

function randomColor() {
  const r = getRandomNum(255);
  const g = getRandomNum(255);
  const b = getRandomNum(255);
  return `rgb(${r}, ${g}, ${b})`;
}

export function generateColors(num) {
  return Array.from(new Array(num), randomColor);
}

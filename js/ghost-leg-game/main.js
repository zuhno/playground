import {
  parseLines,
  pathToDAttribute,
  generateY,
  svgStrToDom,
  userPaths,
  rangeRandom,
} from "./util.js";

const gameBoard = document.querySelector("main");
const startButton = document.querySelector("#jsStart");
const countBlock = document.querySelector("#jsCountBlock");
const userCount = countBlock.querySelector("#jsCount");

let store = [];
let isStart = false;
let isRunning = false;

const COLOR = ["red", "blue", "green"];
const DURATION = 3000;
const HEIGHT = 300;

const makeResult = (paths) => {
  const result = paths.map(() => null);
  for (let i = 0; i < paths.length; i++) {
    const index = Math.floor(paths[i][paths[i].length - 1].x / 100);
    result[index] = i;
  }
  return result;
};

const makePath = ({ verticalLines, horizontalLines }) => {
  const vLines = svgStrToDom(verticalLines);
  const hLines = svgStrToDom(horizontalLines);
  const parsedVLines = parseLines(vLines.documentElement);
  const parsedHLines = parseLines(hLines.documentElement);
  const paths = userPaths(parsedVLines, parsedHLines);
  return paths;
};

const makePoint = (paths) => {
  let points = "";
  for (let num = 0; num < paths.length; num++) {
    const path = paths[num];
    const dAttribute = pathToDAttribute(path);

    points += `<circle id="movingPoint_${num}" cx="0" cy="0" r="5" fill="${COLOR[num]}" />
    <path id="motionPath_${num}" fill="none" stroke="none" d="${dAttribute}" />
    <animateMotion xlink:href="#movingPoint_${num}" dur="${DURATION}ms" fill="freeze">
      <mpath xlink:href="#motionPath_${num}" />
    </animateMotion>`;
  }

  return points;
};

const makeLadderVertical = ({ totalWidth, totalHeight, count }) =>
  Array.from({ length: count })
    .map(
      (_, index) =>
        `<line x1="${
          (totalWidth / (count * 2)) * (index + (index + 1))
        }" y1="0" x2="${
          (totalWidth / (count * 2)) * (index + (index + 1))
        }" y2="${totalHeight}" stroke="black" stroke-width="2" />`
    )
    .join("");

const makeLadderHorizontal = ({ totalWidth, totalHeight, count }) =>
  Array.from({ length: count })
    .map((_, index) => {
      const x1 = (totalWidth / (count * 2)) * (index + (index + 1));
      const x2 = (totalWidth / (count * 2)) * (index + (index + 3));
      const y = generateY(totalHeight, store);
      store.push(y);
      return count - 1 === index
        ? ""
        : `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="black" stroke-width="2" />`;
    })
    .join("");

const makeGameBoard = () => {
  store = [];
  const count = parseInt(userCount.innerText);
  const totalWidth = count * 2 * 50;
  const totalHeight = HEIGHT;
  const verticalLines = makeLadderVertical({ totalWidth, totalHeight, count });
  let horizontalLines = "";
  const horizontalCount = rangeRandom({ min: 3, max: 5 });
  for (let i = 0; i < horizontalCount; i++) {
    horizontalLines += makeLadderHorizontal({ totalWidth, totalHeight, count });
  }
  const paths = makePath({ verticalLines, horizontalLines });
  const points = makePoint(paths);
  const game = `<svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${
    verticalLines + horizontalLines
  }${points}</svg>`;

  const prevSvg = gameBoard.querySelector("svg");
  gameBoard.removeChild(prevSvg);

  const board = gameBoard.querySelector("#jsBoard");
  const svg = svgStrToDom(game).querySelector("svg");
  board.after(svg);

  setTimeout(() => {
    isRunning = false;
    const userInputs = document.querySelectorAll(".user-input");
    const endInputs = document.querySelectorAll(".end-input");
    const result = makeResult(paths);
    result.forEach((index, i) => {
      endInputs[i].parentElement.parentElement.after(userInputs[index].value);
    });
  }, DURATION + 500);
};

const makeDefaultLine = () => {
  const count = parseInt(userCount.innerText);
  const totalWidth = count * 2 * 50;
  const totalHeight = HEIGHT;
  const verticalLines = makeLadderVertical({ totalWidth, totalHeight, count });
  const game = `<svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">${verticalLines}</svg>`;

  gameBoard.innerHTML =
    `<div id="jsBoard">${"<div><div><div><input class='user-input' type='text' /></div><div><input class='end-input' type='text' /></div></div></div>".repeat(
      count
    )}</div>` + game;
};

const handleCountClick = (e) => {
  const count = parseInt(userCount.innerText);
  if (e.target.innerText === "+") {
    if (count >= 15) return;
    userCount.innerText = count + 1;
    makeDefaultLine();
  } else if (e.target.innerText === "-") {
    if (count <= 2) return;
    userCount.innerText = count - 1;
    makeDefaultLine();
  }
};

const handleStartClick = () => {
  if (isRunning) return;
  if (isStart) {
    isStart = false;
    startButton.innerText = "시작 !";
    makeDefaultLine();
    return;
  }
  makeGameBoard();
  isStart = true;
  isRunning = true;
  startButton.innerText = "다시하기";
};

const main = () => {
  countBlock.addEventListener("click", handleCountClick);
  startButton.addEventListener("click", handleStartClick);
  makeDefaultLine();
};
main();

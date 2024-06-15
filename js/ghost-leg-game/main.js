import {
  parseLines,
  pathToDAttribute,
  generateY,
  svgStrToDom,
  userPaths,
  rangeRandom,
} from "./util.js";
import { COLORS } from "./constant.js";

const gameBoard = document.querySelector("main");
const startButton = document.querySelector("#jsStart");
const resetButton = document.querySelector("#jsReset");
const countBlock = document.querySelector("#jsCountBlock");
const userCount = countBlock.querySelector("#jsCount");

let store = [];
let isStart = false;
let isRunning = false;

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

const makePathLine = ({ paths, index }) => {
  const path = paths[index];
  const dAttribute = pathToDAttribute(path);
  const line = `
  <path id="animatedResultPath" fill="none" stroke="${COLORS[index]}" stroke-width="4" d="${dAttribute}" stroke-dasharray="0, 10000" />
  <animate id="resultPathAnimation" xlink:href="#animatedResultPath" attributeName="stroke-dasharray" from="0, 10000" to="10000, 0" dur="${DURATION}ms" fill="freeze" />
  `;

  return line;
};

const makePoint = (paths) => {
  let points = "";
  for (let num = 0; num < paths.length; num++) {
    const path = paths[num];
    const dAttribute = pathToDAttribute(path);

    points += `
    <circle id="movingPoint_${num}" cx="0" cy="0" r="8" fill="${COLORS[num]}" />
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
  const game = `<svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">${
    verticalLines + horizontalLines
  }</svg>`;

  const animation = `<svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${points}</svg>`;

  const gameSvg = svgStrToDom(game).querySelector("svg");
  const animationSvg = svgStrToDom(animation).querySelector("svg");
  gameBoard.appendChild(gameSvg);
  gameBoard.appendChild(animationSvg);

  setTimeout(() => {
    isRunning = false;
    const userInputs = document.querySelectorAll(".user-input");
    const endInputs = document.querySelectorAll(".end-input");
    const result = makeResult(paths);
    result.forEach((index, i) => {
      const span = document.createElement("span");
      span.classList.add("result-box");
      const borderStyle = `2px solid ${COLORS[index]}`;
      const boxShadowStyle = `4px 4px 0px ${COLORS[index]}`;
      span.style.border = borderStyle;
      span.style.boxShadow = boxShadowStyle;
      span.innerText = userInputs[index].value;
      endInputs[i].style.border = borderStyle;
      endInputs[i].style.boxShadow = boxShadowStyle;
      endInputs[i].parentElement.parentElement.after(span);
      span.addEventListener("click", () => {
        document.querySelector("#animatedResultPath")?.remove();
        document.querySelector("#resultPathAnimation")?.remove();
        let pathLine = makePathLine({ paths, index });
        pathLine = `<svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${pathLine}</svg>`;
        const pathLineSvg = svgStrToDom(pathLine).querySelector("svg");
        gameBoard.appendChild(pathLineSvg);
      });
    });
  }, DURATION);
};

const makeDefaultLine = () => {
  const count = parseInt(userCount.innerText);
  const totalWidth = count * 2 * 50;
  const totalHeight = HEIGHT;
  const verticalLines = makeLadderVertical({ totalWidth, totalHeight, count });
  const game = `<svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">${verticalLines}</svg>`;

  let inputs = "";
  for (let i = 0; i < count; i++) {
    inputs += `<div><div><div><input class='user-input' type='text' style='border:2px solid ${COLORS[i]};box-shadow: 4px 4px 0px ${COLORS[i]};' /></div><div><input class='end-input' type='text' style='border:2px solid black;box-shadow: 4px 4px 0px black;' /></div></div></div>`;
  }

  gameBoard.innerHTML = `<div id="jsBoard">${inputs}</div>` + game;
};

const makeRetryLine = () => {
  const prevUserInputs = document.querySelectorAll(".user-input");

  makeDefaultLine();

  const newUserInputs = gameBoard.querySelectorAll(".user-input");
  for (let i = 0; i < newUserInputs.length; i++) {
    newUserInputs[i].value = prevUserInputs[i]?.value || "";
  }
};

const checkInputs = () => {
  const userInputs = document.querySelectorAll(".user-input");
  const endInputs = document.querySelectorAll(".end-input");
  const userInputCheck = Array.from(userInputs).every((input) => !!input.value);
  const endInputCheck = !Array.from(endInputs).every((input) => !input.value);

  return userInputCheck && endInputCheck;
};

const disableInputs = (disable) => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (disable) {
      input.setAttribute("disabled", true);
    } else {
      input.removeAttribute("disabled");
    }
  });
};

const toggleStartBtn = (retry) => {
  isStart = false;
  startButton.innerText = "시작 !";
  disableInputs(false);
  if (retry) makeRetryLine();
  else makeDefaultLine();
};

const handleCountClick = (e) => {
  const count = parseInt(userCount.innerText);
  if (e.target.innerText === "+") {
    if (count >= 15) return;
    userCount.innerText = count + 1;
    toggleStartBtn(true);
  } else if (e.target.innerText === "-") {
    if (count <= 2) return;
    userCount.innerText = count - 1;
    toggleStartBtn(true);
  }
};

const handleStartClick = () => {
  if (isRunning) return;
  if (isStart) {
    toggleStartBtn(true);
    return;
  }
  const valid = checkInputs();
  if (!valid) {
    alert("상단 모든 입력창, 하단 한개 이상의 입력창에 값을 입력해주세요.");
    return;
  }
  disableInputs(true);
  makeGameBoard();
  isStart = true;
  isRunning = true;
  startButton.innerText = "다시하기";
};

const handleResetClick = () => {
  if (isRunning) return;
  toggleStartBtn(false);
};

const main = () => {
  countBlock.addEventListener("click", handleCountClick);
  startButton.addEventListener("click", handleStartClick);
  resetButton.addEventListener("click", handleResetClick);
  toggleStartBtn();
};
main();

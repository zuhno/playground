import {
  parseLines,
  pathToDAttribute,
  generateY,
  svgStrToDom,
  userPaths,
  rangeRandom,
  generateHtml,
} from "./util.js";
import { COLORS, DURATION } from "./constant.js";

const main = document.querySelector("main");
const startButton = document.querySelector("#jsStart");
const resetButton = document.querySelector("#jsReset");
const countBlock = document.querySelector("#jsCountBlock");
const userCount = countBlock.querySelector("#jsCount");

let isStart = false;
let isRunning = false;

const getTotalHeight = () => {
  const inputWrapper = main.querySelector(".input-wrapper");
  const userInput = main.querySelector(".user-input");
  const endInput = main.querySelector(".end-input");
  const inputWrapperHeight = getComputedStyle(inputWrapper).height;
  const userInputHeight = getComputedStyle(userInput).height;
  const endInputHeight = getComputedStyle(endInput).height;

  return (
    parseFloat(inputWrapperHeight) -
    parseFloat(userInputHeight) -
    parseFloat(endInputHeight)
  );
};

const getScreen = () => {
  const count = parseInt(userCount.innerText);
  const totalWidth = count * 2 * 50;
  const totalHeight = getTotalHeight();
  return { count, totalWidth, totalHeight };
};

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
  return generateHtml.animatedPath({
    color: COLORS[index],
    d: dAttribute,
    duration: DURATION,
  });
};

const makePoint = (paths) => {
  let points = "";
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const dAttribute = pathToDAttribute(path);
    points += generateHtml.animatedCircle({
      index: i,
      color: COLORS[i],
      d: dAttribute,
      duration: DURATION,
    });
  }

  return points;
};

const makeVerticalLine = ({ totalWidth, totalHeight, count }) =>
  Array.from({ length: count })
    .map((_, index) => {
      const x = (totalWidth / (count * 2)) * (index + (index + 1));
      return generateHtml.line({ x1: x, y1: 0, x2: x, y2: totalHeight });
    })
    .join("");

const makeHorizontalLine = ({ totalWidth, totalHeight, count, store }) =>
  Array.from({ length: count })
    .map((_, index) => {
      if (count - 1 === index) return "";
      const x1 = (totalWidth / (count * 2)) * (index + (index + 1));
      const x2 = (totalWidth / (count * 2)) * (index + (index + 3));
      const y = generateY({ totalHeight, store });
      store.push(y);
      return generateHtml.line({ x1, y1: y, x2, y2: y });
    })
    .join("");

const makeGameBoard = (horizontalCount) => {
  horizontalCount = horizontalCount || rangeRandom({ min: 4, max: 5 });

  try {
    const { count, totalWidth, totalHeight } = getScreen();

    const store = [];
    let horizontalLines = "";
    for (let i = 0; i < horizontalCount; i++) {
      horizontalLines += makeHorizontalLine({
        totalWidth,
        totalHeight,
        count,
        store,
      });
    }
    const verticalLines = makeVerticalLine({ totalWidth, totalHeight, count });
    const paths = makePath({ verticalLines, horizontalLines });
    const points = makePoint(paths);
    const game = generateHtml.svg({
      totalWidth,
      totalHeight,
      content: verticalLines + horizontalLines,
    });
    const animation = generateHtml.svg({
      totalWidth,
      totalHeight,
      isAnimation: true,
      content: points,
    });

    const gameSvg = svgStrToDom(game).querySelector("svg");
    const animationSvg = svgStrToDom(animation).querySelector("svg");
    main.appendChild(gameSvg);
    main.appendChild(animationSvg);

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
          const pathLine = makePathLine({ paths, index });
          const animationPathLine = generateHtml.svg({
            totalWidth,
            totalHeight,
            isAnimation: true,
            content: pathLine,
          });
          const pathLineSvg =
            svgStrToDom(animationPathLine).querySelector("svg");
          main.appendChild(pathLineSvg);
        });
      });
    }, DURATION);
  } catch {
    makeGameBoard(Math.max(horizontalCount - 1, 1));
  }
};

const makeDefaultLine = () => {
  const { count, totalWidth, totalHeight } = getScreen();

  const verticalLines = makeVerticalLine({
    totalWidth,
    totalHeight,
    count,
    store: [],
  });
  const game = generateHtml.svg({
    totalWidth,
    totalHeight,
    content: verticalLines,
  });

  let inputs = "";
  for (let i = 0; i < count; i++) {
    inputs += generateHtml.inputs({ color: COLORS[i] });
  }

  main.innerHTML = generateHtml.article({
    content: inputs,
    otherContent: game,
  });
};

const makeRetryLine = () => {
  const prevUserInputs = document.querySelectorAll(".user-input");

  makeDefaultLine();

  const newUserInputs = main.querySelectorAll(".user-input");
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
    if (disable) input.setAttribute("disabled", true);
    else input.removeAttribute("disabled");
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
  if (isRunning) return;
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

const init = () => {
  countBlock.addEventListener("click", handleCountClick);
  startButton.addEventListener("click", handleStartClick);
  resetButton.addEventListener("click", handleResetClick);
  toggleStartBtn();
};

init();

const gameBoard = document.querySelector("main");
const input = document.querySelector(".user-input");
const startButton = document.querySelector("#jsStart");
const countBlock = document.querySelector("#jsCountBlock");
const countButtons = countBlock.querySelectorAll("button");
const userCount = countBlock.querySelector("#jsCount");

let store = [];
let isStart = false;

const parseLines = (lineElements) => {
  const lines = [];

  // lineElements.forEach((line) => {
  //   const x1 = parseFloat(line.getAttribute("x1"));
  //   const y1 = parseFloat(line.getAttribute("y1"));
  //   const x2 = parseFloat(line.getAttribute("x2"));
  //   const y2 = parseFloat(line.getAttribute("y2"));
  //   lines.push([
  //     { x: x1, y: y1 },
  //     { x: x2, y: y2 },
  //   ]);
  // });
  return lines;
};

const addEdge = (graph, u, v) => {
  if (!graph[u]) {
    graph[u] = [];
  }
  if (!graph[v]) {
    graph[v] = [];
  }
  graph[u].push(v);
};

const dfs = (graph, start, path = [], visited = new Set()) => {
  path.push(start);
  visited.add(start);
  if (!graph[start] || graph[start].length === 0) {
    return path;
  }
  for (let node of graph[start]) {
    if (!visited.has(node)) {
      const newPath = dfs(graph, node, path, visited);
      if (newPath) {
        return newPath;
      }
    }
  }
  return path;
};

const pointToString = (point) => {
  return `${point.x},${point.y}`;
};

const stringToPoint = (str) => {
  const [x, y] = str.split(",").map(Number);
  return { x, y };
};

const pathToDAttribute = (path) => {
  return path
    .map((point, index) => {
      const { x, y } = stringToPoint(point);
      return index === 0 ? `M${x},${y}` : `L${x},${y}`;
    })
    .join(" ");
};

const generateY = (totalHeight) => {
  const padding = 20;
  const y =
    Math.ceil(Math.random() * (totalHeight - padding - padding + 1)) +
    padding -
    1;
  const isInclude = store.some((_y) => Math.abs(y - _y) < 5);
  if (isInclude) return generateY(totalHeight);
  else {
    return y;
  }
};

const makeLadderBoard = ({ lines, points, totalWidth, totalHeight }) =>
  `<svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">${lines}${points}</svg>`;

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
      const y = generateY(totalHeight);
      store.push(y);
      return count - 1 === index
        ? ""
        : `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="black" stroke-width="2" />`;
    })
    .join("");

const makePoint = ({ verticalLines }) => {
  const doc = new DOMParser().parseFromString(
    `<svg>${verticalLines}</svg>`,
    "text/xml"
  );

  const graph = {};
  const lines = parseLines(doc);
  console.log({ lines });
  for (let line of lines) {
    const [start, end] = line;
    addEdge(graph, pointToString(start), pointToString(end));
  }
  const start = { x: 50, y: 0 };
  const path = dfs(graph, pointToString(start));
  if (!path) return;
  const dAttribute = pathToDAttribute(path);

  return ` <circle id="movingPoint" cx="50" cy="0" r="5" fill="red" />
  <path id="motionPath" fill="none" stroke="none" d="${dAttribute}" />
  <animateMotion xlink:href="#movingPoint" dur="10s" repeatCount="indefinite">
    <mpath xlink:href="#motionPath" />
  </animateMotion>`;
};

const makeGameBoard = () => {
  store = [];
  const count = parseInt(userCount.innerText);
  const totalWidth = count * 2 * 50;
  const totalHeight = 400;
  const verticalLines = makeLadderVertical({ totalWidth, totalHeight, count });
  const lines =
    verticalLines +
    makeLadderHorizontal({ totalWidth, totalHeight, count }) +
    makeLadderHorizontal({ totalWidth, totalHeight, count }) +
    makeLadderHorizontal({ totalWidth, totalHeight, count });
  const points = makePoint({ verticalLines });
  const game = makeLadderBoard({ lines, points, totalWidth, totalHeight });
  gameBoard.innerHTML =
    "<div><div><input class='user-input' type='text' /></div><div><input class='end-input' type='text' /></div></div>".repeat(
      count
    );
  gameBoard.innerHTML = `<div>${gameBoard.innerHTML}</div>` + game;
};

const makeDefaultLine = () => {
  const count = parseInt(userCount.innerText);
  const totalWidth = count * 2 * 50;
  const totalHeight = 400;
  const lines = makeLadderVertical({ totalWidth, totalHeight, count });
  const game = makeLadderBoard({ lines, totalWidth, totalHeight });
  gameBoard.innerHTML =
    "<div><div><input class='user-input' type='text' /></div><div><input class='end-input' type='text' /></div></div>".repeat(
      count
    );
  gameBoard.innerHTML = `<div>${gameBoard.innerHTML}</div>` + game;
};

const handleCountClick = (e) => {
  const count = parseInt(userCount.innerText);
  if (e.target.innerText === "+") {
    if (count >= 12) return;
    userCount.innerText = count + 1;
    makeDefaultLine();
  } else if (e.target.innerText === "-") {
    if (count <= 2) return;
    userCount.innerText = count - 1;
    makeDefaultLine();
  }
};

const handleStartClick = () => {
  if (isStart) {
    isStart = false;
    startButton.innerText = "시작 !";
    makeDefaultLine();
    return;
  }
  makeGameBoard();
  isStart = true;
  startButton.innerText = "다시하기";
};

const main = () => {
  countBlock.addEventListener("click", handleCountClick);
  startButton.addEventListener("click", handleStartClick);
  makeDefaultLine();
};
main();

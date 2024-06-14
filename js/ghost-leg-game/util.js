export const parseLines = (svg) => {
  const lines = [];
  const lineElements = svg.querySelectorAll("line");
  lineElements.forEach((line) => {
    const x1 = parseFloat(line.getAttribute("x1"));
    const y1 = parseFloat(line.getAttribute("y1"));
    const x2 = parseFloat(line.getAttribute("x2"));
    const y2 = parseFloat(line.getAttribute("y2"));
    lines.push([
      { x: x1, y: y1 },
      { x: x2, y: y2 },
    ]);
  });
  return lines;
};

const findNextPath = (paths, endPoint, vLines, hLines) => {
  const lastPoint = paths[paths.length - 1];
  const linesByX = hLines.filter(
    ([start, end]) => start.x === lastPoint.x || end.x === lastPoint.x
  );
  const linesByY = linesByX.filter(([start]) => start.y > lastPoint.y);
  linesByY.sort(([start1], [start2]) => start1.y - start2.y);

  if (!linesByY.length) {
    paths.push({ x: lastPoint.x, y: endPoint.y });
    return;
  } else {
    let lineByMinY = null;
    for (let i = 0; i < linesByY.length; i++) {
      if (!lineByMinY || linesByY[i].y < lineByMinY.y) {
        lineByMinY = linesByY[i];
      }
    }
    const [start, end] = lineByMinY;
    const nextPoints = [];
    if (lastPoint.x === start.x) {
      nextPoints.push(start, end);
    } else if (lastPoint.x === end.x) {
      nextPoints.push(end, start);
    }

    paths.push(...nextPoints);
    findNextPath(paths, endPoint, vLines, hLines);
  }
};

export const userPaths = (vLines, hLines) => {
  const paths = [];
  for (const [index, vLine] of Object.entries(vLines)) {
    const [start, end] = vLine;
    paths[index] = [start];
    findNextPath(paths[index], end, vLines, hLines);
  }
  return paths;
};

export const svgStrToDom = (str) => {
  if (str.includes("<svg")) {
    return new DOMParser().parseFromString(str, "image/svg+xml");
  }
  return new DOMParser().parseFromString(
    `<svg xmlns="http://www.w3.org/2000/svg">${str}</svg>`,
    "image/svg+xml"
  );
};

export const pathToDAttribute = (path) => {
  return path
    .map(({ x, y }, index) => {
      return index === 0 ? `M${x},${y}` : `L${x},${y}`;
    })
    .join(" ");
};

export const rangeRandom = ({ min, max }) =>
  Math.ceil(Math.random() * (max - min + 1)) + min - 1;

export const generateY = (totalHeight, store) => {
  const padding = 20;
  const y = rangeRandom({ min: padding, max: totalHeight - padding });
  const isInclude = store.some((_y) => Math.abs(y - _y) < 3);
  if (isInclude) return generateY(totalHeight, store);
  else {
    return y;
  }
};

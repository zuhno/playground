import fs from "node:fs";

function stringify2DArrayPretty(array2D) {
  return '[\n' + array2D.map(row => '  ' + JSON.stringify(row)).join(',\n') + '\n]';
}

function bufToArr(buf) {
  let i = 0, line = 8;
  return Array.from(buf).map(v => v.toString(16).toUpperCase().padStart(2, '0')).reduce((acc, cnt, idx) => {
    if (idx >= line) {
      line += 8;
      acc[++i] = [];
    }
    acc[i].push(cnt);
    return acc;
  }, [[]]);
}

function jpeg() {
  const imgFile = fs.readFileSync("./assets/cuttleman-wide.jpg");
  const byteToArray = bufToArr(imgFile);
  fs.writeFileSync("./jpeg.binary.json", stringify2DArrayPretty(byteToArray));
}

function png() {
  const imgFile = fs.readFileSync("./assets/cuttleman-wide.png");
  const byteToArray = bufToArr(imgFile);
  fs.writeFileSync("./png.binary.json", stringify2DArrayPretty(byteToArray));
}

function main() {
  jpeg();
  png();
}

main();

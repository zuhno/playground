const sharp = require("sharp");

// 텍스트를 UTF-8로 인코딩하여 바이너리 형태로 변환하는 함수
function textToBinary(text) {
  const buffer = Buffer.from(text, "utf8");
  return buffer
    .toString("binary")
    .split("")
    .map((char) => {
      return char.charCodeAt(0).toString(2).padStart(8, "0");
    })
    .join("");
}

// 바이너리 데이터를 UTF-8 텍스트로 변환하는 함수
function binaryToText(binary) {
  const bytes = [];
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    bytes.push(parseInt(byte, 2));
  }
  return Buffer.from(bytes).toString("utf8");
}

// 텍스트를 이미지에 숨기는 함수
async function hideTextInImage(imagePath, text, outputImagePath) {
  const image = await sharp(imagePath)
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });
  const { data, info } = image;
  console.log(info);
  const binaryText = textToBinary(text);
  let binaryIndex = 0;

  for (let i = 0; i < data.length && binaryIndex < binaryText.length; i += 4) {
    if (binaryIndex < binaryText.length) {
      data[i] = (data[i] & 0xfe) | parseInt(binaryText[binaryIndex], 2);
      binaryIndex++;
    }
  }

  await sharp(Buffer.from(data), {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  }).toFile(outputImagePath);
}

// 이미지에서 텍스트를 추출하는 함수
async function extractTextFromImage(imagePath) {
  const image = await sharp(imagePath)
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });
  const { data } = image;
  let binaryText = "";

  for (let i = 0; i < data.length; i += 4) {
    binaryText += (data[i] & 1).toString();
  }

  // 바이너리 데이터를 텍스트로 변환하여 null 문자로 종료 확인
  let text = binaryToText(binaryText);
  const nullCharIndex = text.indexOf("\0");
  if (nullCharIndex !== -1) {
    text = text.substring(0, nullCharIndex);
  }

  return text;
}

// 사용 예제
(async () => {
  // const imagePath = "./_yoga-8165759_640.jpg"; // 입력 이미지 파일 경로
  // const text = "이준오 짱짱맨";
  // const outputImagePath = "output.png"; // 출력 이미지 파일 경로
  const outputImagePath = "20210427171342_3f9e870b5a69bf77409ad8bfb4e5f2f1_IMAG01_6.jpg"; // 출력 이미지 파일 경로

  // await hideTextInImage(imagePath, text, outputImagePath);
  // console.log("Text hidden in image successfully.");

  const extractedText = await extractTextFromImage(outputImagePath);
  console.log("Extracted Text:", extractedText);
})();

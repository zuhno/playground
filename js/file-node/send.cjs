const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const config = require("./config.json");

const { RESOURCE_PATH, OUTPUT_DIR, HOST, PORT } = config;
const TIMEOUT_MS = 5000;

/* ===========================
   1. 서버 연결 가능 여부 체크
=========================== */
function checkServerAvailable() {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: HOST,
        port: PORT,
        method: "HEAD",
        path: "/",
        timeout: TIMEOUT_MS,
      },
      () => resolve(true),
    );

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("서버 연결 타임아웃"));
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
}

/* ===========================
   2. 파일 전송
=========================== */
async function sendFile(fileName) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      __dirname,
      RESOURCE_PATH + OUTPUT_DIR + `/${fileName}`,
    );

    const SAVE_FILENAME = `${OUTPUT_DIR}_${fileName}`;

    const stat = fs.statSync(filePath);
    const totalSize = stat.size;

    let sentBytes = 0;
    let lastPrintedPercent = -1;

    console.log(`\n📦 전송 시작: ${SAVE_FILENAME}`);
    console.log(`📏 파일 크기: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);

    const req = http.request(
      {
        host: HOST,
        port: PORT,
        path: "/file/send",
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Length": totalSize,
          "x-filename": encodeURIComponent(SAVE_FILENAME),
        },
      },
      (res) => {
        let body = "";
        res.on("data", (d) => (body += d));
        res.on("end", () => {
          console.log(`\n✅ 전송 완료 (${res.statusCode})`);
          if (body) console.log("📨 응답:", body);
          resolve();
        });
      },
    );

    req.on("error", (err) => {
      console.error("\n❌ 전송 실패:", err.message);
      resolve();
    });

    const rs = fs.createReadStream(filePath);

    rs.on("data", (chunk) => {
      sentBytes += chunk.length;
      const percent = Math.floor((sentBytes / totalSize) * 100);

      // 퍼센트가 바뀔 때만 출력 (터미널 깜빡임 방지)
      if (percent !== lastPrintedPercent) {
        process.stdout.write(
          `\r🚀 전송 중... ${percent}% (${(sentBytes / 1024 / 1024).toFixed(
            2,
          )} / ${(totalSize / 1024 / 1024).toFixed(2)} MB)`,
        );
        lastPrintedPercent = percent;
      }
    });

    rs.on("end", () => {
      process.stdout.write("\n");
    });

    rs.pipe(req);
  });
}

/* ===========================
   3. 실행
=========================== */
(async () => {
  try {
    console.log(`🔍 서버 연결 확인: ${HOST}:${PORT}`);
    await checkServerAvailable();
    console.log("✅ 서버 응답 확인됨");

    const files = fs.readdirSync(
      path.join(__dirname, RESOURCE_PATH + OUTPUT_DIR),
    );
    if (files.length > 0) {
      for (const fileName of files) {
        await sendFile(fileName);
      }
    } else {
      console.log("⚠️ 전송할 파일이 없습니다.");
    }
  } catch (err) {
    console.error("❌ 서버 접근 불가:", err.message);
    process.exit(1);
  }
})();

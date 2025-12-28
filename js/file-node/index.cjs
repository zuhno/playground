const http = require("node:http");
const path = require("node:path");
const url = require("node:url");
const fs = require("node:fs");

const HOST = "0.0.0.0";
const PORT = 8888;

const BASE_DIR = path.join(__dirname, "files");
fs.mkdirSync(BASE_DIR, { recursive: true });

function json(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);

  /**
   * POST /file/send
   */
  if (req.method === "POST" && parsed.pathname === "/file/send") {
    let raw = req.headers["x-filename"];
    let filename = decodeURIComponent(raw || "file.bin");
    filename = path.basename(filename);

    const totalSize = Number(req.headers["content-length"] || 0);
    const savePath = path.join(BASE_DIR, filename);

    let receivedBytes = 0;
    let lastPercent = -1;

    console.log(`\n📥 업로드 시작: ${filename}`);
    if (totalSize > 0) {
      console.log(`📏 파일 크기: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    }

    const ws = fs.createWriteStream(savePath);

    req.on("data", (chunk) => {
      receivedBytes += chunk.length;

      if (totalSize > 0) {
        const percent = Math.floor((receivedBytes / totalSize) * 100);
        if (percent !== lastPercent) {
          process.stdout.write(
            `\r⬇️  수신 중: ${percent}% | ` +
              `${(receivedBytes / 1024 / 1024).toFixed(2)} / ` +
              `${(totalSize / 1024 / 1024).toFixed(2)} MB`,
          );
          lastPercent = percent;
        }
      } else {
        process.stdout.write(
          `\r⬇️  수신 중: ${(receivedBytes / 1024 / 1024).toFixed(2)} MB`,
        );
      }
    });

    req.pipe(ws);

    ws.on("finish", () => {
      process.stdout.write("\n");
      console.log(`✅ 업로드 완료: ${filename}`);

      json(res, 200, {
        ok: true,
        filename,
      });
    });

    ws.on("error", (err) => {
      process.stdout.write("\n");
      console.error("❌ 파일 저장 실패:", err.message);
      json(res, 500, { ok: false, message: err.message });
    });

    req.on("aborted", () => {
      process.stdout.write("\n");
      console.error("❌ 클라이언트 연결 중단");
      ws.destroy();
      try {
        fs.unlinkSync(savePath);
      } catch {}
    });

    return;
  }

  json(res, 404, { ok: false });
});

server.listen(PORT, HOST, () => {
  console.log(`File node listening on http://${HOST}:${PORT}`);
});

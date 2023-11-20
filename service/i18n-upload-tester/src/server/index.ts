import express from "express";
import path from "path";
import { transUploader } from "./trans";
import cors from "cors";

const app = express();

const SAMPLE_SCRIPT_ID =
  "1iwrTn-B4NUWBqE6XjeZSFsvXChBSe4CK_JOOTePVkBlaqd0x2YFaHBI4";

app.use(
  cors({
    origin: ["*"],
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

app.post("/trans/update", async (req, res) => {
  console.log(req.headers["x-script-id"]);
  if (req.headers["x-script-id"] !== SAMPLE_SCRIPT_ID) {
    res.status(401).end();
  }
  await transUploader();
  res.status(200).end();
});

app.listen(3000, () => console.log("running: http://localhost:3000"));

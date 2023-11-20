const express = require("express");
const { swapMacroExecutor } = require("./macro");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  const body = req.body;
  await swapMacroExecutor(body?.value, body?.toAddress);

  res.end();
});

app.listen(4000, () => console.log("http://localhost:4000"));

const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const port = 4000;
const { exec } = require("child_process");
app.use(bodyParser.json());
const fs = require("fs");

let status = "idle"; //building , completed

app.use(
  "/download",
  express.static(
    __dirname.replace("server", "app/build/outputs/apk/interpreter/debug")
  )
);

app.post("/start", (req, res) => {
  try {
    console.log(req.body);
    const { url_1, url_2, MODEL_INPUT_SIZE, IS_MODEL_QUANTIZED } = req.body;
    status = "building";
    if (fs.existsSync(__dirname.replace("server", "app/config.txt"))) {
      fs.unlinkSync(__dirname.replace("server", "app/config.txt"));
    }
    fs.writeFileSync(
      __dirname.replace("server", "app/config.txt"),
      `${url_1}\n${url_2}\nMODEL_INPUT_SIZE = ${MODEL_INPUT_SIZE}\nIS_MODEL_QUANTIZED = ${IS_MODEL_QUANTIZED}`
    );

    exec("bash script.sh", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
    });

    setTimeout(() => {
      status = "completed";
    }, 5000);
    res
      .status(200)
      .send({ data: req.body, message: "build started", error: false });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: "somethig went wrong in server", error: true });
  }
});

app.get("/status", (req, res) => {
  try {
    res
      .status(200)
      .send({ data: status, message: "fetch status", error: false });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: "somethig went wrong in server", error: true });
  }
});

app.get("/getLink", (req, res) => {
  try {
    res.status(200).send({
      data: "https://1cc62d3adc4c.ngrok.io/download/config.txt",
      message: "fetch link",
      error: false
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: "somethig went wrong in server", error: true });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

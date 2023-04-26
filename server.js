import express from "express";
import cors from "cors";
import { sendWorkerData } from "./worker.js";
import bodyParser from "body-parser";
import { writeFileSync } from "node:fs";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));
let batch_data = [];
let intervalId;

app.post("/workerdata", (req, res) => {
  console.log("in post method");
  batch_data.push(req.body);

  if (batch_data.length === 150) {
    writeToDisk();
  }
  res.send("recieved data");
});

function writeToDisk() {
  clearInterval(intervalId);
  console.log(batch_data.length);
  writeFileSync("./batch_data1.json", JSON.stringify(batch_data), (err) => {
    if (err) throw err;
  });
  batch_data=[];
}

function startRecievingData() {
  intervalId = setInterval(() => {
    sendWorkerData();
  }, 100);
}
startRecievingData();

//Start server on a specified port
app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});

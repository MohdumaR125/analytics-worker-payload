import express from "express";
import cors from "cors";
import { sendWorkerData } from "./worker.js";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));
let batch_data = [];

app.post("/workerdata", (req, res) => {
  console.log("in post method");
  let worker_data = req.body;
//   console.log(worker_data, "worker data");
  batch_data.push(worker_data);
  res.send("recieved data");
});

//Start server on a specified port
app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});
sendWorkerData();

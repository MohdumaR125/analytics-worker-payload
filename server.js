import express from "express";
import cors from "cors";
import { sendWorkerData } from "./worker.js";
import bodyParser from "body-parser";
import { appendFile } from "node:fs";

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));
let batch_data = [];
let intervalId;

app.post("/workerdata", (req, res) => {
  // console.log("in post method");
  // batch_data.push(req.body);
   
    writeToDisk(req.body)

  // if (batch_data.length === 3000) {
  //   writeToDisk();
  // }
  res.send("recieved data");
});
let counter=1;
function writeToDisk(data) {
  if(counter===100){
    process.nextTick(()=>{stopSendingData()})
  }
  // console.time("write to disk")
  // clearInterval(intervalId);
  // console.log(batch_data.length);

  // for(let i=0;i<batch_data.length;i++){
  //   appendFile("./batch_data1.json", JSON.stringify(batch_data[i]), (err) => {

  //     if (err) throw err;
  //   });
  // }
  // batch_data=[];

   appendFile("./batch_data1.json", JSON.stringify(data), (err) => {

      if (err) throw err;      
       else console.log(counter)

    });
    counter +=1;


  // console.timeEnd("write to disk")
}

function startRecievingData() {
  intervalId = setInterval(() => {
    sendWorkerData();
  }, 50);
}
function stopSendingData(){
  clearInterval(intervalId);
}

//Start server on a specified port
app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});

startRecievingData();
import express from 'express';
import cors from 'cors';
import { sendWorkerData } from './worker.js';
import bodyParser from 'body-parser';
const app = express();
const port = 3000

app.use(bodyParser.json());
app.use(cors());
let batch_data=[]




//write data to the local json file
app.post('/workerdata', (req, res) => {
    console.log("in post")
    let worker_data = (req.body)
    batch_data.push(worker_data)
    console.log(worker_data, 'json');
    res.send("recieved data");

})

//Start your server on a specified port
app.listen(port, () => {
    console.log(`Server is runing on port ${port}`)
})
sendWorkerData()

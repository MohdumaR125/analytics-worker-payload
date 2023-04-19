import { readFileSync } from 'fs';
import  axios  from 'axios';



const sendWorkerData= ()=>{
const data = readDataFromFile();
postData(data)
}


function readDataFromFile(){
    console.log("in read file")

    // Use fs.readFile() method to read the file
   const data= readFileSync('attempt_payload.json', 'utf8', (err)=>{
    if(err) throw err;
   });
  return data;
}

const postData = (data)=>{
    console.log("in post data function")
    // POST request
      axios.post("http://localhost:3000/workerData",JSON.parse(data))
.then(response => {
  console.log(response.data,);
})
.catch(error => {
  console.error(error);
});
}
export {sendWorkerData}
import axios from "axios";
import { analyticsDataFunc } from "./convert.js";

//function for fetching data from conert.js and posting it on server
const sendWorkerData = () => {
  const analytics_data = fetchAnalyticsData();
  postDataFunc(analytics_data);
};

function fetchAnalyticsData() {
  const analytics_data = analyticsDataFunc();
  return analytics_data;
}

const postDataFunc = (data) => {
  console.log("in post data function");
  // POST request
  const stringify_data = JSON.stringify(data);
  // console.log(stringify_data,"post data data")
  axios
    .post("http://localhost:3000/workerdata", stringify_data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
export { sendWorkerData };

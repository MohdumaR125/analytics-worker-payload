import axios from "axios";
import { analyticsDataFunc } from "./convert_attempt_to_analytics.js";

//function for fetching data from convert.js and posting it on server
const sendWorkerData = () => {
  // console.time("worker time");
  const analytics_data = fetchAnalyticsData();
  postDataFunc(analytics_data);
  // console.timeEnd("worker time")
};

function fetchAnalyticsData() {
  const analytics_data = analyticsDataFunc();
  return analytics_data;
}

const postDataFunc = (data) => {
  // console.log("in post data function");
  // POST request
  const stringified_data = JSON.stringify(data);
  axios
    .post("http://localhost:3000/workerdata", stringified_data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
export { sendWorkerData };

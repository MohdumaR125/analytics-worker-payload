import { readFileSync } from "fs";

//function for converting attempt data to analytics data
const analyticsDataFunc = () => {

  const analytics_data_arr = [];
  const original_data = readDataFromFile();
  const clicks = original_data.quizAnalytics.clicks;
  const movements = original_data.quizAnalytics.movements;
  const keyStrokes = original_data.quizAnalytics.keyStrokes;
  let movement_idx = 0; //to keep track of index in movement array
  let keyStroke_idx = 0; //to keep track of keystroke array index

  //loop for creating rows for table data
  for (let i = 0; i < clicks.length; i++) {

    //object for row entries
    let row_data = {
      event_name: "",
      event_value: "",
      date: 0,
      user_id: "",
      quiz_id: "",
      attempt_id: "",
      ques_id: "",
      timestamp: 0,
      element_id: "",
      mouse_movement_timestamp: [],
      mouse_movement_x_coord: [],
      mouse_movement_y_coord: [],
      mouse_movement_element_id: [],
      x_coord: 0,
      y_coord: 0,
      key_press_char: [],
      key_press_timestamp: [],
    };

    //checking if click.name contains event name and value
    if (clicks[i].name.includes("-")) {
      const val = clicks[i].name.split("-");
      row_data.event_name = val[0];
      row_data.event_value = val[1];
    } else {
      row_data.event_name = clicks[i].name;
      row_data.event_value = "";
    }

    row_data.date = original_data.userQuizAttemptData.startTime;
    row_data.user_id = original_data.userId;
    row_data.quiz_id = original_data.userQuizAttemptData.id;
    row_data.ques_id = clicks[i].questionId;
    row_data.timestamp =
      original_data.userQuizAttemptData.startTime + clicks[i].ms;
    row_data.element_id = clicks[i].name;

    //splitting coordinates to get x and y value
    const coord = clicks[i].coordinates.split("-");
    row_data.x_coord = coord[0];
    row_data.y_coord = coord[1];

    // checking for last index as we save array from current click to next click
    if (i !== clicks.length - 1) {
      //pushing mouse movement into current click row
      for (let j = movement_idx; j < movements.length; j++) {
        if (movements[j].ms > clicks[i + 1].ms) {
          movement_idx = j;
          break;
        } else {
          row_data.mouse_movement_timestamp.push(
            original_data.userQuizAttemptData.startTime + movements[j].ms
          );
          const mouse_coord = movements[j].coordinates.split("-");
          row_data.mouse_movement_x_coord.push(mouse_coord[0]);
          row_data.mouse_movement_y_coord.push(mouse_coord[1]);
          row_data.mouse_movement_element_id.push(movements[j].name);
        }
      }
      for (let j = keyStroke_idx; j < keyStrokes.length; j++) {
        if (keyStrokes[j].ms > clicks[i + 1].ms) {
          keyStroke_idx = j;
          break;
        } else {
          row_data.key_press_char.push(keyStrokes[j].key);
          row_data.key_press_timestamp.push(
            original_data.userQuizAttemptData.startTime + keyStrokes[j].ms
          );
        }
      }
    } 
    // for last index in clicks array
    else {
      for (let j = movement_idx; j < movements.length; j++) {
        row_data.mouse_movement_timestamp.push(
          original_data.userQuizAttemptData.startTime + movements[j].ms
        );
        const mouse_coord = movements[j].coordinates.split("-");
        row_data.mouse_movement_x_coord.push(mouse_coord[0]);
        row_data.mouse_movement_y_coord.push(mouse_coord[1]);
        row_data.mouse_movement_element_id.push(movements[j].name);
      }
      for (let j = keyStroke_idx; j < keyStrokes.length; j++) {
        row_data.key_press_char.push(keyStrokes[j].key);
        row_data.key_press_timestamp.push(
          original_data.userQuizAttemptData.startTime + keyStrokes[j].ms
        );
      }
    }

    analytics_data_arr.push(row_data);
  }
  console.log(analytics_data_arr[analytics_data_arr.length-1])
  return analytics_data_arr;
};

//read data of attempt payload
function readDataFromFile() {
  // Use fs.readFile() method to read the file
  const data = JSON.parse(
    readFileSync("attempt_payload1.json", "utf8", (err) => {
      if (err) throw err;
    })
  );
  return data;
}
analyticsDataFunc()
export { analyticsDataFunc };

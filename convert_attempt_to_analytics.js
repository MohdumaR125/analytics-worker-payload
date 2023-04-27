import { readFileSync } from "fs";

//function for converting attempt data to analytics data
const analyticsDataFunc = () => {
  // console.time("analtyics data funcion");
  const analytics_data_arr = [];
  const quiz_attempt_data = readDataFromFile();
  const clicks = quiz_attempt_data.quizAnalytics.clicks;
  const movements = quiz_attempt_data.quizAnalytics.movements;
  const keyStrokes = quiz_attempt_data.quizAnalytics.keyStrokes;

  let movement_idx = 0; //to keep track of index in movement array
  let keyStroke_idx = 0; //to keep track of keystroke array index

  //loop for creating rows for table data
  for (let i = 0; i < clicks.length; i++) {
    //object for row entries
    let quiz_attempt_event = {
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
      quiz_attempt_event.event_name = val[0];
      quiz_attempt_event.event_value = val[1];
    } else {
      quiz_attempt_event.event_name = clicks[i].name;
      quiz_attempt_event.event_value = "";
    }

    quiz_attempt_event.date = unixTimestampToDate(
      quiz_attempt_data.userQuizAttemptData.startTime
    );
    quiz_attempt_event.user_id = quiz_attempt_data.userId;
    quiz_attempt_event.quiz_id = quiz_attempt_data.userQuizAttemptData.id;
    quiz_attempt_event.ques_id = clicks[i].questionId;
    quiz_attempt_event.timestamp =
      quiz_attempt_data.userQuizAttemptData.startTime + clicks[i].ms;
    quiz_attempt_event.element_id = clicks[i].name;

    //splitting coordinates to get x and y value
    const coord = clicks[i].coordinates.split("-");
    quiz_attempt_event.x_coord = coord[0];
    quiz_attempt_event.y_coord = coord[1];

    // checking for last index as we save array from current click to next click
    if (i !== clicks.length - 1) {
      //pushing mouse movement into current click row
      for (let j = movement_idx; j < movements.length; j++) {
        if (movements[j].ms > clicks[i + 1].ms) {
          movement_idx = j;
          break;
        } else {
          quiz_attempt_event.mouse_movement_timestamp.push(
            quiz_attempt_data.userQuizAttemptData.startTime + movements[j].ms
          );
          const mouse_coord = movements[j].coordinates.split("-");
          quiz_attempt_event.mouse_movement_x_coord.push(mouse_coord[0]);
          quiz_attempt_event.mouse_movement_y_coord.push(mouse_coord[1]);
          quiz_attempt_event.mouse_movement_element_id.push(movements[j].name);
        }
      }
      for (let j = keyStroke_idx; j < keyStrokes.length; j++) {
        if (keyStrokes[j].ms > clicks[i + 1].ms) {
          keyStroke_idx = j;
          break;
        } else {
          quiz_attempt_event.key_press_char.push(keyStrokes[j].key);
          quiz_attempt_event.key_press_timestamp.push(
            quiz_attempt_data.userQuizAttemptData.startTime + keyStrokes[j].ms
          );
        }
      }
    }
    // for last index in clicks array
    else {
      for (let j = movement_idx; j < movements.length; j++) {
        quiz_attempt_event.mouse_movement_timestamp.push(
          quiz_attempt_data.userQuizAttemptData.startTime + movements[j].ms
        );
        const mouse_coord = movements[j].coordinates.split("-");
        quiz_attempt_event.mouse_movement_x_coord.push(mouse_coord[0]);
        quiz_attempt_event.mouse_movement_y_coord.push(mouse_coord[1]);
        quiz_attempt_event.mouse_movement_element_id.push(movements[j].name);
      }
      for (let j = keyStroke_idx; j < keyStrokes.length; j++) {
        quiz_attempt_event.key_press_char.push(keyStrokes[j].key);
        quiz_attempt_event.key_press_timestamp.push(
          quiz_attempt_data.userQuizAttemptData.startTime + keyStrokes[j].ms
        );
      }
    }

    analytics_data_arr.push(quiz_attempt_event);
  }

  // console.timeEnd("analtyics data funcion");
  // console.log(analytics_data_arr[analytics_data_arr.length-1])
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
analyticsDataFunc();

function unixTimestampToDate(unixTimestamp) {
  const dateObj = new Date(unixTimestamp);
  return `'${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}'`;
}

export { analyticsDataFunc };

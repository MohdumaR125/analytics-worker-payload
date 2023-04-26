import { analyticsDataFunc } from "./convert_attempt_to_analytics.js";
import fs from "fs"




const convertToCsv = (quizAttempt)=>{
  
  return quizAttempt.map((quizAttemptEvent) => {
    
    return quizAttemptEvent.event_name + "," +
    quizAttemptEvent.event_value + "," +
    quizAttemptEvent.date + "," +
    quizAttemptEvent.user_id + "," +
    quizAttemptEvent.quiz_id + "," +
    quizAttemptEvent.attempt_id + "," +
    quizAttemptEvent.ques_id + "," +
    quizAttemptEvent.timestamp + "," +
    quizAttemptEvent.element_id + ",\"[" +
    quizAttemptEvent.mouse_movement_timestamp.join(",") + "]\",\"[" +
    quizAttemptEvent.mouse_movement_x_coord.join(",") + "]\",\"[" +
    quizAttemptEvent.mouse_movement_y_coord.join(",") + "]\",\"[" +
    quizAttemptEvent.mouse_movement_element_id.map((el=>`'${el}'`)).join(",") + "]\"," +
    quizAttemptEvent.x_coord + "," +
    quizAttemptEvent.y_coord + ",\"[" +
    quizAttemptEvent.key_press_char.map((el=>`'${el}'`)).join(",") + "]\",\"[" +
    quizAttemptEvent.key_press_timestamp.join(",") + "]\"," 
    
  }).join("\n");
}

const records = analyticsDataFunc();
const csv_string = convertToCsv(records)


fs.writeFileSync("./file.csv", csv_string,(err) => {
  if (err) throw err;
  console.log("writen csv file")
})


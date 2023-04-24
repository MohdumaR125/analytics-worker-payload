import { ParquetSchema, ParquetWriter, ParquetReader } from 'parquets';
import { analyticsDataFunc } from './convert.js';

let schema = new ParquetSchema({
    event_name: { type: 'UTF8', optional: true },
    event_value: { type: 'UTF8' , optional: true },
    date: { type: 'TIMESTAMP_MILLIS', optional: true },
    user_id: { type: 'UTF8' , optional: true},
    quiz_id: { type: 'UTF8' , optional: true},
    attempt_id: { type: 'UTF8', optional: true },
    ques_id: { type: 'UTF8', optional: true },
    timestamp: { type: 'TIMESTAMP_MILLIS' , optional: true},
    element_id: { type: 'UTF8', optional: true },
    mouse_movement_timestamp: { type: 'TIMESTAMP_MILLIS', repeated: true, optional: true  },
    mouse_movement_x_coord: { type: 'UTF8', repeated: true, optional: true  },
    mouse_movement_y_coord: { type: 'UTF8', repeated: true , optional: true },
    // mouse_movement_element_id: { type: 'UTF8', repeated: true , optional: true },
    x_coord: { type: 'UTF8', optional: true },
    y_coord: { type: 'UTF8' , optional: true},
    // key_press_char: { type: 'UTF8', repeated: true, optional: true  },
    // key_press_timestamp: { type: 'TIMESTAMP_MILLIS', repeated: true , optional: true },

  });

  let writer = await ParquetWriter.openFile(schema, 'analytics_payload.parquet');

  const payload = analyticsDataFunc()
  writeDataToFile(payload)
  console.log(payload[0])

//   async function writeDataToFile(payload){
    
//     await payload.forEach((el)=>{
//          writer.appendRow({
//             event_name: el.event_name,
//             event_value: el.event_value,
//             date: el.date,
//             user_id: el.user_id,
//             quiz_id: el.quiz_id,
//             attempt_id:el.attempt_id,
//             ques_id:el.ques_id,
//             timestamp:el.timestamp,
//             element_id:el.element_id,
//             mouse_movement_timestamp:el.mouse_movement_timestamp,
//             mouse_movement_x_coord:el.mouse_movement_x_coord,
//             mouse_movement_y_coord:el.mouse_movement_y_coord,
//             mouse_movement_element_id:el.mouse_movement_element_id,
//             x_coord:el.x_coord,
//             y_coord:el.y_coord,
//             key_press_char:el.key_press_char,
//             key_press_timestamp:el.key_press_timestamp});
//       })
//   }

async function writeDataToFile(payload) {
    for (let el of payload) {
       writer.appendRow({
        event_name: el.event_name,
        event_value: el.event_value,
        date: el.date,
        user_id: el.user_id,
        quiz_id: el.quiz_id,
        attempt_id: el.attempt_id,
        ques_id: el.ques_id,
        timestamp: el.timestamp,
        element_id: el.element_id,
        mouse_movement_timestamp: el.mouse_movement_timestamp,
        mouse_movement_x_coord: el.mouse_movement_x_coord,
        mouse_movement_y_coord: el.mouse_movement_y_coord,
        // mouse_movement_element_id: el.mouse_movement_element_id,
        x_coord: el.x_coord,
        y_coord: el.y_coord,
        // key_press_char: el.key_press_char,
        // key_press_timestamp: el.key_press_timestamp
      });
    }
  }
  
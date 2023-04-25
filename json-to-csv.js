import { analyticsDataFunc } from "./convert_attempt_to_analytics.js";
import { createObjectCsvWriter as createCsvWriter } from "csv-writer";

const csvWriter = createCsvWriter({
  path: "./file.csv",
  header: [
    {id:"event_name"  },
    {id:"event_value"},
    {id:"date" },
    {id:"user_id" },
    {id:"quiz_id" },
    {id:"attempt_id"},
    {id:"ques_id" },
    {id: "timestamp"},
    {id:"element_id"},
    {id:"mouse_movement_timestamp" },
    {id:"mouse_movement_x_coord" },
    {id:"mouse_movement_y_coord" },
    {id:"mouse_movement_element_id"},
    {id:"x_coord"},
    {id:"y_coord"},
    {id:"key_press_char"},
    {id:"key_press_timestamp"},
  ],
});

const records = analyticsDataFunc();


csvWriter
  .writeRecords(records) // returns a promise
  .then(() => {
    console.log("...Done");
  });

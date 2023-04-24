import { analyticsDataFunc } from "./convert.js";

import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
const csvWriter = createCsvWriter({
  path: "./file.csv",
  header: [
    {id:"event_name" ,title: "event_name" },
    {id:"event_value" ,title: "event_value"},
    {id:"date" ,title:"date"},
    {id:"user_id" ,title:"user_id"},
    {id:"quiz_id" ,title:"quiz_id"},
    {id:"attempt_id" ,title:"attempt_id"},
    {id:"ques_id" ,title:"ques_id"},
    {id: "timestamp",title:"timestamp"},
    {id:"element_id",title:"element_id"},
    {id:"mouse_movement_timestamp" ,title:"mouse_movement_timestamp"},
    {id:"mouse_movement_x_coord" ,title:"mouse_movement_x_coord"},
    {id:"mouse_movement_y_coord" ,title:"mouse_movement_y_coord"},
    {id:"mouse_movement_element_id" ,title:"mouse_movement_element_id"},
    {id:"x_coord" ,title:"x_coord"},
    {id:"y_coord",title:"y_coord"},
    {id:"key_press_char",title:"key_press_char"},
    {id:"key_press_timestamp" ,title:"key_press_timestamp"},
  ],
});

const records = analyticsDataFunc();

csvWriter
  .writeRecords(records) // returns a promise
  .then(() => {
    console.log("...Done");
  });

import { readFileSync } from 'fs';
// import arrow from 'apache-arrow';
// import parquet from 'parquetjs';


function readDataFromFile(){

    // Use fs.readFile() method to read the file
   const tempdata= readFileSync('attempt_payload1.json', 'utf8', (err)=>{
    if(err) throw err;
   });
   const data=JSON.parse(tempdata)
   console.log(data.quizAnalytics.clicks.length)
   console.log(data.quizAnalytics.movements.length)

  return data;
}

const analyticsDataFunc = ()=>{
    const analytics_data_arr =[]
    const original_data = readDataFromFile()
    const clicks=(original_data.quizAnalytics.clicks).sort((a,b)=>a.ms-b.ms)
    const movements=(original_data.quizAnalytics.movements).sort((a,b)=>a.ms-b.ms)
    let movement_idx=0;

    for(let i=0;i<clicks.length;i++){
        let obj = {
            event_name:"",
            event_value:"",
            date:"",
            user_id:"",
            quiz_id:"",
            attempt_id:"",
            ques_id:"",
            timestamp:"",
            element_id:"",
            mouse_movement_timestamp:[],
            mouse_movement_x_coord:[],
            mouse_movement_y_coord:[],
            mouse_movement_element_id:[],
            x_coord:[],
            y_coord:[],
            key_press_char:[],
            key_press_timestamp:[]
        }
        if(clicks.name.includes('-')){
            const val=clicks.name.split("-");
            obj.event_name=val[0];
            obj.event_value=val[1]
        }else{
            obj.event_name=clicks.name;
            obj.event_value=""
        }
        obj.date=original_data.userQuizAttemptData.startTime;
        obj.user_id=original_data.userId;
        obj.quiz_id=original_data.userQuizAttemptData.id;
        obj.ques_id=clicks.questionId;
        obj.timestamp=original_data.userQuizAttemptData.startTime+clicks.ms;
        obj.element_id=clicks.name;

        for(let j=movement_idx;j<movements.length;j++){
            if(movements[j].ms>clicks[i+1]){}
        }


    }


}
analyticsDataFunc()


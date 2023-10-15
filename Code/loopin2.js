arr = [];
times=[];
keys = [];
record_pressed = false;
demo_off = true;
first = true;
hitcount = 0;
t0 = Date.now(); // for accuracy offset
t1= Date.now(); // for accuracy offset
i = 0;

let startTime = performance.now();

function roundTo250(num) {
    return Math.round(num / 250) * 250;
  }
function roundDiff(num){
    return Math.round(num / 250) * 250 - num;
}
function modprocessor(num){
    if (num<250){
        return num;
    } else {
        return -(500-num);
    }
    
}

function average(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum / arr.length;
  }

function adjustTimes(){
    diffs = []
    for (let i = 0; i < times.length; i++) {
        diffs[i] = roundDiff(times[i])
    }
    avg = average(diffs);

    for (let i = 0; i < times.length; i++) {
        times[i] = roundTo250(times[i]-avg)
}}

function preciseLog() {

    const t_0 = performance.now();
    let currentTime = performance.now();
    let elapsedTime = currentTime - startTime;
  
    console.log(`Elapsed Time: ${elapsedTime} ms    `);
    
    if (i==arr.length){
        i = 0;
    }
    console.log(`jumping to ${arr[keys[i]]}`)
    document.querySelector('.video-stream').currentTime = arr[keys[i]];
  
  
    startTime = currentTime; // reset startTime for next round
    
    //if (offset>50 || offset <-50){ offset = 0;}
  
    const t_1 = performance.now();
    let offset = t_1-t_0;
    if (i==0){
        offset = offset;// - roundDiff(performance.now())
    }

    if (i<(times.length-1)){
        inval = times[i+1]-times[i];

        setTimeout(preciseLog, (inval - modprocessor(Date.now()%inval) - offset));

        
        //setTimeout(preciseLog, (times[i+1]-times[i] - offset));

    }
    if (i == (times.length - 1)) {
        console.log("LAST");

        beat_ms = 500; // half a second / 120 bpm
        num_beats = 8; // two 4/4 measures
        loop_ms = num_beats * beat_ms;
        ms_to_end = (times[0] + loop_ms) - times[i];
        begin = times[0]
        inval = ms_to_end;
        setTimeout(preciseLog, (inval - modprocessor(Date.now()%inval) - offset));

        //setTimeout(preciseLog, (ms_to_end - offset));


        

    }


    i = i+1;
  }



function roundToNearest125(num) {
    return Math.round(num / 250) * 250;
  }

// WHEN A KEY IS PRESSED, INTERRUPT LOOPER AND DO THIS
document.onkeydown = function (e) {

  
    if (e.key == 'r'){   // TURN ON RECORDING IF RECORD BUTTON PRESSED
        record_pressed = !record_pressed;
        if (record_pressed){
            first = false;
            console.log("RECORD ON")}
        else{console.log("RECORD OFF")}

            // START THE LOOPER WHEN RECORD IS TURNED OFF
            if (!record_pressed && !first) {
                console.log("looper ON")
                adjustTimes();
                preciseLog();
            }
    
            }
    
    else{  // JUMP TO THE VIDEO TIME ASSOCIATED WITH GIVEN KEY
        if (record_pressed){
            arr.push(document.querySelector('.video-stream').currentTime)
            console.log(`e.timestamp ${e.timeStamp}`)
            times.push(Date.now()); //e.timestamp
            keys.push(hitcount);
            hitcount = hitcount+1;
        }
        console.log(e);
        console.log(e.key);

    }

};
    


arr = [];
times=[];
keys = [];
record_pressed = false;
demo_off = true;
first = true;
hitcount = 0;
t0 = Date.now(); // for accuracy offset
t1= Date.now(); // for accuracy offset

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
                looper();
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
    
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// LOOPS THROUGH RECORDED KEYS, JUMPS VIDEO, AND WAITS IN BETWEEN
async function looper() {
    for (let i = 0; i < times.length; i++) {
        console.log(`jumping to ${arr[keys[i]]}`)
        document.querySelector('.video-stream').currentTime = arr[keys[i]];
        

        // if the first entry, coordinate with the system clock
        // BY SLEEPING THE OFFSET, ALINING INTERTAB CLOCKS WITH METRONOME
        // if (i==0){
        //     console.log(`FIRST ${Date.now()%beat_ms}`);

        //     await (sleep(Date.now()%beat_ms));
        // }
        
        // SLEEP BETWEEN SAMPLES
        if (i < (times.length-1) && times.length > 1){
            t1 = Date.now();
            console.log(`t1: ${t1}`)

            offset = t1-t0;
            console.log(`offset: ${offset}`)
            console.log(`timediff: ${roundToNearest125(times[i+1]-times[i])}`)
            console.log(`times: ${times[i+1]}`)
            if (offset > 200){
                offset = 0;
            }

            // ALIGN WITH THE SYSTEM CLOCK TO REDUCE DRIFT
            if (i==0){
                offset = Date.now()%500

                await sleep(roundToNearest125(times[i+1])-(roundToNearest125(times[i])+(offset)));

            } else {
                await sleep(roundToNearest125(times[i+1]-times[i]));

            }

            // WAIT INBETWEEN LOGGED KEY PRESSES




            t0 = Date.now();
        } 
        
        
        // FOR THE LAST ENTRY, WAIT THE DISTANCE TO END OF LOOP
    
        if (i == (times.length - 1)) {
            console.log("LAST");

            beat_ms = 500; // half a second / 120 bpm
            num_beats = 8; // two 4/4 measures
            loop_ms = num_beats * beat_ms;
            ms_to_end = (times[0] + loop_ms) - times[i];
            begin = times[0]

            await sleep(ms_to_end);

            

        }



    }
    console.log('Done');
    
    // IF RECORD IS NOT PRESSED, REPEAT
    if (!record_pressed){
        looper();
    } else {
        console.log("LOOPER STOPPED");
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



// open metronome in tab 120bpm 8 beats is 4 seconds so 4000ms is the loop length
// record the key presses if record is on as a position in mod4000 space with units of ms
// for last key in list, jump diff between time value and 4000 plus 0 to the first key in list
arr=[];
times=[];
keys = [];
demo_off = false;
record_pressed = false;
first = true;

document.onkeydown = function (e) {
    if (e.key == 'r'){
    record_pressed = !record_pressed;
    if (record_pressed){
        console.log("RECORD ON")
        }else{console.log("RECORD OFF")}
    }
    else{
    document.querySelector('.video-stream').currentTime = arr[e.key]
    if (record_pressed){
        times.push(e.timeStamp)
        keys.push(e.key)
    }
    console.log(e);
    console.log(e.key);
    }


    if (demo_off && first){
        metronome(1000,"BEAT",totalbeats);
        first = false;
        }
    if (record_pressed){

        demo_off = true;
    } else {
    demo_off = false;
    }
};
    
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    for (let i = 0; i < times.length; i++) {
        document.querySelector('.video-stream').currentTime = arr[keys[i]];
        //if between samples
        if (i < (times.length-1)){
        await sleep(times[i+1]-times[i]);
        }
        // for last sample, break is between last sample and loop length
        //else{
        //await sleep((times[0]+16*1000)-times[i]);
        //}
    }
    console.log('Done');
    demo();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function metronome(len_ms,msg,repeats) {
    start = Date.now()
    for (let i = 0; i < repeats; i++) {
        console.log(Date.now()%loopmod)
        console.log(msg+i)

        await sleep(len_ms-50);

    }
    end = Date.now()
    console.log('Done');
    console.log(end-start);

}
looplen = 4;
totalbeats = looplen*4;
loopmod = Date.now()%2000;
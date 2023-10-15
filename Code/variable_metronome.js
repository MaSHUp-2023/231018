var t0 = Date.now();
var t1 = Date.now();
var played = false;
var bpm = 100;
var beatlen = 60000/bpm; 
var repeat = 8;
var i=0;
var color = true;

function preciseLog (){
    
    setTimeout(preciseLog, (5));
    if (((Date.now()%beatlen) < (beatlen/2)) && ((t1-t0)>(beatlen/2)) && !played){
        
        // hit metronome
        console.log("BEAT");

        //change color
        color = !color;
        if (color){
          changeBGColor('green');
          //playSound();
          }
        if (!color){
          //playSound();
          changeBGColor('orange');
        
        }


        //console.log(t1-t0);
        t0 = Date.now();
        played = true;
        i=(i+1)%repeat;
    }



    if ((t1-t0)>(beatlen/2)){
        played = false;

    }
    t1 = Date.now();
}

function changeBGColor(bgcol) {
    document.getElementById('start').style.backgroundColor = bgcol;
    }

document.onkeydown = function (e) {

    // Metronome change
    if (e.key == "["){
        bpm = bpm-1;
        beatlen = 60000/bpm;
        console.log(`bpm: ${Math.floor(bpm)} | beatlen: ${beatlen}`);

    }
    if (e.key == "]"){
        bpm = bpm+1;
        beatlen = 60000/bpm;
        console.log(`bpm: ${Math.floor(bpm)} | beatlen: ${beatlen}`);

    }
}
preciseLog();
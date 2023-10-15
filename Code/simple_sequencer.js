// SIMPLE 4 position sequencer TURN SAMPLES OFF/ON using z,x,c,v keys.

var t0 = Date.now();
var t1 = Date.now();
var played = false;
var beatlen = 500;
var seq = [1,0,0,0];
var repeat = 4;
var i=0;
var m=(document.querySelector('video').duration/10);



function preciseLog (){
    
    setTimeout(preciseLog, (5));
    if (((Date.now()%beatlen) < (beatlen/2)) && ((t1-t0)>(beatlen/2)) && !played){
        
        // if sequence is available
        if (seq[i]){
            document.querySelector('.video-stream').currentTime = m*(i+1);
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


document.onkeydown = function (e) {
    //Control Sequences
    if (e.key == 'z'){seq[0] = !seq[0];}
    if ((e.key == 'x')){seq[1] = !seq[1];}
    if ((e.key == 'c')){seq[2] = !seq[2];}
    if ((e.key == 'v')){seq[3] = !seq[3];}
    
}

preciseLog();
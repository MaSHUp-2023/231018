var t0 = Date.now();
var t1 = Date.now();
var played = false;
var i=0;
var m=2;
var repeat = 6;
var beatlen = 500; //triplets: 1000/3.;
// document.querySelector('video').duration <--- get the video length


function preciseLog (){
    
    setTimeout(preciseLog, (5));
    if (((Date.now()%beatlen) < (beatlen/2)) && ((t1-t0)>(beatlen/2)) && !played){
        document.querySelector('.video-stream').currentTime = i*m;
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
    //Change the distance between video jumps
    if (e.key == ']'){m=m+m;}
    if ((e.key == '[') && (m>0)){m=m-m;}
    // Change the number of repeats
    if ((e.key == 'a')){repeat = repeat/2;}
    if ((e.key == 's')){repeat = repeat*2;}
}

preciseLog();
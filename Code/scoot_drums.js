// https://www.youtube.com/watch?v=keizOu2yqDo dog howlz
// https://www.youtube.com/watch?v=nbAHzYQIf40 polka
// https://www.youtube.com/watch?v=MFy-XOpSVkE trumpet
// https://www.youtube.com/watch?v=m2lEgf-Fq4Y justtha2
// https://www.youtube.com/watch?v=LEwiuKrjSL0 kermit
// https://www.youtube.com/watch?v=fNIfbdi41ho&t=75s slow down eno
// https://www.youtube.com/watch?v=FXczL1j0wio mod syn
// https://www.youtube.com/watch?v=KZouh1Ouyw4 100bpm
// https://www.youtube.com/watch?v=1IhfcncdjI4 whistlin
// https://www.youtube.com/watch?v=Kn0Dj3Aj_80 raven
// https://www.youtube.com/watch?v=tqCfbOxAUuo djembe

var t0 = Date.now();
var t1 = Date.now();
var played = false;
var bpm = 100;
var beatlen = 60000/bpm; 
var keylist = ["q","w","e","r","z","x","c","v"];
var scooter = [",","."]
var seq = new Array(8).fill(0); // list of eight 0's
var lastkey = "";
var repeat = 8;
var i=0;
var m=(document.querySelector('video').duration/10);
var pos = [];
var scootlen = 0.1;
var TRIPLETS = false;
var DRUM_MODE = false;

function initiatePositions(){
    for (i=0;i<repeat;i++){
        pos[i] = m*(i+1);
    }

}



function preciseLog (){
    
    setTimeout(preciseLog, (5));
    if (((Date.now()%beatlen) < (beatlen/2)) && ((t1-t0)>(beatlen/2)) && !played){
        
        // if sequence is available
        if (seq[i]){
            document.querySelector('.video-stream').currentTime = pos[i];
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
    if (keylist.includes(e.key)){
        if (DRUM_MODE){
            document.querySelector('.video-stream').currentTime = pos[keylist.indexOf(e.key)];
        } else{
            seq[keylist.indexOf(e.key)] = !seq[keylist.indexOf(e.key)];

        }
        lastkey = e.key;
        console.log(seq);
    }

    // SCOOTER - scoots the sample start point
    if (scooter.includes(e.key))
    {
        let i = scooter.indexOf(e.key);
        let j = keylist.indexOf(lastkey);
        if (i){
            console.log(pos[j] + scootlen);
            console.log("forward");
            pos[j] = pos[j] + scootlen;
        } else {
            console.log(pos[j] - scootlen);
            console.log("back");
            pos[j] = pos[j] - scootlen;
        }
        
    }

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

    // Get new random position for lastkey 
    if (e.key == "n"){
        let j = keylist.indexOf(lastkey);
        pos[j] = Math.random()*document.querySelector('video').duration;
        console.log(`New random position: ${pos[j]}`)
    }

    if ((e.key == 'a')){repeat = repeat/2;}
    if ((e.key == 's')){repeat = repeat*2;}
    if ((e.key == 'u')){m=(document.querySelector('video').duration/10); initiatePositions();}

    // INITIATE DRUMMODEEEEE
    if ((e.key == 'd')){DRUM_MODE = !DRUM_MODE;}

    if (e.key == 'h'){m=m+5;initiatePositions();}
    if ((e.key == 'g') && (m>0)){m=m-5;initiatePositions();}

    if (e.key == 'y'){
        TRIPLETS = !TRIPLETS;
        if (TRIPLETS){
            repeat = 6;
            beatlen = beatlen*2/3;
            console.log("TRIPLETS")
        } 
        if (!TRIPLETS){
            console.log("4/4")
            repeat = 8;
            beatlen = beatlen*3/2;
        }
    }


}

initiatePositions();
preciseLog();
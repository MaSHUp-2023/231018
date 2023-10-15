var m = 250;
var d = 0.1; // 10%
var next = 1;

function preciseLog (){
    
    // next loop happens in "m" metronome interval * the note length integer (next)
    setTimeout(preciseLog, (m*next));

    // random video position
    let jump = Math.random() * (document.querySelector('video').duration);
    document.querySelector('.video-stream').currentTime = jump;

    // random note length
    //next = Math.floor(Math.random() * 4)+1;

}

preciseLog();

//let jump = Math.random() * (document.querySelector('video').duration);
//console.log(document.querySelector('video').duration)
//console.log(document.querySelector('.video-stream').currentTime)
//console.log(jump)

Math.floor(Math.random() * 4)+1;

document.onkeydown = function (e) {
    //Change the distance between video jumps
    if (e.key == ']'){m=Math.floor(m*(1+d));}
    if ((e.key == '[') && (m>0)){m=Math.floor(m*(1-d));}
}
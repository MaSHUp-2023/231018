var t0 = Date.now();
var t1 = Date.now();
var played = false;
var bpm = 100;
var beatlen = 60000/bpm; 
var repeat = 4;
var i=0;
var color = true;
var freq = 220;

// Create an audio context
var audioContext = new (window.AudioContext || window.webkitAudioContext)();


function playSound(freq){
  // Create a gain node
  var gainNode = audioContext.createGain();

  // Create an oscillator
  var oscillator = audioContext.createOscillator();

  // Connect the oscillator to the gain node
  oscillator.connect(gainNode);

  // Connect the gain node to the audio context's output
  gainNode.connect(audioContext.destination);

  // Set the volume (gain value should be between 0 and 1)
  gainNode.gain.value = 0.01;  // 50% volume

  // Set the frequency (440 Hz is the frequency of the note "A")
  oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

  // Connect the oscillator to the audio context's output
  oscillator.connect(audioContext.destination);

  // Start the oscillator
  oscillator.start();

  // Stop the oscillator after 2 seconds
  oscillator.stop(audioContext.currentTime + 0.1);
}


function preciseLog (){
    
    setTimeout(preciseLog, (1));
    if (((Date.now()%beatlen) < (beatlen/2)) && ((t1-t0)>(beatlen/2)) && !played){
        console.log(t1-t0);
        t0 = Date.now();
        
        // // hit metronome
        // if (i==0){freq = 440;}
        // playSound(freq);
        // if (i==0){freq = 220;}

        // //change color
        // color = !color;
        // if (color){
        //   changeBGColor('green');
        //   }
        // if (!color){
        //   changeBGColor('orange');
        
        // }



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
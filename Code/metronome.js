// Create an audio context
var audioContext = new (window.AudioContext || window.webkitAudioContext)();


function playSound(){
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
  oscillator.frequency.setValueAtTime(220, audioContext.currentTime);

  // Connect the oscillator to the audio context's output
  oscillator.connect(audioContext.destination);

  // Start the oscillator
  oscillator.start();

  // Stop the oscillator after 2 seconds
  oscillator.stop(audioContext.currentTime + 0.1);
}


function changeFontSize(fontSize) {
let paragraphs = document.querySelectorAll('div');
paragraphs.forEach((div) => {
  div.style.fontSize = fontSize;
});
}


function changeBGColor(bgcol) {
document.getElementById('start').style.backgroundColor = bgcol;
}


let startTime = performance.now();
var color = true;
var inval = 500;

function preciseLog() {

  const t_0 = performance.now();
  let currentTime = performance.now();
  let elapsedTime = currentTime - startTime;

  console.log(`Elapsed Time: ${elapsedTime} ms    `);
  

console.log(color);
  
  color = !color;
if (color){
  changeBGColor('green');
  //playSound();
  }
if (!color){
  //playSound();
  changeBGColor('red');

}


  startTime = currentTime; // reset startTime for next round
  
  //if (offset>50 || offset <-50){ offset = 0;}

  console.log(Date.now()%inval);
  const t_1 = performance.now();
  const offset = t_1-t_0;
  setTimeout(preciseLog, (inval - Date.now()%inval - offset));
}

preciseLog();






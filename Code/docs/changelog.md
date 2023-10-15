20230901 Looper working

Metronome (metronome.js) works, and there is some basic looping (loopin.js), but the timing of the looping does not yet coordinate with the system time with the metronome.

Next step would be to try to coordinate the loop but also figure out what to do at the beginning and end of loop.

One thing to try first is to make the first entry of each loop when the record button is pressed. Or, assume that the first loop sample entry is always the beginning of the loop at time 0. I think I will try the latter to start.

This is what I ended up doing, and it works OK. I think it needs more playing and exploration to see if it's really working. Quantization could help keep things aligned to system time.

Instructions:

note: all this works best (lowest latency) in Google Chrome, since youtube is a Google product

1. open any youtube video, and open the javascript console in the browser tools
2. copy metronome.js into the console and hit enter. this will start the metronome at 120bpm.
3. open another youtube video and open the javascript console.
4. copy in loopin.js and click the play button on the video.
5. hit "r" to start recording key presses.
6. hit 0-9 on the keyboard all within 8 beats of the metronome
7. hit "r" again to activate the loop

Trying quantization on the time differences sort of works, but also doesn't. You need to offset the latency when quantizing. Maybe there's a way to undershoot and then check the latency and wait to see if the expected hit is here.
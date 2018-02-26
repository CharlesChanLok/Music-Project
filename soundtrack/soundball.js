{/* <script src="./p5.min.js"></script> */}

var mic, recorder;

var state = 0;

function setup() {
  createCanvas(710, 200);

  // Create an Audio input
  mic = new p5.AudioIn();
  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();

    recorder = new p5.SoundRecorder();

    recorder.setInput(mic);

    // create an empty sound file that we will use to playback the recording
    soundFile = new p5.SoundFile();
}

function draw() {
  background(200);

  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with height based on volume
  var h = map(vol, 0, 1, height, 0);
  ellipse(width/2, h - 25, 50, 50);
}


function mousePressed() {
    // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
    if (state === 0 && mic.enabled) {
  
      // Tell recorder to record to a p5.SoundFile which we will use for playback
      recorder.record(soundFile);
  
      background(255,0,0);
      state++;
    }
  
    else if (state === 1) {
      recorder.stop(); // stop recorder, and send the result to soundFile

      background(0,255,0);
      text('Recording stopped. Click to play & save', 20, 20);
      state++;
    }
  
    else if (state === 2) {
      console.log(soundFile);
      soundFile.play(); // play the result!
      saveSound(soundFile, 'mySound.wav'); // save file
      state=0;
    }
  }


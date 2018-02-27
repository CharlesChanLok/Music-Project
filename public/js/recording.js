var mic, recorder, buttonRecord, buttonStop, buttonSave;
let volhistory = [];
var state = 0;

function setup() {
    createCanvas(300, 200);

    // Create an Audio input
    mic = new p5.AudioIn();
    // start the Audio Input.
    // By default, it does not .connect() (to the computer speakers)
    mic.start();

    recorder = new p5.SoundRecorder();

    recorder.setInput(mic);

    // create an empty sound file that we will use to playback the recording
    soundFile = new p5.SoundFile();

    buttonRecord = createButton('Record');
    buttonStop = createButton('Stop');
    buttonSave = createButton('Save');

    buttonRecord.mousePressed(BtRecord);

    buttonStop.mousePressed(BtStop);

    buttonSave.mousePressed(BtSave);

    noLoop()


}



function draw() {

    vol = mic.getLevel();


    volhistory.push(vol);
    background(0);
    stroke(255);
    noFill();
    beginShape();

    for (let i = 0; i < volhistory.length; i++) {
        let y = map(volhistory[i], 0, 1, height / 2, 0);
        vertex(i, y);
    }
    endShape();

    if (volhistory.length > width) {
        volhistory.splice(0, 1)
    }

    stroke(255, 0, 0);
    line(volhistory.length, 0, volhistory.length, height * 100)
}




function BtRecord() {
    volhistory.length = 0;
    recorder.record(soundFile);
    loop()
}

function BtStop() {
    recorder.stop();
    noLoop();
}

function BtSave() {
    saveSound(soundFile, 'mySound.wav');
    background(0)
}



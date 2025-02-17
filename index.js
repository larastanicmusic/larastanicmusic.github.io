let audioContext;
let oscillator1, oscillator2;
let gainNode1, gainNode2;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        gainNode1 = audioContext.createGain();
        gainNode2 = audioContext.createGain();
        gainNode1.connect(audioContext.destination);
        gainNode2.connect(audioContext.destination);
    }
}

function startOscillator1() {
    initAudio();
    if (oscillator1) oscillator1.stop(); // Stop previous oscillator if running
    oscillator1 = audioContext.createOscillator();
    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(document.getElementById('pitch1').value, audioContext.currentTime);
    gainNode1.gain.setValueAtTime(document.getElementById('volume1').value, audioContext.currentTime);
    oscillator1.connect(gainNode1);
    oscillator1.start();
}

function stopOscillator1() {
    if (oscillator1) {
        oscillator1.stop();
        oscillator1 = null; // Reset oscillator
    }
}

function startOscillator2() {
    initAudio();
    if (oscillator2) oscillator2.stop(); // Stop previous oscillator if running
    oscillator2 = audioContext.createOscillator();
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(document.getElementById('pitch2').value, audioContext.currentTime);
    gainNode2.gain.setValueAtTime(document.getElementById('volume2').value, audioContext.currentTime);
    oscillator2.connect(gainNode2);
    oscillator2.start();
}

function stopOscillator2() {
    if (oscillator2) {
        oscillator2.stop();
        oscillator2 = null; // Reset oscillator
    }
}

document.getElementById('startOsc1').addEventListener('click', startOscillator1);
document.getElementById('stopOsc1').addEventListener('click', stopOscillator1);
document.getElementById('startOsc2').addEventListener('click', startOscillator2);
document.getElementById('stopOsc2').addEventListener('click', stopOscillator2);

document.getElementById('pitch1').addEventListener('input', function() {
    document.getElementById('pitchValue1').textContent = this.value;
    if (oscillator1) {
        oscillator1.frequency.setValueAtTime(this.value, audioContext.currentTime);
    }
});

document.getElementById('volume1').addEventListener('input', function() {
    document.getElementById('volumeValue1').textContent = Math.round(this.value * 100);
    if (gainNode1) {
        gainNode1.gain.setValueAtTime(this.value, audioContext.currentTime);
    }
});

document.getElementById('pitch2').addEventListener('input', function() {
    document.getElementById('pitchValue2').textContent = this.value;
    if (oscillator2) {
        oscillator2.frequency.setValueAtTime(this.value, audioContext.currentTime);
    }
});

document.getElementById('volume2').addEventListener('input', function() {
    document.getElementById('volumeValue2').textContent = Math.round(this.value * 100);
    if (gainNode2) {
        gainNode2.gain.setValueAtTime(this.value, audioContext.currentTime);
    }
});

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const lapsEl = document.getElementById('laps');

function updateDisplay() {
    let time = elapsedTime;
    const minutes = Math.floor(time / 60000);
    time %= 60000;
    const seconds = Math.floor(time / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    millisecondsEl.textContent = String(milliseconds).padStart(2, '0');
}

function startTimer() {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
    }
}

function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(timerInterval);
    }
}

function resetTimer() {
    running = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    lapsEl.innerHTML = '';
}

function lapTimer() {
    if (running) {
        const lapTime = `${minutesEl.textContent}:${secondsEl.textContent}:${millisecondsEl.textContent}`;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapsEl.children.length + 1}: ${lapTime}`;
        lapsEl.appendChild(li);
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', lapTimer);

updateDisplay();

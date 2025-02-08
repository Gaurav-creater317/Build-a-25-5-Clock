let breakLength = 5;
let sessionLength = 25;
let timeLeft = sessionLength * 60;
let isRunning = false;
let isSession = true;
let timer;

const beep = document.getElementById("beep");

function updateDisplay() {
    document.getElementById("break-length").textContent = breakLength;
    document.getElementById("session-length").textContent = sessionLength;
    document.getElementById("time-left").textContent = formatTime(timeLeft);
    document.getElementById("timer-label").textContent = isSession ? "Session" : "Break";
}

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function startStopTimer() {
    if (isRunning) {
        clearInterval(timer);
    } else {
        timer = setInterval(() => {
            if (timeLeft === 0) {
                beep.play();
                isSession = !isSession;
                timeLeft = (isSession ? sessionLength : breakLength) * 60;
            } else {
                timeLeft--;
            }
            updateDisplay();
        }, 1000);
    }
    isRunning = !isRunning;
}

function resetClock() {
    clearInterval(timer);
    breakLength = 5;
    sessionLength = 25;
    timeLeft = sessionLength * 60;
    isRunning = false;
    isSession = true;
    beep.pause();
    beep.currentTime = 0;
    updateDisplay();
}

document.getElementById("break-decrement").addEventListener("click", () => {
    if (breakLength > 1) breakLength--;
    updateDisplay();
});

document.getElementById("break-increment").addEventListener("click", () => {
    if (breakLength < 60) breakLength++;
    updateDisplay();
});

document.getElementById("session-decrement").addEventListener("click", () => {
    if (sessionLength > 1) sessionLength--;
    timeLeft = sessionLength * 60;
    updateDisplay();
});

document.getElementById("session-increment").addEventListener("click", () => {
    if (sessionLength < 60) sessionLength++;
    timeLeft = sessionLength * 60;
    updateDisplay();
});

document.getElementById("start_stop").addEventListener("click", startStopTimer);
document.getElementById("reset").addEventListener("click", resetClock);

updateDisplay();

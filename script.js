const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapTimesList = document.getElementById('lapTimesList');
const noLapsMessage = document.getElementById('noLapsMessage');

let startTime;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 0;

function formatTime(num) {
    return num < 10 ? '0' + num : num;
}

function formatMilliseconds(num) {
    if (num < 10) return '00' + num;
    if (num < 100) return '0' + num;
    return num;
}

function updateDisplay() {
    const now = Date.now();
    const currentElapsedTime = now - startTime + elapsedTime;

    let ms = currentElapsedTime % 1000;
    let s = Math.floor(currentElapsedTime / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);

    s %= 60;
    m %= 60;

    millisecondsDisplay.textContent = formatMilliseconds(ms);
    secondsDisplay.textContent = formatTime(s);
    minutesDisplay.textContent = formatTime(m);
    hoursDisplay.textContent = formatTime(h);
}

function startStopwatch() {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);

    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    lapButton.disabled = false;
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;

    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    lapCounter = 0;

    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '000';

    lapTimesList.innerHTML = '';
    noLapsMessage.classList.remove('hidden');

    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
}

function recordLap() {
    lapCounter++;
    const currentLapTime = `${hoursDisplay.textContent}:${minutesDisplay.textContent}:${secondsDisplay.textContent}.${millisecondsDisplay.textContent}`;
    const listItem = document.createElement('li');
    listItem.className = 'py-2 border-b border-gray-200 last:border-b-0 flex justify-between items-center';
    listItem.innerHTML = `
        <span class="font-medium text-gray-700">Lap ${lapCounter}:</span>
        <span class="text-gray-900 font-semibold">${currentLapTime}</span>
    `;
    lapTimesList.prepend(listItem);

    noLapsMessage.classList.add('hidden');
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

window.onload = resetStopwatch;

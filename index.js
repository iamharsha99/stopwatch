let timer = null;
let startTime = 0;
let elapsedTime = 0;
let lapCount = 0; 
let display = document.getElementById("display");
let recordDiv = document.getElementById("record");
let running = false;

document.getElementById("start").onclick = () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        running = true;
    }
}

document.getElementById("stop").onclick = () => {
    if (running) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        running = false;
    }
}

document.getElementById("reset").onclick = () => {
    clearInterval(timer);
    display.innerHTML = "00:00:00:000";
    recordDiv.innerHTML = "";
    running = false;
    elapsedTime = 0;
    startTime = 0;
    lapCount = 0; // Reset lap count
}

document.getElementById("lap").onclick = () => {
    if (running) {
        lapCount++;
        let lapTime = elapsedTime;
        let lapDisplay = document.createElement("div");
        lapDisplay.innerText = `Lap ${lapCount}: ${formatTime(lapTime)}`;
        recordDiv.appendChild(lapDisplay);
    }
}

function update() {
    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.innerHTML = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    let hrs = Math.floor(milliseconds / (1000 * 60 * 60)).toString().padStart(2, "0");
    let mins = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
    let secs = Math.floor((milliseconds % (1000 * 60)) / 1000).toString().padStart(2, "0");
    let mili = Math.floor(milliseconds % 1000).toString().padStart(3, "0");
    return `${hrs}:${mins}:${secs}:${mili}`;
}

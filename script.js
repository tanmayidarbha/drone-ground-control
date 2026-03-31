// Fetch telemetry from backend
async function fetchTelemetry() {
    const response = await fetch('http://localhost:3000/telemetry');
    const data = await response.json();

    document.getElementById('battery').innerText = data.battery;
    document.getElementById('altitude').innerText = data.altitude;
    document.getElementById('mode').innerText = data.mode;
    document.getElementById('status').innerText = data.status;
}

// Change flight mode
async function setMode(mode) {
    const response = await fetch('http://localhost:3000/set-mode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mode: mode })
    });

    const result = await response.json();

    if (result.success) {
        document.getElementById('status').innerText = "Command Successful";
    } else {
        document.getElementById('status').innerText = "Command Failed";
    }
}

// Real-time update every second
setInterval(fetchTelemetry, 1000);

// Initial fetch
fetchTelemetry();

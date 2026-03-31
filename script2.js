async function fetchTelemetry() {
    try {
        const response = await fetch('http://localhost:3000/telemetry');
        const data = await response.json();

        console.log("Telemetry from server:", data);

        document.getElementById('battery').innerText = data.battery;
        document.getElementById('altitude').innerText = data.altitude;
        document.getElementById('mode').innerText = data.mode;
        document.getElementById('status').innerText = data.status;

    } catch (error) {
        console.error("Error fetching telemetry:", error);
    }
}

async function setMode(mode) {
    try {
        await fetch('/set-mode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mode: mode })
        });

        console.log("Mode command sent:", mode);

    } catch (error) {
        console.log("Error sending mode:", error);
    }
}

setInterval(fetchTelemetry, 1000);
fetchTelemetry();
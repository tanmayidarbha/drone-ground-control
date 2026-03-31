const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let telemetryData = {
    battery: 0,
    altitude: 0,
    gps: "Connected",
    speed: 0,
    mode: "LOITER",
    status: "Idle"
};

let currentModeCommand = "";
let command = "";

// Telemetry get
app.get('/telemetry', (req, res) => {
    res.json(telemetryData);
});

// Telemetry update
app.post('/update-telemetry', (req, res) => {
    console.log("Telemetry received:", req.body);
    telemetryData.battery = req.body.battery;
    telemetryData.altitude = req.body.altitude;
    telemetryData.speed = req.body.speed;
    telemetryData.mode = req.body.mode;

    res.json({ success: true });
});

// Mode set
app.post('/set-mode', (req, res) => {
    currentModeCommand = req.body.mode;
    telemetryData.mode = req.body.mode; 
    console.log("Mode requested:", currentModeCommand);
    res.json({ success: true });
});

// Mode get
app.get('/get-mode-command', (req, res) => {
    res.json({ mode: currentModeCommand });
    currentModeCommand = "";
});

// Command set
app.post('/send-command', (req, res) => {
    command = req.body.command;
    console.log("Command:", command);
    res.json({ success: true });
});

// Command get
app.get('/get-command', (req, res) => {
    res.json({ command: command });
    command = "";
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
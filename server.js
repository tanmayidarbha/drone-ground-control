const express = require('express');
const app = express();
app.use(express.json());


// ADD THIS CORS BLOCK
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Telemetry data storage (Data Layer)
let telemetryData = {
    battery: 95,
    altitude: 10,
    mode: "LOITER",
    status: "Idle"
};

// Valid flight modes
const validModes = [
    "LOITER",
    "ALTHOLD",
    "STABILIZE",
    "LAND",
    "GUIDED",
    "AUTO",
    "POSHOLD"
];

// Get telemetry
app.get('/telemetry', (req, res) => {
    res.json(telemetryData);
});

// Change flight mode (Control Layer)
app.post('/set-mode', (req, res) => {
    const mode = req.body.mode;

    if (validModes.includes(mode)) {
        telemetryData.mode = mode;
        telemetryData.status = "Mode changed to " + mode;
        console.log("Mode changed to:", mode);

        res.json({ success: true, mode: mode });
    } else {
        telemetryData.status = "Invalid mode";
        res.json({ success: false });
    }
});

// Update telemetry manually (for testing)
app.post('/update-telemetry', (req, res) => {
    telemetryData.battery = req.body.battery;
    telemetryData.altitude = req.body.altitude;

    res.json({ success: true });
});

setInterval(() => {
    telemetryData.battery -= 0.1;
    telemetryData.altitude += Math.random() * 2 - 1;
    telemetryData.speed = Math.random() * 10;

    if (telemetryData.battery < 0) telemetryData.battery = 100;
}, 1000);

app.listen(3000, '0.0.0.0', () => {
    console.log("Server running on port 3000");
});

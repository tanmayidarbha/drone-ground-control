# Web-Based Drone Ground Control Station (GCS)

## Project Overview
This project implements a web-based Ground Control Station for controlling and monitoring a drone using ArduPilot SITL. The system allows users to monitor telemetry data such as battery, altitude, speed, and flight mode, and send control commands like mode change, arm, takeoff, and land from a web interface.

The system integrates a web frontend, Node.js backend, Python MAVLink telemetry module, and ArduPilot SITL simulation.

---

## System Architecture
The system consists of multiple layers:

Web Interface → Node.js Server → Python MAVLink → ArduPilot SITL → QGroundControl

### Telemetry Flow
Drone → MAVLink → Python → Node.js → Web UI

### Control Flow
Web UI → Node.js → Python → MAVLink → Drone

---

## Technologies Used
- HTML
- CSS
- JavaScript (Fetch API)
- Node.js
- Express.js
- Python
- pymavlink
- MAVLink Protocol
- ArduPilot SITL
- MAVProxy
- QGroundControl
- GitHub

---

## Project Structure
drone-gcs/
│
├── index.html # Web interface dashboard
├── script.js # Frontend logic and API calls
├── style.css # UI styling
├── server.js # Node.js backend server
├── telemetry.py # Python MAVLink telemetry and control
├── package.json # Node dependencies
├── README.md # Project documentation
├── .gitignore
└── images/ # Background or UI images


---

## How the System Works

### 1. ArduPilot SITL
ArduPilot SITL simulates a drone and generates telemetry data such as altitude, speed, battery, and flight mode. It communicates using the MAVLink protocol.

### 2. telemetry.py (Python MAVLink Module)
This Python script connects to ArduPilot SITL using pymavlink and performs the following tasks:
- Reads MAVLink telemetry messages
- Extracts telemetry data (battery, altitude, speed, mode)
- Sends telemetry data to the Node.js server
- Receives commands from the server
- Sends commands to the drone via MAVLink

This script acts as a bridge between the drone and the Node.js server.

### 3. server.js (Node.js Backend)
The Node.js server acts as an API layer between the frontend and the Python MAVLink script.
It:
- Receives telemetry data from telemetry.py
- Stores telemetry data
- Sends telemetry data to the web interface
- Receives control commands from the web interface
- Sends commands to telemetry.py

### 4. Web Interface (HTML, CSS, JavaScript)
The web interface displays:
- Battery level
- Altitude
- Speed
- Flight mode
- Status

It also provides buttons for:
- GUIDED
- LOITER
- AUTO
- LAND
- STABILIZE
- ALTHOLD
- POSHOLD

JavaScript fetches telemetry data from the Node server every second and updates the UI.

---

## How To Run The Project

### Step 1 – Start ArduPilot SITL

---

## How the System Works

### 1. ArduPilot SITL
ArduPilot SITL simulates a drone and generates telemetry data such as altitude, speed, battery, and flight mode. It communicates using the MAVLink protocol.

### 2. telemetry.py (Python MAVLink Module)
This Python script connects to ArduPilot SITL using pymavlink and performs the following tasks:
- Reads MAVLink telemetry messages
- Extracts telemetry data (battery, altitude, speed, mode)
- Sends telemetry data to the Node.js server
- Receives commands from the server
- Sends commands to the drone via MAVLink

This script acts as a bridge between the drone and the Node.js server.

### 3. server.js (Node.js Backend)
The Node.js server acts as an API layer between the frontend and the Python MAVLink script.
It:
- Receives telemetry data from telemetry.py
- Stores telemetry data
- Sends telemetry data to the web interface
- Receives control commands from the web interface
- Sends commands to telemetry.py

### 4. Web Interface (HTML, CSS, JavaScript)
The web interface displays:
- Battery level
- Altitude
- Speed
- Flight mode
- Status

It also provides buttons for:
- GUIDED
- LOITER
- AUTO
- LAND
- STABILIZE
- ALTHOLD
- POSHOLD
JavaScript fetches telemetry data from the Node server every second and updates the UI.

---

## How To Run The Project

### Step 1 – Start ArduPilot SITL
cd ~/ardupilot
sim_vehicle.py -v ArduCopter --console --map --out=127.0.0.1:14550


### Step 2 – Start Node.js Server
cd ~/drone_gcs
node server2.js


### Step 3 – Start Telemetry Script
python3 telemetry.py


### Step 4 – Open Web Interface
Open browser and go to: http://localhost:3000/index.html

## System Architecture Diagram

Web Interface (HTML, JS)
↓
Node.js Server
↓
Python MAVLink Script
↓
MAVLink Protocol
↓
ArduPilot SITL
↓
QGroundControl

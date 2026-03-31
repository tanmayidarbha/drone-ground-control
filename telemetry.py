import time
import requests
from pymavlink import mavutil

master = mavutil.mavlink_connection('udp:127.0.0.1:14550')
master.wait_heartbeat()
master.mav.request_data_stream_send(
    master.target_system,
    master.target_component,
    mavutil.mavlink.MAV_DATA_STREAM_ALL,
    4,  # rate Hz
    1   # start
)
print("Connected to SITL")

telemetry = {
    "battery": 0,
    "altitude": 0,
    "gps": "Connected",
    "speed": 0,
    "mode": "LOITER"
}

while True:
    msg = master.recv_match(blocking=True)
    print(msg.get_type())
    

    if msg:
        msg_type = msg.get_type()

        if msg_type == "SYS_STATUS":
            telemetry["battery"] = msg.battery_remaining

        elif msg_type == "GLOBAL_POSITION_INT":
            telemetry["altitude"] = msg.relative_alt / 1000
        

        elif msg_type == "VFR_HUD":
            telemetry["speed"] = msg.groundspeed

        elif msg_type == "HEARTBEAT":
            mode = mavutil.mode_string_v10(msg)
            telemetry["mode"] = mode
            print("Current Mode:",mode)
        

    # SEND TELEMETRY TO SERVER
    try:
        response = requests.post(
            "http://localhost:3000/update-telemetry",
            json=telemetry
        )
        print("Sent telemetry:", telemetry)
    except Exception as e:
        print("Telemetry send error:", e)

    # GET MODE COMMAND FROM SERVER
    try:
        r = requests.get("http://localhost:3000/get-mode-command")
        
        if r.text !="":
            mode_data = r.json()
            mode = mode_data["mode"]
        else:
            mode=""

        if mode != "":
            print("Changing mode to:", mode)
            mode_mapping = master.mode_mapping()
            print("Available modes:", mode_mapping)

            if mode in mode_mapping:
                master.set_mode(mode_mapping[mode])
                print("Mode changed")
            else:
                print("Mode not found:", mode)

    except Exception as e:
        print("Mode command error:", e)

    time.sleep(1)
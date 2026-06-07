import json
from datetime import datetime

def log_event(step):

    try:
        with open("logs.json") as f:
            logs = json.load(f)
    except:
        logs = []

    logs.append({
        "step": step,
        "timestamp": str(datetime.now())
    })

    with open("logs.json", "w") as f:
        json.dump(logs, f)
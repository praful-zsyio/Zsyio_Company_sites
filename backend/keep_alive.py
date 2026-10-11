import threading
import time
import requests

def ping_server():
    # Render URL
    URL = "https://zsyio-company-1-4qcq.onrender.com/" 
    
    while True:
        try:
            response = requests.get(URL)
            print(f"Self-ping: Status {response.status_code}")
        except Exception as e:
            print(f"Self-ping failed: {e}")
        
        # Pings every 14 minutes (840 seconds)
        time.sleep(840)

def start_ping():
    # 'daemon=True' ensures it closes when the main server stops
    thread = threading.Thread(target=ping_server, daemon=True)
    thread.start()
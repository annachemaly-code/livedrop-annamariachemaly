import requests
import json
import datetime
import os



NGROK_URL = "ENTER_YOUR_NGROK_URL_HERE"  

# Endpoints
CHAT_ENDPOINT = f"{NGROK_URL}/chat"
PING_ENDPOINT = f"{NGROK_URL}/ping"
HEALTH_ENDPOINT = f"{NGROK_URL}/health"


# Log file path
LOG_FILE = os.path.join(os.path.dirname(__file__), "chat_log.txt")

# Functions
def check_health():
    #Check system status from /health endpoint
    try:
        resp = requests.get(HEALTH_ENDPOINT)
        if resp.status_code == 200:
            print("System status:", resp.json())
        else:
            print("Health check failed:", resp.status_code, resp.text)
    except Exception as e:
        print("Error connecting to health endpoint:", str(e))

def send_query(query):
    # Send query to /chat endpoint and display answer
    try:
        payload = {"query": query}
        resp = requests.post(CHAT_ENDPOINT, json=payload)

        if resp.status_code == 200:
            data = resp.json()
            answer = data.get("answer", "No answer provided.")
            sources = data.get("sources", "Not available")
            confidence = data.get("confidence", "Unknown")

            print("\nAnswer:", answer)
            print("Sources:", sources)
            print("Confidence:", confidence)

            log_conversation(query, f"{answer}\nSources: {sources}\nConfidence: {confidence}")
        else:
            print("Error from server:", resp.status_code, resp.text)
    except Exception as e:
        print("Error sending query:", str(e))


def log_conversation(query, answer):
    #Append conversation to a log file with timestamp
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}]\nQ: {query}\nA: {answer}\n{'-'*50}\n")

# Main CLI Loop
def main():
    print("Welcome to Shoplite LLM Chat Interface!")
    print("Type 'exit' to quit.\n")

    while True:
        user_input = input("> Your question: ").strip()
        if user_input.lower() == "exit":
            print("Exiting chat. Goodbye!")
            break
        elif user_input:
            print("[Retrieving context...]\n[Calling LLM...]")
            send_query(user_input)

# Entry point

if __name__ == "__main__":
    main()

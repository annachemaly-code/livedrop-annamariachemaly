export class SSEClient<T> {
  private url: string;
  private eventSource: EventSource | null = null;
  private onMessageCallback: ((data: T) => void) | null = null;

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    this.eventSource = new EventSource(this.url);

    this.eventSource.onmessage = (event) => {
      if (this.onMessageCallback) {
        this.onMessageCallback(JSON.parse(event.data));
      }
    };

    this.eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      this.close();
    };
  }

  onMessage(callback: (data: T) => void) {
    this.onMessageCallback = callback;
  }

  close() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

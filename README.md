# livedrop-annamariachemaly

### 1. Graph link
# System Design Graph
[Live Drop Architecture] (https://excalidraw.com/#json=7G9GWJ2Y-4kakcyrlfVig,xwbY1ak55_9zcIs4XnZr2Q)

### 2. Explanation
In this system design exercise, I created a high-level architecture for the "Live Drops" platform, which manages live product drops, user follows, and real-time notifications. The design ensures scalability, reliability, and fast response times: orders are processed asynchronously through a queue before reaching the notification service, while Redis caches hot data such as product availability and follow lists to reduce database load. Each service is loosely coupled, allowing independent scaling and maintenance. This approach prioritizes handling high traffic spikes, maintaining data consistency, and providing a smooth real-time experience for users.

### 3. Components
- **Clients:** Allow users to browse products/drops, follow creators, place orders, and receive notifications.
- **API Gateway:** Single entry point for requests.
- **Auth:** Manages user permissions.
- **Follows Service:** Stores follow relationships, uses Redis cache to handle celebrity creators efficiently.
- **Products Service:** Manages product creation and browsing.
- **Drops Service:** Handles scheduling and live drop management, ensures accurate stock counts.
- **Orders Service:** Manages order placement with idempotency keys and prevents overselling using DB transactions and Redis atomic counters.
- **Notification Service:** Sends real-time updates to users (drop started, low stock, order confirmed).
- **Database:** Stores all persistent data (Users, Creators, Products, Drops, Orders, Follows, Notifications).
- **Redis (Cache):** Speeds up frequently accessed data such as stock counts, product info, and follower lists.
- **Queue (Kafka):** Handles asynchronous events like notifications to prevent system overload.

### 4. Tradeoffs & Caching Strategy
-	**Queue:** Handles asynchronous tasks like notifications to prevent service overload.
-	**Redis:** Caches frequently accessed data for faster reads and reduced database load.
-	**Monitoring:** Tracks system performance and alerts on failures or bottlenecks.
-	**Security:** Ensures authentication, authorization, and encrypted communication.
-	**Pagination:** Splits large datasets into pages for efficient API responses.
-	**Idempotency:** Prevents duplicate orders when the same request is submitted multiple times


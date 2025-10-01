# Ground Truth Q&A: Shoplite

### Q01: What information is required to register a buyer account on Shoplite?
**Expected retrieval context:** Document 1: Shoplite User Registration Process  
**Authoritative answer:** Users must provide their full name, email address, and a secure password, then verify their email within 24 hours.  
**Required keywords in LLM response:** ["full name", "email address", "password", "email verification"]  
**Forbidden content:** ["tax ID", "bank account", "business documents"]

### Q02: What payment methods are supported on Shoplite?
**Expected retrieval context:** Document 5: Shoplite Payment Methods 
**Authoritative answer:** Users can pay using credit/debit cards, mobile wallets such as OMT, or cash on delivery.  
**Required keywords in LLM response:** ["credit card", "debit card", "mobile wallet", "cash on delivery"]  
**Forbidden content:** ["cheques", "Bitcoin", "unsupported mobile apps"]

### Q03: What types of products cannot be returned on Shoplite?
**Expected retrieval context:** Document 7: Shoplite Return and Refund Policies  
**Authoritative answer:** Non-returnable products include digital downloads, perishable goods, and personalized items.  
**Required keywords in LLM response:** ["digital downloads", "perishable goods", "personalized items"]  
**Forbidden content:** ["all items are returnable", "no restrictions"]

### Q04: How long does seller verification usually take?
**Expected retrieval context:** Document 1: Shoplite User Registration Process + Document 9: Shoplite Seller Account Setup  
**Authoritative answer:** Verification usually takes 2–3 business days.  
**Required keywords in LLM response:** ["2-3 business days", "verification process"]  
**Forbidden content:** ["instant", "same-day"]

### Q05: How can buyers track the status of their orders?
**Expected retrieval context:** Document 6: Shoplite Order Tracking and Delivery  
**Authoritative answer:** Buyers can track their orders using a unique tracking number via their account dashboard, email, or SMS notifications.  
**Required keywords in LLM response:** ["tracking number", "dashboard", "email", "SMS notifications"]  
**Forbidden content:** ["no tracking", "manual tracking only"]

### Q06: What security measures protect user accounts on Shoplite?
**Expected retrieval context:** Document 15: Shoplite Security and Privacy + Document 1: Shoplite User Registration Process  
**Authoritative answer:** Accounts are protected by secure passwords, optional two-factor authentication, session timeouts, and encryption of sensitive data.  
**Required keywords in LLM response:** ["password", "two-factor authentication", "session timeout", "encryption"]  
**Forbidden content:** ["no security", "plain text storage"]

### Q07: How are promotional codes applied during checkout?
**Expected retrieval context:** Document 16: Shoplite Promo Codes + Document 4: Shoplite Checkout Process  
**Authoritative answer:** Buyers enter the promo code in the designated field at checkout; the system validates it and applies discounts in real time.  
**Required keywords in LLM response:** ["promo code", "checkout", "real time", "discount"]  
**Forbidden content:** ["manual discount only", "invalid codes accepted"]

### Q08: Which mobile features allow buyers to interact with products directly?
**Expected retrieval context:** Document 13: Shoplite Mobile App Features  
**Authoritative answer:** Buyers can scan QR codes or barcodes to add products and use the camera to upload product images.  
**Required keywords in LLM response:** ["QR code", "barcode", "camera", "mobile app"]  
**Forbidden content:** ["desktop-only features", "no scanning capability"]

### Q09: How does Shoplite support buyers and sellers through customer service?
**Expected retrieval context:** Document 12: Customer Support + Document 6: Order Tracking and Delivery + Document 9: Seller Account Setup  
**Authoritative answer:** Users can contact support via email, chat, or phone. Tickets are tracked until resolved, with high-priority issues addressed promptly. Sellers receive dedicated guidance for account setup, inventory, promotions, and disputes.  
**Required keywords in LLM response:** ["email", "chat", "phone", "ticket tracking", "dedicated support"]  
**Forbidden content:** ["no support", "self-service only"]

### Q10: How can buyers use Shoplite to find products with specific ratings and reviews?
**Expected retrieval context:** Document 2: Product Search + Document 8: Product Reviews and Ratings  
**Authoritative answer:** Buyers can filter search results by star ratings, review date, and verified purchase status. Product pages display aggregated ratings, and related recommendations help users find similar highly-rated items.  
**Required keywords in LLM response:** ["filter", "star ratings", "verified purchase", "recommendations"]  
**Forbidden content:** ["ignore ratings", "unverified reviews only"]

### Q11: How can developers integrate external applications with Shoplite for inventory and order management?
**Expected retrieval context:** Document 14: API Documentation + Document 10: Inventory Management + Document 6: Order Tracking and Delivery  
**Authoritative answer:** Developers can use Shoplite’s RESTful API with API keys to fetch product details, update inventory, manage orders, and receive real-time notifications via webhooks for stock changes or new orders.  
**Required keywords in LLM response:** ["RESTful API", "API key", "inventory update", "webhooks", "order management"]  
**Forbidden content:** ["manual integration only", "no authentication"]

### Q12: How does Shoplite handle inventory when multiple buyers attempt to purchase the same product at the same time?  
**Expected retrieval context:** Document 3: Shopping Cart + Document 10: Inventory Management + Document 6: Order Tracking and Delivery  
**Authoritative answer:** When multiple buyers add the same product to their carts simultaneously, Shoplite temporarily reserves stock for each buyer. During checkout, inventory is decremented in real time. If stock runs out before payment, the affected buyer is immediately notified and the order is canceled.  
**Required keywords in LLM response:** ["simultaneous buyers", "stock reservation", "real-time decrement", "order cancellation", "buyer notification"]  
**Forbidden content:** ["overselling allowed", "manual stock adjustment only"]

### Q13: How does Shoplite ensure secure payment and privacy during checkout on mobile and desktop?  
**Expected retrieval context:** Document 4: Checkout Process + Document 5: Payment Methods + Document 15: Security and Privacy + Document 13: Mobile App Features  
**Authoritative answer:** Payments are encrypted using SSL/TLS. Supported methods include credit/debit cards and mobile wallets. Mobile apps follow secure session protocols, while desktop users benefit from browser-based encryption and session management. Sensitive data is never stored in plain text.  
**Required keywords in LLM response:** ["SSL/TLS", "credit/debit card", "mobile wallet", "encryption", "secure session", "desktop", "mobile app"]  
**Forbidden content:** ["plain text storage", "unsecured payment", "unsupported payment methods"]

### Q14: What steps should a buyer follow if an order is delayed or partially delivered?
**Expected retrieval context:** Document 6: Order Tracking and Delivery + Document 12: Customer Support + Document 7: Return and Refund Policies  
**Authoritative answer:** Buyers should first check their tracking number  on the dashboard or in email/SMS notifications; if the order is delayed or partially delivered, they can contact customer support via email, chat, or phone. Refunds or replacement options are provided according to the return policy.  
**Required keywords in LLM response:** ["tracking number", "dashboard", "customer support", "email", "chat", "phone", "refunds", "replacement"]  
**Forbidden content:** ["no support", "manual resolution only"]

### Q15: How can sellers create bundled offers and track which products are selling fastest?
**Expected retrieval context:** Document 9: Seller Account Setup + Document 10: Inventory Management + Document 8: Product Reviews and Ratings  
**Authoritative answer:** Sellers can create bundled offers by grouping products in the dashboard. Sales reports show which items in bundles sell fastest, and reviews help identify popular products for future bundles.  
**Required keywords in LLM response:** ["bundled offers", "sales reports", "popular products", "reviews"]  
**Forbidden content:** ["manual tracking only", "ignore reviews"]

### Q16: How can buyers save their favorite products for later purchase?
**Expected retrieval context:** Document 3: Shopping Cart + Document 13: Mobile App Features  
**Authoritative answer:** Buyers can add products to a wishlist or mark them as favorites on the dashboard or mobile app, allowing easy access for future purchases.  
**Required keywords in LLM response:** ["wishlist", "favorites", "dashboard", "mobile app"]  
**Forbidden content:** ["no save option", "manual bookmarking only"]

### Q17: How does Shoplite prevent overselling of products under normal conditions?  
**Expected retrieval context:** Document 3: Shopping Cart + Document 10: Inventory Management + Document 4: Checkout Process  
**Authoritative answer:** Shoplite continuously updates inventory whenever items are added to carts or purchased. This ensures stock levels remain accurate. Buyers are notified if an item becomes unavailable before checkout, preventing overselling during normal traffic and high-demand periods.  
**Required keywords in LLM response:** ["inventory updates", "overselling prevention", "checkout notification", "stock accuracy", "high-demand items"]  
**Forbidden content:** ["overselling allowed", "manual stock adjustment only"]

### Q18: How does Shoplite calculate commissions for sellers?
**Expected retrieval context:** Document 11: Commission and Fees + Document 9: Seller Account Setup  
**Authoritative answer:** Shoplite charges a commission for each completed sale, with rates varying by product category. Commissions are automatically deducted before the seller receives the remaining balance. Sellers can view rates and historical commission reports on their dashboard.  
**Required keywords in LLM response:** ["commission", "completed sale", "product category", "dashboard", "historical reports"]  
**Forbidden content:** ["manual calculation only", "no fees applied"]

### Q19: How does Shoplite handle order cancellations and refund adjustments for sellers?
**Expected retrieval context:** Document 11: Commission and Fees + Document 7: Return and Refund Policies  
**Authoritative answer:** When an order is canceled or refunded, Shoplite automatically adjusts the seller’s commission and payout amounts. Sellers are notified of these changes via email and on their dashboard, ensuring accurate final payments.  
**Required keywords in LLM response:** ["order cancellation", "refund adjustment", "commission", "dashboard", "email"]  
**Forbidden content:** ["manual adjustment only", "no notification"]

### Q20: How does Shoplite use product reviews, ratings, and search data to improve recommendations and inventory decisions?
**Expected retrieval context:** Document 2: Product Search + Document 8: Product Reviews and Ratings + Document 10: Inventory Management
**Authoritative answer:** Shoplite analyzes customer reviews, ratings, and search behavior to identify trending products and preferences. This data informs product recommendations shown to buyers, helps prioritize restocking of popular items, and guides sellers in optimizing inventory levels. Aggregated insights also influence promotional campaigns and bundling strategies.
**Required keywords in LLM response:** ["reviews", "ratings", "search behavior", "product recommendations", "inventory optimization", "trending products", "promotions"]
**Forbidden content:** ["ignore ratings", "manual guesses only", "no recommendations"]
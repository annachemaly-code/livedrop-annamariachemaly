
## Retrieval Quality Tests (10 tests)
| Test ID | Question | Expected Documents | Pass Criteria |
|---------|----------|-------------------|---------------|
| R01 | What information is required to register a buyer account on Shoplite? | Shoplite User Registration Process | Retrieved docs contain expected title |
| R02 | What payment methods are supported on Shoplite? | Shoplite Payment Methods | Retrieved docs contain expected title |
| R03 | How long does seller verification usually take? | Shoplite User Registration Process, Shoplite Seller Account Setup | Retrieved docs contain all relevant titles |
| R04 | How can buyers track the status of their orders? | Shoplite Order Tracking | Retrieved docs contain expected title |
| R05 | What security measures protect user accounts on Shoplite? | Shoplite Security and Privacy, Shoplite User Registration Process | Retrieved docs contain all relevant titles |
| R06 | How are promotional codes applied during checkout? | Shoplite Promo Codes, Shoplite Checkout Process | Retrieved docs contain all relevant titles |
| R07 | How does Shoplite support buyers and sellers through customer service? | Shoplite Customer Support, Shoplite Order Tracking, Shoplite Seller Account Setup | Retrieved docs contain all relevant titles |
| R08 | How can buyers use Shoplite to find products with specific ratings and reviews? | Product Search, Product Reviews and Ratings | Retrieved docs contain all relevant titles |
| R09 | How can buyers save their favorite products for later purchase? | Shopping Cart, Mobile App Features | Retrieved docs contain all relevant titles |
| R10 | How does Shoplite handle order cancellations and refund adjustments for sellers? | Commission and Fees, Return and Refund Policies | Retrieved docs contain all relevant titles |

## Response Quality Tests (15 tests)  
| Test ID | Question | Required Keywords | Forbidden Terms | Expected Behavior |
|---------|----------|------------------|----------------|-----------------|
| Q01 | What information is required to register a buyer account on Shoplite? | ["full name", "email address", "password", "email verification"] | ["tax ID", "bank account", "business documents"] | Direct answer with citation from Shoplite User Registration Process |
| Q02 | What payment methods are supported on Shoplite? | ["credit card", "debit card", "mobile wallet", "cash on delivery"] | ["cheques", "Bitcoin", "unsupported mobile apps"] | Direct answer with citation from Shoplite Payment Methods |
| Q03 | How long does seller verification usually take? | ["2-3 business days", "verification process"] | ["instant", "same-day"] | Direct answer synthesizing User Registration Process and Seller Account Setup |
| Q04 | How can buyers track the status of their orders? | ["tracking number", "dashboard", "email", "SMS notifications"] | ["no tracking", "manual tracking only"] | Step-by-step instructions citing Shoplite Order Tracking |
| Q05 | What security measures protect user accounts on Shoplite? | ["password", "two-factor authentication", "session timeout", "encryption"] | ["no security", "plain text storage"] | Multi-source synthesis from Security & Privacy and User Registration Process |
| Q06 | How are promotional codes applied during checkout? | ["promo code", "checkout", "real time", "discount"] | ["manual discount only", "invalid codes accepted"] | Step-by-step example citing Promo Codes and Checkout Process |
| Q07 | Which mobile features allow buyers to interact with products directly? | ["QR code", "barcode", "camera", "mobile app"] | ["desktop-only features", "no scanning capability"] | Direct answer citing Mobile App Features |
| Q08 | How does Shoplite support buyers and sellers through customer service? | ["email", "chat", "phone", "ticket tracking", "dedicated support"] | ["no support", "self-service only"] | Multi-source explanation citing Customer Support, Order Tracking, Seller Account Setup |
| Q09 | How can buyers use Shoplite to find products with specific ratings and reviews? | ["filter", "star ratings", "verified purchase", "recommendations"] | ["ignore ratings", "unverified reviews only"] | Step-by-step explanation citing Product Search and Reviews |
| Q10 | How can buyers save their favorite products for later purchase? | ["wishlist", "favorites", "dashboard", "mobile app"] | ["no save option", "manual bookmarking only"] | Direct answer citing Shopping Cart and Mobile App Features |
| Q11 | How does Shoplite handle inventory when multiple buyers attempt to purchase the same product simultaneously? | ["simultaneous buyers", "stock reservation", "real-time decrement", "order cancellation", "buyer notification"] | ["overselling allowed", "manual stock adjustment only"] | Multi-source synthesis citing Shopping Cart, Inventory Management, Order Tracking |
| Q12 | How does Shoplite ensure secure payment and privacy during checkout on mobile and desktop? | ["SSL/TLS", "credit/debit card", "mobile wallet", "encryption", "secure session", "desktop", "mobile app"] | ["plain text storage", "unsecured payment", "unsupported payment methods"] | Step-by-step explanation citing Checkout Process, Payment Methods, Security, Mobile App Features |
| Q13 | What steps should a buyer follow if an order is delayed or partially delivered? | ["tracking number", "dashboard", "customer support", "email", "chat", "phone", "refunds", "replacement"] | ["no support", "manual resolution only"] | Step-by-step instructions citing Order Tracking, Customer Support, Return & Refund Policies |
| Q14 | How can sellers create bundled offers and track which products are selling fastest? | ["bundled offers", "sales reports", "popular products", "reviews"] | ["manual tracking only", "ignore reviews"] | Direct answer citing Seller Account Setup, Inventory Management, Product Reviews |
| Q15 | How does Shoplite use product reviews, ratings, and search data to improve recommendations and inventory decisions? | ["reviews", "ratings", "search behavior", "product recommendations", "inventory optimization", "trending products", "promotions"] | ["ignore ratings", "manual guesses only", "no recommendations"] | Multi-source synthesis citing Product Search, Reviews and Ratings, Inventory Management |

## Edge Case Tests (5 tests)
| Test ID | Scenario | Expected Response Type |
|---------|----------|----------------------|
| E01 | Question not in knowledge base | Refusal with polite explanation citing lack of information |
| E02 | Ambiguous question | Clarification request asking which aspect the user means |
| E03 | Conflicting information in documents | Explain the correct information clearly, using multiple documents|
| E04 | Extremely complex question with multiple sub-questions | Step-by-step answer breaking it into parts, citing relevant documents for each part |
| E05 | Question non-standard terms | Clarification request suggesting the user's intended meaning |

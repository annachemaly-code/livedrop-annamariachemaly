## Knowledge Base

## Document 1: Shoplite User Registration Process

To create a Shoplite account, buyers visit the registration page and provide their full name, email address, and a secure password. Users must verify their email within 24 hours via a verification link.

After authentication, buyers can enjoy all shopping functionalities, such as product browsing, product addition to the shopping cart, order placement and order history. Two-factor authentication is optional but recommended in terms of security and it can be enabled by users with the help of an authenticator application or SMS code. 

The registration process of sellers has to be conducted in a more thorough way, they have to provide business documents such as a tax ID, bank account information, and a business registration. Shoplite staff checks through these documents and verification usually takes 2-3 business days. Authenticated sellers have the ability to make a listing, maintain inventory, sales analytics cards, and access dashboards. In the process of verification, sellers receive emails informing about documents that are lacking or not fully provided to them. 

The password recovery feature of Shoplite is also enabled with a 30 minute reset link. When there are issues with several failed attempts to gain access, then the accounts are disabled. The users can keep track of logins, purchases, and profile modification via activity logs to keep their profile secure.

**Overlap:** This document links to **Document 9: Shoplite Seller Account Setup**, since registration is required for sellers to access dashboards and manage inventory. It also connects to **Document 3: Shoplite Shopping Cart** and **Document 2: Shoplite Product Search**, as buyers must have an active account to use these features.


## Document 2: Shoplite Product Search

The search system on Shoplite is highly effective, enabling users to quickly find items using keywords, categories, price ranges, brands, sellers, and ratings. The search bar features autocomplete, which dynamically updates as the user types, enhancing search accuracy. Users can filter results using multiple parameters simultaneously, such as availability, shipping options, or buyer reviews, and sort results by relevance, price, or popularity.

To improve performance and reduce server load, the search system uses a five-minute cache. Users can access their recent searches, save favorite searches, and receive alerts when new products matching their criteria are added. For mobile users, Shoplite provides responsive search results with optimized data requests for fast loading and smooth browsing.

Advanced search is available for power users, allowing complex queries that combine category filters, price ranges, and seller ratings. This feature is particularly useful for buyers searching for niche products or comparing multiple sellers. Developers can access the Shoplite API to integrate search functionality into third-party applications, providing programmatic access to product data.

Search results display product rankings, images, availability, and shipping estimates. Out-of-stock products are clearly indicated, and related products or recommendations are shown when searches are vague or return few results, improving user experience.

**Overlap:** This document links to **Document 1: Shoplite User Registration Process**, as only registered users can save searches and alerts. It also connects to **Document 3: Shoplite Shopping Cart**, since users search for products to add to their cart, and **Document 13: Shoplite Mobile App Features**, because search functionality is fully integrated in the mobile app.


## Document 3: Shoplite Shopping Cart

The Shoplite shopping cart will enable buyers to add various items from sellers and manage quantities and save the products to purchase in the future. The products in the cart are stored in between sessions in case of a logged-in user, and the shopping experience is continuous on both desktop and mobile platforms. The user can see an overview of the items displayed, in terms of images, prices and estimated shipping and taxes. Discounts, promotional codes, and loyalty points can be applied directly within the cart before checkout. 

Users can edit quantities, remove items, or move products to a wishlist. Cart updates are reflected in real-time, showing updated totals including shipping and taxes. The system prevents adding more items than are currently in stock and provides warnings if an item becomes unavailable after being added to the cart. Shoplite also stores a limited history of recently removed items to allow users to restore them easily if desired.   

To the sellers, the shopping cart communicates with the inventory management system enabling automatic updating of stock quantities upon completion of an order. Sellers are notified when the products in the cart are low in stock or when they are temporarily out of stock. Shoplite is used to make sure that multiple buyers can buy simultaneously without overselling at the cost of real time stock verification and atomic transactions.

The cart integrates with Shoplite’s payment system, allowing users to select their preferred payment method by credit card, mobile wallets or cash on delivery and review order summaries before confirming the purchase.The users receive confirmation mail on the items, totals, shipping and approximate delivery dates.

**Overlap:** This document links to **Document 2: Shoplite Product Search**, since users must locate items before adding them to the cart. It also connects to **Document 4: Shoplite Checkout Process** and **Document 16: Shoplite Promo Codes**, as the cart feeds into checkout and discounts affect order totals. Additionally, it relates to **Document 10: Shoplite Inventory Management**, because cart updates impact available stock in real time.

## Document 4: Shoplite Checkout Process

The Shoplite checkout process allows users to securely complete purchases for items in their shopping cart. After reviewing their cart contents, users proceed to the checkout page, where they confirm shipping addresses, select delivery options, and choose a payment method. Available payment methods include credit/debit cards, mobile wallets, and cash on delivery (COD). The system automatically computes the total cost, which includes item prices, shipping charges, taxes, and any discounts or promotion codes that might be applied.

Users can store multiple shipping addresses and select a preferred address at checkout. The system provides approximate delivery dates based on shipping speed and location. First-time buyers are prompted to confirm billing information to avoid errors. Gift messages can be added, loyalty points applied, and final order details reviewed before payment is confirmed. The interface highlights any missing or incomplete information to prevent failed transactions.

Shoplite implements several security measures at checkout. Credit/debit card and mobile wallet payment details are encrypted using industry-standard protocols. High-value orders may require two-factor authentication. Once payment is successfully processed, confirmation emails are sent, including the order summary, payment details, shipping information, and estimated delivery dates.

For sellers, completed orders automatically update inventory levels and record sales data. Shoplite ensures that concurrent purchases are handled correctly, preventing overselling through real-time stock checks and atomic transactions. Refunds and cancellations are supported within defined timeframes, and all transactions are logged for auditing purposes.

**Overlap:** This document links to **Document 3: Shoplite Shopping Cart**, since checkout relies on items in the cart. It also connects to **Document 16: Shoplite Promo Codes**, because discounts applied at checkout depend on active codes, and to **Document 2: Shoplite Product Search**, as users must first locate items to purchase.

## Document 5: Shoplite Payment Methods

Shoplite offers various secure methods of payment in order to finalize the purchases done within the shopping cart and check out processes. Users have the opportunity to pay by credit or debit cards issued by the local banks, which is transacted safely through encrypted connection. For buyers who do not want to use cards online, cash on delivery (COD) is accepted, where they can pay on delivery. Furthermore, Shoplite accepts mobile wallets including OMT, so a user can directly pay with a smartphone.

The system will compute the overall cost of a payment, which includes item prices, shipping costs and taxes, along with any discounts or promotions. Before paying, a summarized version of the payment is made visible to the users. Shoplite also allows saving preferred payment methods for faster checkout in future orders, while still requiring user confirmation for security purposes.

To protect financial information, all transactions use industry-standard encryption protocols, preventing unauthorized access during transmission. Large payments might have to undergo further authentication procedures like two-factor authentication. Users are also sent confirmation emails when their payment is successful and these emails include the details of the transaction, order summary, and approximate delivery dates.

To sellers, the successful payments will automatically update the inventory and save the sales information. Orders of cash-on-delivery are set as pending till the delivery is confirmed, so that the completed and pending payments can be tracked correctly.

**Overlap:** This document links to **Document 3: Shoplite Shopping Cart** and **Document 4: Shoplite Checkout Process**, because payment can only be processed after items are added to the cart and checkout is completed. It also relates to **Document 16: Shoplite Promo Codes**, as discounts applied to the order will affect the final payment amount.

## Document 6: Shoplite Order Tracking

Shoplite will have a detailed order tracking and delivery system that will keep buyers updated on purchases up until delivery. Once an order is placed, the user is given a tracking number by which that particular order is associated. This number enables them to track the progress of their order in real-time and see the processing, shipment, transit and delivery phases in real time.

Buyers will be able to get tracking details either on their account dashboard or by receiving email and SMS notifications. Shoplite provides approximate delivery time depending on the shipping method and destination. The system has standard and express delivery options, and it will automatically adjust the expected delivery dates in case of any delays that could be caused by weather, stock shortages, or carrier-related problems.

The platform allows the use of various delivery providers to be reliable and flexible. Delivery notifications include detailed information about the package location, expected arrival, and any special instructions. With mobile users, Shoplite sends push notifications to inform its users that the package has been delivered or is about to be delivered.

To sellers, Shoplite incorporates inventory management with order fulfillment. Shipment labels are printable on-site and sellers are notified when any packages are delayed or returned. Orders that are indicated as delivered will update inventory and sales reports automatically. Cancellations and returns are also done effectively through the system whereby, tracking data is updated and notifications sent to the buyers and sellers.

**Overlap:** This document links to **Document 4: Shoplite Checkout Process** and **Document 3: Shoplite Shopping Cart**, as tracking applies to items that have been successfully ordered. It also relates to **Document 5: Shoplite Payment Methods**, since payment confirmation is required before shipments are processed.

# Document 7: Shoplite Return and Refund Policies

Shoplite provides a clear and structured return and refund policy to ensure buyer satisfaction. Buyers can return products within 14 days of receipt, provided the items are unused, in their original packaging, and accompanied by a receipt or proof of purchase. Certain items, such as digital downloads, perishable goods, and personalized products, are non-returnable.

To initiate a return, users access their account dashboard and select the order they wish to return. They can specify the reason for the return using predefined categories, such as defective items, incorrect products, or dissatisfaction. Once a return request is submitted, Shoplite generates a return authorization and shipping label for physical products. Users can track the status of their return, including label generation, item receipt, and refund processing.

Refunds are typically processed within 5–7 business days after the returned item is received and inspected. Refunds are issued to the original payment method or, upon request, as store credit. Shoplite sends email notifications at each stage to ensure transparency.

For sellers, Shoplite provides guidance for inspecting returned items and updating inventory. Refunds are automatically deducted from the seller’s account balance. Records of returns and refunds are maintained for auditing and reporting purposes.

Shoplite encourages buyers to contact customer support for issues such as missing shipping labels or delayed refunds. A transparent return policy helps maintain buyer confidence and minimizes conflicts between buyers and sellers.

**Overlap:** This document links to **Document 4: Shoplite Checkout Process**, since returns and refunds apply to purchased orders; **Document 3: Shoplite Shopping Cart**, because items added to the cart may later be returned; and **Document 5: Shoplite Payment Methods**, as refunds must be processed using the original payment method.

## Document 8: Shoplite Product Reviews

Shoplite gives buyers the option to leave comprehensive reviews and ratings on products purchased so that other users may make informed choices. Users are also allowed to rate products on a 1 to 5 stars scale after making a purchase followed by the text review of the experience. The commentary in reviews can involve comments on quality of products, speed of shipping and responsiveness of the seller. The purchasers have the option of adding pictures to their reviews as well.

To guarantee quality of reviews, Shoplite will only allow the user to leave a review after buying the product. Reviews are moderated automatically using AI to detect inappropriate language, spam, or false claims. Marked reviews are forwarded to the moderation team where they are manually verified. Verified reviews are displayed with the reviewer’s name, purchase date, and optional profile information, ensuring transparency and trustworthiness.  

For the sellers, Shoplite offers a dashboard where they can track the reviews and rating of their products. The ratings are compiled into an average score, which is presented on the product page, and the trends over time are analyzed to give sellers insight into customer satisfaction. Sellers can respond publicly to reviews to address complaints or provide clarifications, improving customer relations and service quality.  

Shoplite also assists in filtering and sorting of reviews to the buyers. The reviews can be filtered by the star rating, date, or verified purchase status, and sorted by most helpful, most recent, or highest rating. The system features the top reviews that have images or helpful ones that other users marked. This ensures that relevant and reliable feedback is easily accessible.  

**Overlap:** This document links to **Document 2: Shoplite Product Search**, as buyers may filter products based on ratings. It also relates to **Document 3: Shoplite Shopping Cart**, since items in the cart may have reviews that influence purchase decisions, and to **Document 16: Shoplite Promo Codes**, as positive reviews can drive promotional campaigns or product discounts.

## Document 9: Shoplite Seller Account Setup

The user has to create a separate seller account with Shoplite to become a seller. The process begins with providing basic personal information, including full name, email, and contact number, along with business details such as company name, tax ID, and legal registration documents. The users should also include a legitimate bank account in settlement of payment.

Shoplite verifies all submitted documents to ensure compliance with legal and financial regulations. The verification process typically requires 2-3 business days and email notification is sent to the seller concerning any information that is missing or not provided. Once verified, sellers gain access to the seller dashboard, where they can list products, run their inventory, track orders, and access analytics to monitor sales and customer interaction.

The seller dashboard provides a user-friendly interface for bulk product uploads, pricing updates, and promotional campaign management. Sellers can categorize products, set stock levels, and define shipping options for each item. Real-time alerts notify sellers of low stock, pending orders, or customer queries. Shoplite is also compatible with multiple seller accounts in one business entity, allowing teams to operate together and have individual user permissions and access control.

Seller account management is based on security and compliance. All sensitive documents are kept in a safe place, passwords are encrypted, two-factor authentication is encouraged, and passwords are stored in a safe place. Sellers are required to follow Shoplite’s policies regarding prohibited items, product descriptions, and quality standards. Violations may result in temporary suspension or account deactivation, with detailed instructions provided to remedy issues.

**Overlap:** This document links to **Document 1: Shoplite User Registration Process**, since seller accounts start from the registration process, and **Document 10: Shoplite Inventory Management**, as sellers must manage stock effectively to operate on Shoplite.

## Document 10: Shoplite Inventory Management

Shoplite also offers sellers with a powerful inventory management system that enables them to monitor and control their products effectively. The sellers are able to add the new products one by one or in bulk, change the description of their products, price, stock and assign categories. The products have a description of their SKU, weight, dimensions, shipping choice, photos, and optional promotion tags to increase product visibility. The platform allows product variants that can be in terms of size, color, model among others and this enables sellers to handle the complex inventory with minimal difficulty. Also, sellers are able to arrange products in collections or bundles to maximize sales tactics and generate a more attractive shopping experience to buyers.

The system automatically updates inventory when a purchase is made, ensuring that stock levels remain accurate across the platform. Sellers receive real-time notifications when stock is low or out of stock, allowing them to restock promptly. Inventory reports provide insights into product performance, helping sellers forecast demand and manage supply effectively. For seasonal promotions or limited-time offers, sellers can schedule stock adjustments, pre-order availability, and timed product launches in advance.Bulk import/export is also supported by Shoplite, using a CSV file or Excel file which allows sellers to update large inventory in a short period of time and ensure consistency in multiple listings.

The site provides more sophisticated features such as automated reorder notifications, low-stock insights and past purchasing records to help make purchasing decisions. Sellers can set thresholds for automatic notifications and receive actionable suggestions for inventory replacement based on sales velocity, seasonal trends, and historical demand patterns. Combination with order fulfillment and shipping system will make sure the inventory is updated with the running orders and reduce overselling and mistakes. Compliance with Shoplite policies is enforced at all times, and attempts to list prohibited, duplicate, or miscategorized items are flagged for review. In addition, sellers are able to create inventory reports and analytics dashboards to track tendencies, the performance of best-selling products, and make accurate decisions to maximize profitability.

**Overlap:** This document links to **Document 9: Shoplite Seller Account Setup**, as inventory management is only available for verified sellers, and **Document 3: Shoplite Shopping Cart**, because accurate stock tracking ensures that buyers can add items to their cart without overselling.

## Document 11: Shoplite Commission and Fees

The sellers are charged on a commission-based model where the shoplite receives a commission on every completed sale on the platform. The standard commission rate varies by product category, reflecting market norms and operational costs. Sellers can view the applicable rates for each category in their account dashboard, along with historical commission reports for transparency. Once a payment is made, the seller is automatically charged commissions before they can get the rest.

Besides commissions, Shoplite can use transaction fees to process payments. These charges include credit card, mobile wallet and cash-on-delivery processing. The platform will have invoices of every transaction, which display the item price, discounts applied, commission and any extra charges. These invoices can be exported by the sellers to be used to do their accounting and tax reporting.

On Shoplite, sellers can also select the option of premium to market their products, including featured listing, special promo or advertisements in the marketplace. These services cost extra and are billed either monthly or per campaign, depending on the type. Shoplite offers a dashboard displaying the level of these promotions performance in the number of buyers that encountered the product and the number of purchases. This helps sellers to understand whether it is worthwhile to proceed with promotions and make more appropriate marketing and pricing decisions.

Shoplite has strong policies on commissions and fees. Refunds, order cancellations, or disputes may affect the final commission and payout amounts. The system automatically re-calculates totals and informs the sellers about changes through email and dashboard messages. Sellers must ensure their payment details are accurate to receive payouts on schedule.

**Overlap:** This document links to **Document 9: Shoplite Seller Account Setup**, since only verified sellers are subject to commission policies. It also relates to **Document 10: Shoplite Inventory Management**, as stock and sales volume directly influence commission calculations, and to **Document 4: Shoplite Checkout Process**, where fees are applied before the final payment is processed.

## Document 12: Shoplite Customer Support

Shoplite offers a variety of support options to enable the users to solve problems easily. Buyers and sellers can contact the support team via email, live chat, or a dedicated support phone line. The site has a comprehensive Help Center that has articles, FAQs, and step-by-step instructions to resolve common problems, as well. Users can submit tickets for specific problems, which are tracked until resolved.

Support requests are categorized by urgency.  High-priority issues, such as payment problems, failed shipments, or account security concerns, are addressed within a few hours. Regular questions, such as product information or general account questions are normally done in 24-48 hours. The ticket status is notified through emails and can be seen in the user dashboard.

Sellers can also benefit by having special assistance in setting up their accounts, inventory, and promotion campaigns and disputes of orders. Technical issues, such as integration with APIs, bulk product uploads, or payment reconciliation errors, are handled by specialized support agents. The sellers may also ask to be trained or tutored on new features of the platform.

To increase support efficiency, Shoplite uses automated tools. Chatbots based on AI can give immediate responses to frequently asked questions and take the user through troubleshooting options. Buyers are notified automatically of the impending support responses, late shipments or account verification. These systems save on response time and keep the users updated.
All support interactions are logged for auditing and quality control purpose. Users can rate support interactions and provide feedback to help improve service quality. Repeat issues are analyzed to identify systemic problems and guide platform updates.

**Overlap:** This document links to **Document 6: Shoplite Order Tracking**, since many support requests relate to shipment or delivery problems, and **Document 9: Shoplite Seller Account Setup**, because sellers often need guidance during technical setup.

## Document 13: Shoplite Mobile App Features

Shoplite offers a mobile application available for iOS and Android devices, providing users with a seamless shopping and selling experience on the go.  The application replicates the majority of the functionality on the web platform, including product search, shopping cart management, checkout, order tracking, and account management. The user can log in with their email or social media account and turn biometric identification by fingerprint or face recognition to be able to log in quickly and securely.

The mobile app includes push notifications for order updates, promotional offers, and messages from sellers. Users are able to add favorite products, follow sellers and get a personalized list of recommendations based on the browsing history and previous purchases. Its application is designed with a small screen interface, and responsive layouts, user-friendly navigation, and touch controls.

For sellers, the app will offer inventory management tools, sales analytics and have options of order fulfillment. Sellers can add new products, update stock levels, respond to buyer inquiries, and track shipments directly from their mobile device. Alerts notify sellers when stock is low, when new orders are placed, or when a return request is initiated.

Shoplite mobile also integrates with device hardware for enhanced functionality. Users can scan QR codes or barcodes to quickly add products, and the camera can be used to upload product images directly. GPS integration allows for location-based services, such as selecting the nearest delivery options or tracking shipments in real-time.

Security and privacy are implemented all over the app. All data is encrypted with industry-standard protocols and sensitive data such as payment credentials is secured. Users are able to remotely log out and manage the permissions of the device to ensure security of the account. App updates are delivered regularly to improve performance, add features, and address security patches.

**Overlap:** This document links to **Document 2: Shoplite Product Search**, **Document 3: Shoplite Shopping Cart**, and **Document 4: Shoplite Checkout Process**, since all these features are available within the mobile app. It also relates to **Document 6: Shoplite Order Tracking**, as users can monitor their orders via notifications and dashboards.

## Document 14: Shoplite API Documentation

Shoplite offers a comprehensive API which enables developers to connect their applications, websites or third-party services to the Shoplite platform. The API is RESTful and supports JSON data formats, enabling programmatic access to essential platform features, including product listings, inventory updates, order management, customer information, and promotions.

Developers can use API endpoints to fetch product details, create or update listings, adjust stock levels, and manage pricing. Orders placed through external channels can be synchronized with Shoplite automatically, ensuring accurate inventory and sales reporting. Customer information and purchase history can also be accessed with the API to support a loyalty program and personalized recommendations and targeted marketing campaigns.

The authentication is also managed through API keys which are issued on a per-developer account basis. All requests have to contain the API key as a header and there are also rate limits to prevent abuse. Shoplite gives rich error messages to invalid requests, missing parameters or exceeded limits. Webhooks can be configured to receive real-time notifications for events such as order creation, payment confirmation, or stock changes.

The API documentation contains examples of requests and replies, endpoints, authentication process and guidelines on how to integrate in a secure and efficient way. Developers can test API calls in the sandbox environment before moving to production, minimizing errors and improving reliability. Comprehensive guides and tutorials are available to ensure a smooth onboarding experience.

**Overlap:** This document links to **Document 10: Shoplite Inventory Management**, as developers may update stock levels via the API. It also relates to **Document 4: Shoplite Checkout Process** and **Document 5: Shoplite Payment Methods**, since external systems may need to synchronize orders and payments with Shoplite.

## Document 15: Shoplite Security and Privacy

Shoplite has strong security and privacy control to ensure that both buyers and sellers are protected. User accounts are protected by secure passwords, optional two-factor authentication (2FA), and session timeouts to prevent unauthorized access.Sensitive information, including payment details and personal data, is encrypted using industry-standard encryption protocols during storage and transmission.

The platform regularly monitors for suspicious activity, such as unusual login attempts, multiple failed password attempts, or potential fraud in orders. Alerts are sent to users and administrators when security anomalies are detected. Shoplite also conducts periodic security audits and updates to ensure that vulnerabilities are addressed promptly.

Privacy policies ensure that personal information is only used for order processing, communication, and improving user experience. The users are allowed to control notification preferences, marketing mail preferences, and data sharing preferences. Shoplite does not sell personal data to third parties and complies with relevant privacy regulations.

For sellers, Shoplite makes sure that financial and inventory information is confidential. Backend analytics dashboards are available to authorized accounts only. The system supports role-based permissions, allowing teams to assign different access levels to employees handling inventory, orders, or customer support.

Shoplite also supports secure APIs for developers who integrate external applications. These APIs have authentication tokens and all the requests are captured to prevent misuse. Automatic alerts are sent whenever there is a suspicious API activity.

**Overlap:** This document links to **Document 5: Shoplite Payment Methods**, since secure payment handling is critical, and to **Document 6: Shoplite Order Tracking**, because tracking information includes sensitive personal and location data that must be protected.

## Document 16: Shoplite Promo Codes

Shoplite offers a sales promotion system that gives the sellers and administrators the ability to make discount campaigns to attract and maintain customers. Promotions can take many forms, including percentage discounts, fixed-amount reductions, free shipping, or buy-one-get-one offers. These codes can be applied to specific products, categories, shipping fees, or even entire orders, giving sellers a powerful tool to boost sales and encourage repeat purchases.

The promotional codes also can be designed with elaborate rules and limitations to enable the campaigns to reach the right people. Sellers can set expiration dates for limited-time offers, require minimum or maximum order values, and define usage limits per customer or across the entire campaign. More filters can be applied to target codes to particular audiences, such as new customers, loyal buyers, or even app users in a specific region. These environments help sellers not to be used inappropriately and keep profitable at the same time with providing appealing offers.

For buyers, the process of saving a promo code is straightforward. During checkout, customers simply enter the code in the designated field. Shoplite instantly validates the entry, applies the discount, and updates the order summary in real time. If a code is expired, invalid, or does not meet the stated conditions, the system notifies the buyer clearly, ensuring a smooth checkout experience without confusion.

Sellers benefit from analytics that track how each promotion performs. Dashboards show redemption rates, total sales, and the impact on attracting new buyers and keeping existing ones. These insights enable sellers to improve campaign in future and make smarter marketing choices.

To protect both sellers and buyers, Shoplite has the regulations of compliance concerning promotional campaigns. Fraud detection tools prevent abuse, such as the creation of multiple fake accounts to claim the same discount. Invalid redemptions are blocked automatically, and sellers must follow Shoplite’s promotional guidelines to maintain a fair and trustworthy marketplace.

**Overlap:** This document links to **Document 4: Shoplite Checkout Process**, since buyers apply promo codes during payment. It also connects to **Document 11: Shoplite Commission and Fees**, as discounts directly affect sales revenue and commission calculations, and to **Document 13: Shoplite Mobile App Features**, where many promotional offers are delivered to buyers through app notifications.

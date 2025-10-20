# Storefront API

Backend API for the Storefront project. Handles products, orders, customers, analytics, SSE, and  assistant integration.


## Database

- MongoDB Atlas
- Seeded with:
  - products
  - customers
  - orders

## Test Customer

For evaluation and testing purposes, use the following customer:

- **Name:** Anna Chemaly  
- **Email:** anna.chemaly@example.com  
- **Phone:** +96170000001  
- **Address:** Beirut, Lebanon  
- **Customer ID:** 68eb595d953669d3ebe3789f  

### Associated Orders

The test customer has the following orders in the database:

1. **Order ID:** 68eb5ffd953669d3ebe378d7  
   - Items: 2 items  
   - Total: $299.99  
   - Status: PENDING  
   - Carrier: FedEx  
   - Estimated Delivery: 2025-10-18  

2. **Order ID:** 68eb5ffd953669d3ebe378d8  
   - Items: 1 item  
   - Total: $45  
   - Status: PROCESSING  
   - Carrier: DHL  
   - Estimated Delivery: 2025-10-15  

3. **Order ID:** 68eb5ffd953669d3ebe378d9  
   - Items: 1 item  
   - Total: $29.98  
   - Status: DELIVERED  
   - Carrier: UPS  
   - Estimated Delivery: 2025-10-12


MONGODB_URI=<your MongoDB Atlas URI>
PORT=5000

## Steps to Run Locally

Start the backend server:
cd try/apps/api
node src/server.js

Start the frontend server: 
cd try/apps/storefront
pnpm dev

Backend will run at: http://localhost:5000
Frontend will run at: http://localhost:5173

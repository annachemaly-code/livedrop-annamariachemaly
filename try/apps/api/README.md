# Storefront API

Backend API for the Storefront project. Handles products, orders, customers, analytics, SSE, and  assistant integration.


## Database

- MongoDB Atlas
- Seeded with:
  - products
  - customers
  - orders
- **Test customer** for submission:
```json
{
  "name": "Anna Chemaly",
  "email": "anna.chemaly@example.com"
}
```

MONGODB_URI=<your MongoDB Atlas URI>
PORT=5000

## Steps to Run Locally

Start the backend server: node src/server.js
Start the frontend server: pnpm dev


Backend will run at: http://localhost:5000
Frontend will run at: http://localhost:5173

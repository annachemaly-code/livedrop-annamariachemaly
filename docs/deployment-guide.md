# Deployment Guide

This guide covers how to deploy and run the Storefront project, including backend, frontend, and LLM integration.


## 1. MongoDB Atlas Setup
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database for your project.
3. Add collections: `products`, `customers`, `orders`.
4. Add a test customer:

```json
{
  "name": "Anna Chemaly",
  "email": "anna.chemaly@example.com"
}
```

## 2. Backend Setup
Deploy to Render.com
- Connect to GitHub repository
- Add the environmnet variable (MONGODB_URI)
- Deploy
- Verify the backend is running:
https://livedrop-annamariachemaly.onrender.com

- Verify the customers and products:

https://livedrop-annamariachemaly.onrender.com/api/customers

https://livedrop-annamariachemaly.onrender.com/api/products

## 3. Frontend Setup
Deploy to Vercel.com
- Connect to GitHub repository
- Configure build settings (pnpm install, pnpm build)
- Add environment variables:
  REACT_APP_API_BASE = https://your-backend.onrender.com/api
- Deploy 
- Verify the frontend is running:
https://livedrop-annamariachemaly.vercel.app
 
(Enter: anna.chemaly@example.com to login)

## 4. LLM Setup
Add this new endpoint to Week 3 Colab notebook:
@app.route('/generate', methods=['POST']) in cell 7
add a test in cell 9


## 5. Environment variables

MONGODB_URI=<YOUR_MONGODB_URI_HERE>
PORT=5000

## 6. How to run locally 

Start the backend server: 
```bash
cd try/apps/api
node src/server.js
```

Start the frontend server: 
```bash
cd try/apps/storefront
pnpm dev
```

Backend will run at: http://localhost:5000
Frontend will run at: http://localhost:5173



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

## 3. Frontend Setup

## 4. LLM Setup
Add this new endpoint to your Week 3 Colab notebook:

```python
# ADD THIS NEW ENDPOINT (don't touch your existing RAG endpoints)
@app.route('/generate', methods=['POST'])
def generate():
    """Simple text completion - no RAG, no retrieval"""
    prompt = request.json.get('prompt')
    max_tokens = request.json.get('max_tokens', 500)
    
    # Use the same model you already loaded
    response = model.generate(prompt, max_tokens=max_tokens)
    
    return jsonify({"text": response})
```


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



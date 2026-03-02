** Screen Shots**
<img width="1919" height="1104" alt="image" src="https://github.com/user-attachments/assets/42f24c79-8fae-4add-aa7f-fb2fa9fd21e6" />


🛍️ Product Discovery AI

AI-powered product recommendation system built with:

Backend: Node.js + Express

Frontend: React

LLM: OpenAI (gpt-4o-mini)

Fallback Mode: Smart keyword-based filtering

1️⃣ How to Run the Project
🔹 Prerequisites

Node.js (v18+ recommended)

npm

OpenAI API key

🔹 Clone the Repository
git clone https://github.com/YOUR_USERNAME/product-discovery-ai.git
cd product-discovery-ai
🔹 Backend Setup
cd backend
npm install
Create .env file inside backend/
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
Start Backend Server
node server.js

You should see:

Server running on port 5000

Backend runs on:

http://localhost:5000
🔹 Frontend Setup

Open a new terminal:

cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000
2️⃣ What’s Implemented
✅ API Endpoints
GET /api/products

Returns the list of all available products.

POST /api/ask

Accepts a natural language query:

{
  "query": "budget laptop under 50000"
}

Returns:

{
  "productIds": [1, 3],
  "summary": "These laptops match your budget and performance needs."
}
✅ LLM Integration

Model used: OpenAI gpt-4o-mini

The backend sends:

User query

Full product catalog

The LLM:

Filters relevant products

Returns matching product IDs

Generates a short explanation summary

✅ “Ask” Flow (End-to-End)

User enters a query in React frontend.

Frontend sends POST request to /api/ask.

Backend:

Fetches product list

Sends query + products to OpenAI

LLM returns:

Matching product IDs

Explanation summary

Backend responds to frontend.

Frontend displays:

Recommended products

AI-generated summary

✅ Fallback Mechanism (Production Safety)

If OpenAI API fails (quota / network error):

System automatically switches to keyword-based filtering.

Users still receive product results.

Prevents API crashes or 503 errors.

This ensures reliability and better user experience.

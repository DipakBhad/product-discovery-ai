const express = require("express");
const router = express.Router();

const products = require("../products");

// GET /api/products
router.get("/products", (req, res) => {
  const { category, q } = req.query;

  let filteredProducts = products;

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by keyword search (name or description)
  if (q) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase())
    );
  }

  res.json(filteredProducts);
});

const askLLM = require("../services/llmService");

// POST /api/ask
router.post("/ask", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const aiResult = await askLLM(query);

    // Validate AI response
    if (!aiResult.productIds || !Array.isArray(aiResult.productIds)) {
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    const filteredProducts = products.filter(p =>
      aiResult.productIds.includes(p.id)
    );

    res.json({
      products: filteredProducts,
      summary: aiResult.summary
    });

  } catch (error) {
    res.status(503).json({
      error: "AI service temporarily unavailable"
    });
  }
});

module.exports = router;
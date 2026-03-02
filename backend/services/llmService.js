const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const askLLM = async (userQuery, products) => {
  try {
    const productList = products.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description,
      tags: p.tags
    }));

    const prompt = `
User Query: "${userQuery}"

Available Products:
${JSON.stringify(productList, null, 2)}

Return ONLY valid JSON:
{
  "productIds": [1,2],
  "summary": "Short explanation"
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a product recommendation AI." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);

  } catch (error) {
    console.error("LLM Error:", error.message);

    // 🔁 FALLBACK MODE
    const lowerQuery = userQuery.toLowerCase();

    const matchedProducts = products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some(tag => lowerQuery.includes(tag))
    );

    return {
      productIds: matchedProducts.map(p => p.id),
      summary: "Showing results based on smart keyword matching (AI fallback mode)."
    };
  }
};

module.exports = { askLLM };
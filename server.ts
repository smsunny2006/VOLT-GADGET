import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

const PORT = Number(process.env.PORT) || 3000;

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Tech Advisor Endpoint
app.post('/api/recommend', async (req, res) => {
  try {
    const { query, products, budget, category } = req.body;

    if (!ai) {
      return res.status(500).json({
        error: 'Gemini API key is missing on server.',
        advice: "Volt AI is currently unavailable. You can browse our curated catalog using filters and categories!",
        recommendedIds: []
      });
    }

    const inventorySummary = products.map((p: any) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      rating: p.rating,
      badge: p.badge,
      specs: p.specs
    }));

    const systemPrompt = `You are Volt AI, the senior product advisor for VoltGadgets online store.
Your goal is to give friendly, highly accurate gadget recommendations based on user queries and available store inventory.

Store Inventory:
${JSON.stringify(inventorySummary, null, 2)}

User Request: "${query}"
${budget ? `Budget Limit: $${budget}` : ''}
${category && category !== 'All' ? `Preferred Category: ${category}` : ''}

Instructions:
1. Recommend 1 to 3 products from the store inventory that best match the query and budget.
2. Provide a 2-3 sentence personalized breakdown highlighting key features (e.g. noise cancellation, battery life, resolution, performance).
3. At the end of your response, explicitly list the recommended product numeric IDs on a new line formatted EXACTLY as:
RECOMMENDED_IDS: [id1, id2]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: systemPrompt,
    });

    const text = response.text || '';
    let recommendedIds: number[] = [];
    const match = text.match(/RECOMMENDED_IDS:\s*\[([\d,\s]+)\]/i);
    if (match && match[1]) {
      recommendedIds = match[1]
        .split(',')
        .map((n: string) => parseInt(n.trim(), 10))
        .filter((n: number) => !isNaN(n));
    }

    const cleanAdvice = text.replace(/RECOMMENDED_IDS:\s*\[[\d,\s]+\]/i, '').trim();

    return res.json({
      advice: cleanAdvice,
      recommendedIds,
    });
  } catch (error: any) {
    console.error('API /api/recommend error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate recommendations',
      advice: 'Sorry, Volt AI encountered an issue processing your request. Please try selecting a category or search keyword directly.',
      recommendedIds: [],
    });
  }
});

// Setup Vite middleware in dev mode, or static file serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VoltGadgets server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

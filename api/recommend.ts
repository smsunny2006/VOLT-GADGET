import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      return res.status(500).json({
        error: 'Gemini API key is missing on server.',
        advice: 'Volt AI is currently unavailable. You can browse our curated catalog using filters and categories!',
        recommendedIds: [],
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const { query, products, budget, category } = req.body || {};

    const inventorySummary = (products || []).map((p: any) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      rating: p.rating,
      badge: p.badge,
      specs: p.specs,
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

    return res.status(200).json({
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
}

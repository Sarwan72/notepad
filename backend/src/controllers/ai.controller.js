import axios from "axios";

export const summarizeBot = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const prompt = `
You are "BazarBot" 🌾 — a warm, knowledgeable, and professional AI assistant for Apna Bazar.

RESPONSE RULES:
• Use ONLY numbered points or bullets
• No stars or asterisks
• Max 3–6 points
• Emojis at start of points
• Simple Hinglish allowed

USER MESSAGE:
${text}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(500).json({ error: "No response from AI" });
    }

    res.json({ reply });
  } catch (error) {
    console.error(
      "GEMINI REAL ERROR 👉",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "Bot failed to respond",
    });
  }
};

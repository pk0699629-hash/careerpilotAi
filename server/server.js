import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error("OPENROUTER_API_KEY is missing in .env");
}

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-OpenRouter-Title": "CareerPilot AI",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content:
                "You are CareerPilot AI, a helpful, practical and student-friendly AI career assistant.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "OpenRouter AI response could not be generated.",
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, AI response empty hai.";

    res.json({
      reply,
    });
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: "AI server error. Please try again.",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `CareerPilot AI server running on http://localhost:${PORT}`
  );
});
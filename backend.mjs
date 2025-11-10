import express from "express";
import fetch from "node-fetch"; // or built-in fetch in Node 20+

const app = express();
app.use(express.json());

const GEMINI_API_KEY =AIzaSyCG0DkKz0y_PRuYYzfjFqGRwMUmUqEYZNo

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-flash:generateText", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: { text: prompt },
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Backend running on port 3000"));
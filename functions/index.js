const functions = require("firebase-functions");
const fetch = require("node-fetch");

const GEMINI_KEY = functions.config().gemini?.key || process.env.GEMINI_API_KEY;

exports.generateAI = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") return res.status(405).send({ error: "POST only" });

  const { prompt } = req.body;
  if (!prompt) return res.status(400).send({ error: "No prompt provided" });

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-flash:generateText",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GEMINI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: { text: prompt } }),
      }
    );

    const data = await response.json();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
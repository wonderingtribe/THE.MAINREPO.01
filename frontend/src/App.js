const promptEl = document.getElementById("prompt");
const outputEl = document.getElementById("output");
const generateBtn = document.getElementById("generate");

generateBtn.addEventListener("click", async () => {
  const prompt = promptEl.value.trim();
  if (!prompt) return alert("Enter a prompt!");

  outputEl.textContent = "Generating...";

  try {
    // Call your Firebase function
    const res = await fetch("https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/generateAI", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    // Display AI response
    outputEl.textContent = data.candidates?.[0]?.content?.[0]?.text || JSON.stringify(data, null, 2);
  } catch (err) {
    outputEl.textContent = "Error: " + err.message;
  }
});
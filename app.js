// Main frontend logic
const pageContainer = document.getElementById("page-container");

// Load HTML pages dynamically
export async function goToPage(page) {
  const res = await fetch(`pages/${page}.html`);
  const html = await res.text();
  pageContainer.innerHTML = html;

  // If the page is builder, attach AI generation
  if (page === "builder") attachAICallback();
}

// Attach AI generation on builder page
function attachAICallback() {
  const promptEl = document.getElementById("prompt");
  const outputEl = document.getElementById("output");
  const generateBtn = document.getElementById("generate");

  generateBtn.addEventListener("click", async () => {
    const prompt = promptEl.value.trim();
    if (!prompt) return alert("Enter a prompt!");

    outputEl.textContent = "Generating...";

    try {
      const res = await fetch("https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/generateAI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      outputEl.textContent = data.candidates?.[0]?.content?.[0]?.text || JSON.stringify(data, null, 2);
    } catch (err) {
      outputEl.textContent = "Error: " + err.message;
    }
  });
}

// Initialize default page
goToPage("dashboard");
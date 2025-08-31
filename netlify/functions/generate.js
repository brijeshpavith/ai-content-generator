// netlify/functions/generate.js

export async function handler(event) {
  try {
    const { topic, tone, contentType } = JSON.parse(event.body);

    // 🔹 Dynamic token allocation
    let maxTokens = 400; // default
    if (contentType === "Blog Post") maxTokens = 800;
    if (contentType === "LinkedIn Post") maxTokens = 500;
    if (contentType === "Twitter Thread") maxTokens = 250;
    if (contentType === "Ad Copy") maxTokens = 300;

    // 🔹 Stronger initial prompt
    const prompt = `Write a ${tone} ${contentType} about "${topic}".
    - Make it clear, engaging, and tailored for the target audience.
    - Aim for a complete piece (not too short, not overly long).
    - Always provide a proper closing statement, so it feels finished and polished.
    - Do not leave sentences or thoughts incomplete.`;

    // 🔹 Function to call OpenAI
    async function callOpenAI(userPrompt, maxTokens) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: userPrompt }],
          max_tokens: maxTokens,
          temperature: 0.7,
        }),
      });
      return await response.json();
    }

    // 🔹 First API Call
    let data = await callOpenAI(prompt, maxTokens);
    let result = data.choices?.[0]?.message?.content?.trim() || "";

    // 🔹 Check if result looks cut-off
    const cutOffSignals = ["...", "to be continued", "unfinished"];
    const endsAbruptly =
      !/[.!?]"?$/.test(result) || // doesn't end with punctuation
      cutOffSignals.some(sig => result.toLowerCase().includes(sig));

    if (endsAbruptly || result.split(" ").length < 50) {
      console.warn("Fallback triggered: response seems incomplete.");

      const fallbackPrompt = `The following ${contentType} seems incomplete:\n\n"${result}"\n\nContinue and finish it properly with a strong conclusion. Do not repeat content, just complete it.`;

      data = await callOpenAI(fallbackPrompt, 300); // shorter follow-up
      const continuation = data.choices?.[0]?.message?.content?.trim() || "";

      result = result + "\n\n" + continuation;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (error) {
    console.error("Error in generate function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate content" }),
    };
  }
}

// netlify/functions/generate.js

export async function handler(event) {
  try {
    const { topic, tone, contentType, wordCount } = JSON.parse(event.body);

    // 🔹 Convert word count to token limit (approx 1 word = 1.5 tokens)
    const maxTokens = Math.min(
      Math.round(wordCount * 1.5),
      contentType === "Blog Post" ? 800 :
      contentType === "LinkedIn Post" ? 500 :
      contentType === "Twitter Thread" ? 250 :
      300
    );

    // 🔹 Strong initial prompt
    const prompt = `Write a ${tone} ${contentType} about "${topic}".
    - Target length: around ${wordCount} words (do not exceed this).
    - Make it clear, engaging, and tailored for the target audience.
    - Provide a proper beginning, middle, and conclusion.
    - Do not leave sentences incomplete.`;

    // 🔹 Helper: OpenAI call
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

    // First Call
    let data = await callOpenAI(prompt, maxTokens);
    let result = data.choices?.[0]?.message?.content?.trim() || "";

    // Check if incomplete
    const cutOffSignals = ["...", "to be continued", "unfinished"];
    const endsAbruptly =
      !/[.!?]"?$/.test(result) ||
      cutOffSignals.some((sig) => result.toLowerCase().includes(sig));

    if (endsAbruptly || result.split(" ").length < wordCount * 0.5) {
      console.warn("Fallback triggered: response seems incomplete.");

      const fallbackPrompt = `The following ${contentType} seems incomplete:\n\n"${result}"\n\nContinue and finish it properly with a strong conclusion. Do not repeat content, just complete it.`;

      data = await callOpenAI(fallbackPrompt, 300);
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

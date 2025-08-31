// netlify/functions/generate.js

export async function handler(event) {
  try {
    const { topic, tone, contentType } = JSON.parse(event.body);

    const prompt = `Write a ${tone} ${contentType} about "${topic}". 
    Make it clear, engaging, and useful for the target audience.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // ✅ from Netlify env
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    console.log("OpenAI API response:", JSON.stringify(data, null, 2));

    const result =
      data.choices?.[0]?.message?.content || "DEBUG: " + JSON.stringify(data);


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

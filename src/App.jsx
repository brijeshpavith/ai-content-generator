import { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [contentType, setContentType] = useState("Blog Post");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    // Placeholder until API is added
    setOutput(
      `Pretend this is AI-generated: A ${tone.toLowerCase()} ${contentType.toLowerCase()} about "${topic}".`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">
        AI Content Generator
      </h1>

      {/* Input Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <label className="block mb-2 font-medium">Enter Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
          placeholder="e.g. Benefits of Remote Work"
        />

        <label className="block mb-2 font-medium">Tone:</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        >
          <option>Professional</option>
          <option>Casual</option>
          <option>Witty</option>
          <option>Persuasive</option>
        </select>

        <label className="block mb-2 font-medium">Content Type:</label>
        <select
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        >
          <option>Blog Post</option>
          <option>LinkedIn Post</option>
          <option>Twitter Thread</option>
          <option>Ad Copy</option>
        </select>

        <button
          onClick={handleGenerate}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Generate Content
        </button>
      </div>

      {/* Output */}
      {output && (
        <div className="bg-white shadow-md rounded-xl p-4 mt-6 w-full max-w-lg">
          <h2 className="font-semibold mb-2">Generated Content:</h2>
          <p className="whitespace-pre-wrap">{output}</p>
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="mt-4 bg-gray-700 text-white px-3 py-1 rounded-lg"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

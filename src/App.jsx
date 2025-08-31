import { useState } from "react";

function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-600"></div>
        <span className="mt-3 text-white font-medium">Generating...</span>
      </div>
    </div>
  );
}

function App() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [contentType, setContentType] = useState("Blog Post");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);


  const handleGenerate = async () => {
  if (!topic) {
    alert("Please enter a topic first!");
    return;
  }

  setLoading(true);
  setOutput("");

  try {
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, tone, contentType }),
    });

    const data = await response.json();
    setOutput(data.result);
    setHistory(prev => {
      const newEntry = {
        text: data.result,
        tone,
        contentType,
        timestamp: new Date().toLocaleTimeString(),
      };
      const updated = [newEntry, ...prev];
      return updated.slice(0, 3); // keep only last 3
    });

  } catch (error) {
    console.error(error);
    setOutput("Error: Could not generate content.");
  } finally {
    setLoading(false);
  }
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

      {/* Spinner Overlay */}
      {loading && <Spinner />}

      {/* Output Section */}
      {!loading && output && (
        <div className="bg-white shadow-md rounded-xl p-4 mt-6 w-full max-w-lg">
          <h2 className="font-semibold mb-2">Generated Content:</h2>
          <p className="whitespace-pre-wrap">{output}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(output);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="mt-4 bg-gray-700 text-white px-3 py-1 rounded-lg"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}


      {/* History Panel */}
      {history.length > 0 && (
        <div className="bg-white shadow-md rounded-xl p-4 mt-6 w-full max-w-lg">
          <h2 className="font-semibold mb-3">History (last {history.length})</h2>
          <ul className="space-y-3">
            {history.map((item, index) => (
              <li key={index} className="border-b pb-2">
                <p className="text-sm text-gray-500">
                  {item.contentType} ({item.tone}) – {item.timestamp}
                </p>
                <p className="text-gray-700 line-clamp-2">
                  {item.text.slice(0, 100)}...
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(item.text);
                  }}
                  className="mt-1 text-sm bg-gray-700 text-white px-2 py-1 rounded-lg"
                >
                  Copy
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      
     {/* Footer */}
    <footer className="mt-12 py-4 w-full text-center text-gray-600 border-t">
      <p>&copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-purple-600">HumAIne</span> – Brijesh P.</p>
    </footer>
  </div>

  );
}

export default App;

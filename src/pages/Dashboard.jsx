import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

function Dashboard() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAI = async () => {
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("http://localhost:5000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: input })
      });

      const data = await res.json();

      if (res.ok) {
        setOutput(data.result);
      } else {
        setError(data.message);
      }

    } catch (err) {
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>Dashboard Page</h1>
        <p>This is the Dashboard page.</p>

        <p>
          Welcome Bharat <br />
          Email: bharat@example.com
        </p>

        <hr />

        <h2>AI Feature</h2>

        <input
          type="text"
          placeholder="Enter prompt"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={handleAI}>Generate</button>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {output && <p>{output}</p>}
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    // 🧠 Fake AI logic
    let reply = "";

    if (prompt.toLowerCase().includes("hello")) {
      reply = "Hello! How can I help you today?";
    } else if (prompt.toLowerCase().includes("ai")) {
      reply = "AI stands for Artificial Intelligence. It helps machines think and learn.";
    } else if (prompt.toLowerCase().includes("food")) {
      reply = "Food processing involves transforming raw ingredients into consumable products.";
    } else {
      reply = `You said: "${prompt}". This is a demo AI response.`;
    }

    res.json({
      result: reply,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "AI request failed",
    });
  }
});

module.exports = router;
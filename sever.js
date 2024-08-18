const express = require("express");
const { fool } = require("./ytb_download/main");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const port = 5000;

// Middleware để parse JSON
app.use(express.json());

app.post("/api/download", async (req, res) => {
  console.log(req.body);

  const { url, output, quality } = req.body;
  console.log(url, output, quality);

  if (!url || !output) {
    return res
      .status(400)
      .json({ error: "URL and output path are required.", url, output });
  }

  try {
    const result = await fool(url, output, quality);
    res.json({ message: "Download started", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});

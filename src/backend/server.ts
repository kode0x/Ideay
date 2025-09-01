import express from "express";
import cors from "cors";
import { scrapeReddit } from "./redditScrapper";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/scrape", async (req, res) => {
  const { community, sort, limit, after } = req.query;

  if (!community || !sort) {
    return res
      .status(400)
      .json({ error: "Missing 'community' or 'sort' parameter" });
  }

  try {
    const posts = await scrapeReddit(
      community as string,
      sort as string,
      limit ? parseInt(limit as string) : 5,
      after as string
    );
    res.json(posts);
  } catch (err) {
    console.error("Scraping failed:", err);
    res.status(500).json({
      error: "Scraping failed",
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

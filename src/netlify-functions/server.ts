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

app.post("/api/generate-idea", async (req, res) => {
  const { post, provider, apiKey } = req.body;

  if (!post || !provider || !apiKey) {
    return res.status(400).json({
      error: "Missing required parameters: post, provider, or apiKey",
    });
  }

  try {
    const businessPlan = await generateSaaSIdea(post, provider, apiKey);
    res.json({ businessPlan });
  } catch (err) {
    console.error("AI generation failed:", err);
    res.status(500).json({
      error: "Failed to generate SaaS idea",
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

async function generateSaaSIdea(post: any, provider: string, apiKey: string) {
  const prompt = `
Based on this Reddit post, generate a comprehensive SaaS business plan:

Title: ${post.title}
Content: ${post.body || "No content provided"}
Author: u/${post.author}
Engagement: ${post.score} upvotes, ${post.comments} comments

Please analyze this post and create a detailed SaaS business plan that addresses the problem or opportunity mentioned. Return ONLY a valid JSON object with the following structure (no additional text or formatting):

{
  "saasName": "Creative name for the SaaS product",
  "tagline": "Compelling one-line description",
  "problemStatement": "Clear problem this SaaS solves",
  "solution": "How your SaaS addresses the problem",
  "targetMarket": "Who would use this product",
  "businessModel": "How the business operates",
  "keyFeatures": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
  "marketingStrategy": "How to reach and acquire customers",
  "competitiveAdvantage": "What makes this solution unique",
  "revenueModel": "How the business makes money",
  "implementation": "High-level implementation approach",
  "risks": ["Risk 1", "Risk 2", "Risk 3"],
  "nextSteps": ["Step 1", "Step 2", "Step 3", "Step 4"]
}

Make sure the response is valid JSON and the business plan is realistic, actionable, and directly inspired by the Reddit post content.
`;

  if (provider !== "google") {
    throw new Error(`Only Google AI is supported. Received: ${provider}`);
  }

  const response = await callGoogleAI(prompt, apiKey);

  try {
    // Clean the response to extract JSON
    let cleanedResponse = response.trim();

    // Remove markdown code blocks if present
    if (cleanedResponse.startsWith("```json")) {
      cleanedResponse = cleanedResponse
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "");
    } else if (cleanedResponse.startsWith("```")) {
      cleanedResponse = cleanedResponse
        .replace(/^```\s*/, "")
        .replace(/\s*```$/, "");
    }

    // Try to find JSON object in the response
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedResponse = jsonMatch[0];
    }

    const parsedResponse = JSON.parse(cleanedResponse);

    // Validate required fields
    const requiredFields = [
      "saasName",
      "tagline",
      "problemStatement",
      "solution",
      "targetMarket",
    ];
    for (const field of requiredFields) {
      if (!parsedResponse[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return parsedResponse;
  } catch (err) {
    console.error("Raw AI response:", response);
    console.error("JSON parsing error:", err);
    throw new Error(
      `Failed to parse AI response as JSON: ${
        err instanceof Error ? err.message : "Unknown error"
      }`
    );
  }
}

async function callGoogleAI(prompt: string, apiKey: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a business strategy expert specializing in SaaS products. Always respond with valid JSON.\n\n${prompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Google AI API error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

import puppeteer from "puppeteer";

export interface RedditPost {
  title: string;
  link: string;
  author: string;
  score: number;
  comments: number;
  timestamp: string;
  thumbnail?: string;
  body?: string;
}

// Reddit API response types
interface RedditAPIPost {
  title: string;
  url: string;
  permalink: string;
  author: string;
  score: number;
  num_comments: number;
  created_utc: number;
  thumbnail: string;
  selftext: string;
}

interface RedditAPIChild {
  data: RedditAPIPost;
}

interface RedditAPIResponse {
  data: {
    children: RedditAPIChild[];
    after?: string;
  };
}

// Alternative Reddit API scraper using fetch
export async function scrapeRedditAPI(
  community: string,
  sort: string,
  limit: number = 5,
  after?: string
): Promise<RedditPost[]> {
  const url = `https://www.reddit.com/r/${community}/${sort}.json?limit=${limit}${
    after ? `&after=${after}` : ""
  }`;

  console.log(`Scraping Reddit API: ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RedditAPIResponse = await response.json();

    if (!data.data || !data.data.children) {
      throw new Error("Invalid Reddit API response structure");
    }

    const posts: RedditPost[] = data.data.children.map(
      (child: RedditAPIChild) => {
        const post = child.data;
        return {
          title: post.title || "Untitled",
          link: post.url.startsWith("http")
            ? post.url
            : `https://www.reddit.com${post.permalink}`,
          author: post.author || "Unknown",
          score: post.score || 0,
          comments: post.num_comments || 0,
          timestamp: new Date(post.created_utc * 1000).toISOString(),
          thumbnail:
            post.thumbnail &&
            post.thumbnail !== "self" &&
            post.thumbnail !== "default"
              ? post.thumbnail
              : undefined,
          body: post.selftext || undefined,
        };
      }
    );

    console.log(`Successfully scraped ${posts.length} posts from Reddit API`);
    return posts;
  } catch (error) {
    console.error("Reddit API scraping failed:", error);
    throw new Error(
      `Failed to scrape Reddit API: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function scrapeReddit(
  community: string,
  sort: string,
  limit: number = 5,
  after?: string
): Promise<RedditPost[]> {
  // Try Reddit API first (more reliable)
  try {
    console.log("Attempting Reddit API scraping...");
    return await scrapeRedditAPI(community, sort, limit, after);
  } catch (apiError) {
    console.log("Reddit API failed, falling back to Puppeteer:", apiError);

    // Fallback to Puppeteer scraping
    return await scrapeRedditPuppeteer(community, sort, limit, after);
  }
}

async function scrapeRedditPuppeteer(
  community: string,
  sort: string,
  limit: number = 5,
  after?: string
): Promise<RedditPost[]> {
  const url = `https://www.reddit.com/r/${community}/${sort}${
    after ? `?after=${after}` : ""
  }`;
  console.log(`Scraping URL: ${url}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
        "--disable-blink-features=AutomationControlled",
        "--disable-features=VizDisplayCompositor",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
        "--disable-web-security",
        "--disable-features=TranslateUI",
        "--disable-ipc-flooding-protection",
        "--memory-pressure-off",
        "--max_old_space_size=4096",
      ],
      timeout: 60000,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    console.log("Navigating to Reddit...");
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    console.log("Page loaded, waiting for content...");

    // Wait for any content to load
    try {
      await page.waitForSelector("body", { timeout: 10000 });
      console.log("Body found");
    } catch (e) {
      console.log("Body not found:", e);
    }

    // Get page title and basic info
    const pageTitle = await page.title();
    console.log("Page title:", pageTitle);

    const posts = await page.evaluate((postLimit: number) => {
      console.log("=== STARTING POST EXTRACTION ===");
      console.log("Page URL:", window.location.href);
      console.log("Document ready state:", document.readyState);

      // Log the entire page structure for debugging
      console.log("Body HTML length:", document.body.innerHTML.length);
      console.log(
        "First 1000 chars of body:",
        document.body.innerHTML.substring(0, 1000)
      );

      // Try to find ANY elements that might contain posts
      const allDivs = document.querySelectorAll("div");
      console.log("Total divs found:", allDivs.length);

      const allArticles = document.querySelectorAll("article");
      console.log("Total articles found:", allArticles.length);

      // Look for any elements with "post" in class or data attributes
      const postElements = document.querySelectorAll(
        '[class*="post"], [data-testid*="post"], [id*="post"]'
      );
      console.log('Elements with "post" in attributes:', postElements.length);

      // Try Reddit's old and new selectors
      const selectors = [
        "article",
        '[data-testid="post-container"]',
        'div[data-click-id="body"]',
        ".Post",
        '[data-adclicklocation="title"]',
        ".thing",
        ".link",
        '[data-type="link"]',
        "shreddit-post",
      ];

      let articles: NodeListOf<Element> | null = null;

      for (const selector of selectors) {
        articles = document.querySelectorAll(selector);
        console.log(`Selector "${selector}" found ${articles.length} elements`);
        if (articles.length > 0) {
          console.log(
            `Using selector: ${selector} with ${articles.length} posts`
          );
          break;
        }
      }

      if (!articles || articles.length === 0) {
        console.log("=== NO POSTS FOUND ===");
        console.log("Trying to find any links or text content...");

        // Try to find any links that might be posts
        const allLinks = document.querySelectorAll('a[href*="/r/"]');
        console.log("Links with /r/ found:", allLinks.length);

        const commentLinks = document.querySelectorAll('a[href*="/comments/"]');
        console.log("Comment links found:", commentLinks.length);

        // If we find comment links, try to extract basic info
        if (commentLinks.length > 0) {
          console.log("Attempting to extract from comment links...");
          const scraped: RedditPost[] = [];

          for (let i = 0; i < Math.min(commentLinks.length, postLimit); i++) {
            const link = commentLinks[i] as HTMLAnchorElement;
            const href = link.getAttribute("href");
            const text = link.textContent?.trim();

            if (text && href) {
              scraped.push({
                title: text,
                link: href.startsWith("http")
                  ? href
                  : `https://www.reddit.com${href}`,
                author: "Unknown",
                score: 0,
                comments: 0,
                timestamp: new Date().toISOString(),
                thumbnail: undefined,
                body: undefined,
              });
            }
          }

          console.log(`Extracted ${scraped.length} posts from comment links`);
          return scraped;
        }

        return [];
      }

      console.log(
        `Processing ${Math.min(articles.length, postLimit)} posts...`
      );
      const scraped: RedditPost[] = [];

      for (let i = 0; i < Math.min(articles.length, postLimit); i++) {
        const article = articles[i];
        console.log(`\n--- Processing post ${i + 1} ---`);
        console.log("Article HTML:", article.outerHTML.substring(0, 200));

        // Try multiple title selectors
        const titleSelectors = [
          "h3",
          '[data-testid="post-title"]',
          'a[data-click-id="body"] h3',
          ".title a",
          '[data-adclicklocation="title"]',
          "h1",
          "h2",
          "h4",
          "h5",
          "h6",
          ".title",
          '[slot="title"]',
        ];

        let title = "";
        for (const selector of titleSelectors) {
          const titleElement = article.querySelector(selector);
          if (titleElement?.textContent?.trim()) {
            title = titleElement.textContent.trim();
            console.log(
              `Found title with "${selector}": ${title.substring(0, 50)}...`
            );
            break;
          }
        }

        // If no title found, try getting any text content
        if (!title) {
          const allText = article.textContent?.trim();
          if (allText && allText.length > 10) {
            title = allText.substring(0, 100);
            console.log(`Using article text as title: ${title}...`);
          }
        }

        // Try multiple link selectors
        const linkSelectors = [
          'a[data-click-id="body"]',
          'a[href*="/comments/"]',
          '[data-testid="post-title"] a',
          ".title a",
          'a[href*="/r/"]',
        ];

        let link = "";
        for (const selector of linkSelectors) {
          const linkElement = article.querySelector(
            selector
          ) as HTMLAnchorElement | null;
          if (linkElement?.getAttribute("href")) {
            link = linkElement.getAttribute("href") || "";
            console.log(`Found link with "${selector}": ${link}`);
            break;
          }
        }

        // Extract author with multiple selectors
        let author = "Unknown";
        const authorSelectors = [
          '[data-testid="post-author-link"]',
          'a[href*="/user/"]',
          'a[href*="/u/"]',
          ".author",
        ];

        for (const selector of authorSelectors) {
          const authorElement = article.querySelector(selector);
          if (authorElement?.textContent) {
            author = authorElement.textContent.replace(/^u\//, "").trim();
            break;
          }
        }

        // Extract post body content
        let body = "";
        const bodySelectors = [
          '[data-testid="post-text-container"]',
          ".usertext-body",
          '[data-click-id="text"]',
          ".md",
          ".expando .usertext-body",
          'div[data-test-id="post-content"]',
        ];

        for (const selector of bodySelectors) {
          const bodyElement = article.querySelector(selector);
          if (bodyElement?.textContent?.trim()) {
            body = bodyElement.textContent.trim();
            console.log(
              `Found body with "${selector}": ${body.substring(0, 50)}...`
            );
            break;
          }
        }

        console.log(`Post ${i + 1} extracted:`, {
          title: title.substring(0, 30),
          link: link.substring(0, 50),
          author,
          body: body.substring(0, 30),
        });

        // Accept posts with either title or link
        if (title || link) {
          scraped.push({
            title: title || "Untitled Post",
            link: link
              ? link.startsWith("http")
                ? link
                : `https://www.reddit.com${link}`
              : "#",
            author,
            score: 0,
            comments: 0,
            timestamp: new Date().toISOString(),
            thumbnail: undefined,
            body: body || undefined,
          });
        } else {
          console.log(`Skipping post ${i + 1} - no title or link found`);
        }
      }

      console.log(`=== EXTRACTION COMPLETE ===`);
      console.log(`Successfully scraped ${scraped.length} posts`);
      return scraped;
    }, limit);

    await browser.close();
    console.log(`Final result: ${posts.length} posts scraped`);
    return posts;
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    console.error("Reddit scraping failed:", error);
    throw new Error(
      `Failed to scrape Reddit: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

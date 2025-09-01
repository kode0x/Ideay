# 🚀 Ideay - Reddit SaaS Idea Scraper

> Discover winning SaaS ideas from Reddit in minutes with our intelligent scraper that analyzes trending discussions and surfaces innovative business opportunities.

## ✨ Overview

Ideay is a powerful web application that helps entrepreneurs, developers, and business enthusiasts discover profitable SaaS ideas by intelligently scraping and analyzing Reddit discussions. The platform scans popular subreddits where innovators gather, filters relevant content, and presents actionable business opportunities.

## 🎯 Key Features

- **🤖 AI-Powered Scraping**: Intelligent scraper that analyzes thousands of Reddit posts to identify high-demand ideas
- **🎯 Customizable Filters**: Choose from 15+ curated subreddits and multiple sorting options
- **⚡ Real-Time Results**: Get up-to-the-minute insights from relevant communities
- **📱 Modern UI/UX**: Beautiful, responsive interface with smooth animations
- **🔄 Dual Scraping**: Fallback system using both Reddit API and Puppeteer for reliability

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend

- **Express.js 5** - Fast, unopinionated web framework
- **Node.js** - JavaScript runtime
- **Puppeteer** - Headless browser automation
- **CORS** - Cross-origin resource sharing

### Development Tools

- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kode0x/Ideay.git
   cd Ideay
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   # Start frontend (Vite dev server)
   npm run dev

   # Start backend server (in a new terminal)
   npm run server

   # Or use the watch mode for backend development
   npm run server:dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Hero.tsx       # Landing page hero section
│   ├── Features.tsx   # Features showcase
│   ├── Explaination.tsx # How it works section
│   ├── Navbar.tsx     # Navigation component
│   └── Footer.tsx     # Footer component
├── pages/              # Page components
│   ├── homepage.tsx   # Landing page
│   ├── communities.tsx # Community selection
│   ├── posts.tsx      # Posts display
│   └── pagenotfound.tsx # 404 page
├── constants/          # Static data and configurations
│   ├── Communities.ts # Subreddit list
│   ├── Features.ts    # Feature descriptions
│   ├── Explaination.ts # How it works steps
│   └── Sort.ts        # Sorting options
├── backend/            # Backend server code
│   ├── server.ts      # Express server setup
│   └── redditScrapper.ts # Reddit scraping logic
└── main.tsx           # Application entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start Vite development server
- `npm run server` - Start backend server
- `npm run server:dev` - Start backend server with auto-reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🌐 API Endpoints

### GET `/api/scrape`

Scrapes Reddit posts from specified communities.

**Query Parameters:**

- `community` (required): Subreddit name (e.g., "SaaS", "startups")
- `sort` (required): Sort method ("hot", "new", "top", "rising")
- `limit` (optional): Number of posts to fetch (default: 5)
- `after` (optional): Pagination token for loading more posts

**Example:**

```bash
GET /api/scrape?community=SaaS&sort=hot&limit=10
```

## 🎨 Supported Communities

The platform supports 15+ curated subreddits including:

- r/SaaS - SaaS discussions and ideas
- r/startups - Startup community
- r/Entrepreneur - Entrepreneurship insights
- r/technology - Tech trends and news
- r/sideproject - Side project showcases
- r/indiehackers - Indie hacker community
- r/growthhacking - Growth strategies
- r/Productivity - Productivity tools and tips
- And many more...

## 🔄 How It Works

1. **Connect With Communities**: Select from curated subreddits where entrepreneurs gather
2. **Analyze Topics & Trends**: Our scraper filters and analyzes relevant discussions
3. **Generate Actionable Ideas**: Receive curated SaaS ideas tailored to your interests

## 🚀 Deployment

### Frontend (Vite)

```bash
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend (Express)

```bash
# Set environment variables
PORT=3000
NODE_ENV=production

# Start the server
npm run server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Reddit's anti-bot measures may occasionally affect scraping reliability
- The platform uses fallback mechanisms to ensure consistent data delivery

## 🔮 Future Enhancements

- [ ] User authentication and saved searches
- [ ] Advanced filtering and categorization
- [ ] Export functionality for idea lists
- [ ] Mobile app development
- [ ] Integration with other social platforms

## 📞 Support

If you encounter any issues or have questions:

- Create an issue on [GitHub](https://github.com/kode0x/Ideay/issues)
- Check the existing issues for solutions

---

**Built with ❤️ by the Ideay team**

_Discover your next million-dollar SaaS idea today!_

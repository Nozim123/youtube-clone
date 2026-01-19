# ViewTube - YouTube Clone

A modern, fully-responsive YouTube clone built with React, TypeScript, and Tailwind CSS. This project replicates YouTube's core features with a clean, professional UI and excellent user experience.

## ✨ Features

- **Modern UI**: Clean interface matching YouTube's design language
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes with persistent preferences
- **Video Grid**: Browse videos in a responsive grid layout
- **Video Player**: Watch videos with embedded YouTube player
- **Search Functionality**: Search for videos with real-time results
- **Category Filters**: Filter videos by categories with horizontal carousel
- **Channel Pages**: View channel information and videos
- **Loading Skeletons**: Smooth loading states for better UX
- **Sidebar Navigation**: Collapsible sidebar with navigation links
- **Video Cards**: Professional video thumbnails with metadata

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe code
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - High-quality UI components
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Main header with search
│   │   └── Sidebar.tsx         # Navigation sidebar
│   ├── video/
│   │   ├── VideoCard.tsx       # Individual video card
│   │   ├── VideoCardSkeleton.tsx # Loading skeleton
│   │   ├── VideoGrid.tsx       # Responsive video grid
│   │   └── CategoryCarousel.tsx # Category filter carousel
│   └── ui/                     # Shadcn UI components
├── pages/
│   ├── Home.tsx               # Home page with video grid
│   ├── Watch.tsx              # Video player page
│   ├── Search.tsx             # Search results page
│   ├── Channel.tsx            # Channel page
│   └── NotFound.tsx           # 404 page
├── services/
│   ├── youtube.ts             # YouTube API service
│   └── sampleData.ts          # Sample data for demo
├── hooks/
│   └── useTheme.ts            # Dark/light mode hook
├── lib/
│   └── utils.ts               # Utility functions
├── App.tsx                    # Main app component
└── main.tsx                   # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Add YouTube Data API key:
   - Create a `.env` file in the root directory
   - Add your API key: `VITE_YOUTUBE_API_KEY=your_api_key_here`
   - Without an API key, the app uses sample data

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:8080`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Design System

The app uses a comprehensive design system defined in:
- `src/index.css` - CSS variables for colors and themes
- `tailwind.config.ts` - Tailwind configuration

### YouTube API Integration

To use real YouTube data instead of sample data:

1. Get a YouTube Data API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Create a `.env` file:
```env
VITE_YOUTUBE_API_KEY=your_api_key_here
```
3. Restart the development server

The app automatically uses the API when a key is provided, otherwise it falls back to sample data.

## 📦 Components Overview

### Header
- Logo and branding
- Search bar with form submission
- Theme toggle (dark/light mode)
- User action buttons

### Sidebar
- Navigation links
- Collapsible on mobile
- Active route highlighting
- Icon-only mode when collapsed

### Video Components
- **VideoCard**: Displays thumbnail, title, channel info, views, and date
- **VideoGrid**: Responsive grid layout for video cards
- **VideoCardSkeleton**: Loading skeleton for smooth UX
- **CategoryCarousel**: Horizontal scrolling category filters

### Pages
- **Home**: Main video feed with category filters
- **Watch**: Video player with details and suggested videos
- **Search**: Search results with video grid
- **Channel**: Channel page with tabs (Videos, Playlists, About)

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables if using YouTube API
5. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Add environment variables if needed
8. Deploy!

## 🎯 Key Features Explained

### Dark Mode
- Implemented with CSS variables
- Preference saved in localStorage
- Smooth transition between themes
- System preference detection

### Sample Data
- Realistic video data for demo purposes
- No API key required to run the app
- Automatically used when API key is not provided
- Includes videos, channels, and categories

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible sidebar on mobile
- Adaptive video grid (1-4 columns based on screen size)

### Loading States
- Skeleton loaders for video cards
- Smooth transitions when data loads
- Maintains layout during loading

## 🤝 Contributing

This is a complete project ready for use. Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Fork and customize

## 📝 License

This project is open source and available under the MIT License.

## 🎓 Learning Resources

Built with modern best practices including:
- React Hooks (useState, useEffect, useRef)
- TypeScript for type safety
- Component composition
- Clean code principles
- Responsive design patterns
- API integration patterns

## 💡 Tips

1. **Performance**: Images are lazy-loaded and optimized
2. **Accessibility**: Semantic HTML and ARIA labels used throughout
3. **SEO**: Meta tags configured in index.html
4. **Code Quality**: ESLint configured with TypeScript rules
5. **Developer Experience**: Fast refresh with Vite

## 🌟 Credits

- Icons from [Lucide](https://lucide.dev)
- UI components from [Shadcn UI](https://ui.shadcn.com)
- Images from [Unsplash](https://unsplash.com)

---

Built with ❤️ using React, TypeScript, and Tailwind CSS

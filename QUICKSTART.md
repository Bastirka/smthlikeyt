# Quick Start Guide - StreamHub Pro

## 30-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm start

# 3. Open browser to http://localhost:3000
```

## Login Credentials (Demo)
- **Email**: dev@example.com
- **Password**: password

## Building for Production
```bash
npm run build
npm run preview
```

## Project Structure Quick Reference

```
src/
├── components/    → Reusable UI components
├── pages/         → Full page components
├── contexts/      → Global state (Auth, Theme)
├── types/         → TypeScript type definitions
├── data/          → Mock data
├── utils/         → Helper functions
└── App.tsx        → Main app component
```

## Key Files to Understand

1. **src/App.tsx** - Main routing configuration
2. **src/contexts/AuthContext.tsx** - Authentication logic
3. **src/components/Layout.tsx** - App layout structure
4. **src/pages/HomePage.tsx** - Homepage layout
5. **src/data/mockData.ts** - All sample data

## Customization Tips

### Change Primary Color
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#YOUR_COLOR',
}
```

### Add New Route
1. Create page in `src/pages/`
2. Add route to `src/App.tsx`
3. Add sidebar link (optional)

### Replace Mock Data
Replace `mockData.ts` imports with API calls:
```typescript
// Instead of:
import { mockVideos } from '../data/mockData';

// Use:
const [videos, setVideos] = useState([]);
useEffect(() => {
  fetch('/api/videos').then(r => r.json()).then(setVideos);
}, []);
```

## Useful Commands

```bash
npm start        # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run type-check  # Check TypeScript errors
```

## Features by Page

| Page | Feature |
|------|---------|
| HomePage | Trending, Recommendations, Shorts, Live |
| WatchPage | Video player, Comments, Related videos |
| ChannelPage | Creator profile, Videos, Community |
| SearchPage | Search results, Filters |
| ExplorePage | Category browsing |
| ShopPage | E-commerce products |
| Premium | Subscription plans |
| CreatorPanel | Dashboard, Upload, Analytics |
| AdminPanel | User management, Moderation |
| InvestorDashboard | Business metrics |

## Dark Mode

Dark mode is automatically detected from system preferences and stored in localStorage. Toggle with Sun/Moon icon in header.

## Troubleshooting

**Port 3000 already in use?**
```bash
PORT=3001 npm start
```

**Module not found error?**
```bash
npm install
```

**TypeScript errors?**
```bash
npm run type-check
```

## Next Steps

1. ✅ Set up real authentication (Supabase/Firebase)
2. ✅ Connect to backend API
3. ✅ Add Stripe payment processing
4. ✅ Deploy to production
5. ✅ Set up CDN for videos

## Support Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Happy coding! 🚀**

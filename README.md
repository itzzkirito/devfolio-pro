# DevFolio Pro - Animated Developer Portfolio

Beautiful animated personal portfolio showcasing projects, GitHub stats, and live Discord presence.

## Stack

- **Next.js 14** - React framework for production
- **Framer Motion** - Animation library for React
- **TailwindCSS** - Utility-first CSS framework
- **GitHub API** - Fetch repository and stats data
- **TypeScript** - Type-safe development

## Features

- ✨ Beautiful animated UI/UX with Framer Motion
- 🎨 Professional branding and design
- 📊 Real-time GitHub stats and repositories
- 💬 Discord presence integration (using Lanyard API)
- 📱 Fully responsive design
- 🚀 Optimized performance with Next.js
- 🎯 Smooth scroll navigation
- 🌙 Dark theme with gradient accents

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd devfolio-pro
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory (see `env.example.txt`):
```env
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-github-token (optional, for higher rate limits)
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
DISCORD_USER_ID=your-discord-user-id (optional)
NEXT_PUBLIC_DISCORD_USER_ID=your-discord-user-id (optional)
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Configuration

### Personal Information

Update your personal information in the following components:

- **Hero Section** (`components/Hero.tsx`):
  - Name and title
  - Social media links
  - Call-to-action text

- **About Section** (`components/About.tsx`):
  - Bio and description
  - Experience statistics

- **Skills Section** (`components/Skills.tsx`):
  - Skill categories and technologies

- **Contact Section** (`components/Contact.tsx`):
  - Contact links and email

### GitHub Integration

The portfolio automatically fetches your GitHub repositories and statistics. Make sure to set:
- `GITHUB_USERNAME` - Your GitHub username
- `NEXT_PUBLIC_GITHUB_USERNAME` - Same as above (for client-side access)
- `GITHUB_TOKEN` (optional) - Personal access token for higher API rate limits

### Discord Presence

To enable Discord presence, you need:
- `DISCORD_USER_ID` - Your Discord user ID
- `NEXT_PUBLIC_DISCORD_USER_ID` - Same as above (for client-side access)

The portfolio uses the [Lanyard API](https://lanyard.rest) to fetch Discord presence data.

## Project Structure

```
devfolio-pro/
├── app/
│   ├── api/
│   │   └── github/          # GitHub API route
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── About.tsx            # About section
│   ├── Contact.tsx          # Contact section
│   ├── DiscordPresence.tsx  # Discord presence widget
│   ├── Footer.tsx           # Footer component
│   ├── GitHubStats.tsx      # GitHub statistics
│   ├── Hero.tsx             # Hero section
│   ├── Navigation.tsx       # Navigation bar
│   ├── Projects.tsx         # Projects showcase
│   └── Skills.tsx           # Skills section
├── lib/
│   └── github.ts            # GitHub API utilities
├── types/
│   └── index.ts             # TypeScript types
└── ...config files
```

## Customization

### Colors & Theme

The portfolio uses a dark theme with purple/pink gradient accents. To customize:

1. Edit `tailwind.config.ts` for color schemes
2. Update gradient colors in component files
3. Modify `app/globals.css` for global styles

### Animations

Animations are powered by Framer Motion. Adjust animation timings and effects in individual components.

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/devfolio-pro)

1. Push your code to GitHub
2. Import the repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The portfolio can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Troubleshooting

### GitHub API Rate Limits

If you encounter rate limit issues:
- Add a `GITHUB_TOKEN` to your environment variables
- The token should have `public_repo` scope

### Discord Presence Not Showing

- Verify your Discord User ID is correct
- Ensure `NEXT_PUBLIC_DISCORD_USER_ID` is set
- Check browser console for errors

### Build Errors

- Ensure all environment variables are set
- Run `npm install` to ensure dependencies are installed
- Check Node.js version (18+ required)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) file for details

## Credits

- Built with [Next.js](https://nextjs.org/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Styling with [TailwindCSS](https://tailwindcss.com/)
- Discord presence via [Lanyard](https://lanyard.rest)


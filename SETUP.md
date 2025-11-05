# Setup Guide - DevFolio Pro

## Quick Setup

### 1. Create `.env.local` file

Create a file named `.env.local` in the root directory of your project:

```env
# Required: Your GitHub username
NEXT_PUBLIC_GITHUB_USERNAME=itzzkirito

# Optional: GitHub Personal Access Token (for higher rate limits)
# Only add this if you have a real token. Remove if it says "your-github-token-optional"
# GITHUB_TOKEN=your_actual_github_token_here

# Optional: Discord User ID (for live Discord presence)
# NEXT_PUBLIC_DISCORD_USER_ID=your_discord_user_id_here
```

### 2. Get Your GitHub Username

Your GitHub username is: `itzzkirito` (already configured)

### 3. Get GitHub Token (Optional)

If you want higher API rate limits:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "Portfolio API"
4. Select scope: `public_repo`
5. Generate and copy the token
6. Add to `.env.local`: `GITHUB_TOKEN=your_token_here`

**Important**: If you see errors about "Bad credentials", remove the `GITHUB_TOKEN` line entirely. Public data works without a token.

### 4. Get Discord User ID (Optional)

1. Enable Developer Mode in Discord:
   - Settings → Advanced → Developer Mode
2. Right-click your profile → Copy User ID
3. Add to `.env.local`: `NEXT_PUBLIC_DISCORD_USER_ID=your_user_id_here`

### 5. Restart Development Server

After updating `.env.local`:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

## Troubleshooting

### GitHub Not Showing

- ✅ Check that `NEXT_PUBLIC_GITHUB_USERNAME` is set correctly
- ✅ Remove `GITHUB_TOKEN` if it contains "your-github-token-optional"
- ✅ Restart your dev server after changes
- ✅ Check browser console for errors

### Discord Not Showing

- ✅ The section should always be visible
- ✅ If you want live status, add `NEXT_PUBLIC_DISCORD_USER_ID`
- ✅ Without Discord ID, it will show "Offline" status

### Both Sections Should Always Be Visible

Both GitHub and Discord sections are always rendered on the page, even if:
- There's no data
- There's an error
- Environment variables aren't set

They will show helpful messages on how to configure them.


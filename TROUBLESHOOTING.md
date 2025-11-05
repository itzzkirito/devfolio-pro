# Troubleshooting Guide

## GitHub & Discord Sections Not Showing

### Quick Checks

1. **Check Browser Console**
   - Press F12 to open Developer Tools
   - Look for any red error messages
   - Check the Console and Network tabs

2. **Verify Sections Are in Page**
   - Scroll down past Projects section
   - Look for "Development Activity" (GitHub) section
   - Look for "Current Status" (Discord) section
   - Both should be visible even if there's no data

3. **Check Environment Variables**
   - Create `.env.local` in the root directory
   - Add: `NEXT_PUBLIC_GITHUB_USERNAME=itzzkirito`
   - Restart dev server: `npm run dev`

### Visual Verification

Both sections should ALWAYS be visible with:
- ✅ Section headers (titles)
- ✅ Loading states or error messages
- ✅ Setup instructions

### If Still Not Visible

1. **Hard refresh the browser**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Clear browser cache**
3. **Check page source**: Right-click → View Page Source → Search for "github-stats" or "discord-presence"
4. **Check Network tab**: Look for failed API requests

### Common Issues

**Issue**: Sections are blank/empty
- **Solution**: This is normal if no GitHub username is set. Add it to `.env.local`

**Issue**: Sections don't appear at all
- **Solution**: Check browser console for JavaScript errors

**Issue**: "Cannot read property" errors
- **Solution**: Restart dev server after changing `.env.local`

### Testing

To verify sections are rendering, you should see:
- GitHub section: "Development Activity" heading
- Discord section: "Current Status" heading

Both sections render even without data!


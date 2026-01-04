# Adding Hero Carousel Images

## Important: Image Licensing

**DO NOT use images from Google Image Search without proper licensing!** This can lead to copyright violations.

## Legal Ways to Obtain Images

### 1. Official Sources (Recommended)

- Official social media accounts (Instagram, Twitter, etc.)
- Official press kits and media releases
- Authorized photo agencies with proper licenses

### 2. Stock Photo Websites with Proper Licenses

- Getty Images (with commercial license)
- Shutterstock (with commercial license)
- iStock (with commercial license)

### 3. Creative Commons (Check License Terms)

- Wikimedia Commons
- Flickr (with appropriate CC licenses)

## How to Add Images

1. **Obtain 4-5 high-quality images** (4K resolution recommended: 3840x2160 or higher)

   - Ensure you have the right to use them
   - Save proper attribution if required by the license

2. **Optimize images for web:**

   ```bash
   # Install sharp for image optimization (if not already installed)
   npm install sharp-cli -g

   # Convert and optimize images
   sharp input.jpg -o public/images/hero/nora-1.jpg --quality 85
   ```

3. **Place images in the correct directory:**

   - Location: `public/images/hero/`
   - Naming: `nora-1.jpg`, `nora-2.jpg`, `nora-3.jpg`, `nora-4.jpg`, `nora-5.jpg`
   - Format: JPG or WebP (recommended for better compression)
   - Resolution: At least 1920x1080 (Full HD), preferably 3840x2160 (4K)

4. **Recommended Image Specifications:**
   - Aspect Ratio: 16:9 or similar (landscape orientation works best)
   - File Size: Under 500KB per image (after optimization)
   - Format: WebP for best quality/size ratio, or JPG
   - Color Profile: sRGB

## Using WebP Format (Better Performance)

If you want to use WebP format for better performance:

1. Convert images to WebP:

   ```bash
   # Using sharp-cli
   sharp input.jpg -o public/images/hero/nora-1.webp --quality 85
   ```

2. Update the carousel component to use `.webp` extension:
   - Edit `components/HeroCarousel.tsx`
   - Change file extensions from `.jpg` to `.webp`

## Image Optimization Tips

- Use Next.js Image Optimization (already configured)
- Keep original aspect ratio
- Ensure faces are centered in the frame
- Use high-quality professional photoshoot images
- Test loading performance after adding images

## Example Image Sources (Properly Licensed)

1. **Official Instagram**: Download from official account with permission
2. **Press Kits**: Contact official representatives for press materials
3. **Licensed Stock Photos**: Purchase from authorized distributors

## Testing

After adding images, test the carousel:

```bash
npm run dev
```

Visit http://localhost:3000 and verify:

- All images load correctly
- Carousel transitions smoothly
- Images are properly sized and centered
- Performance is acceptable (use Chrome DevTools)

## Troubleshooting

### Images not loading?

- Check file paths and names match exactly
- Verify files are in `public/images/hero/` directory
- Clear Next.js cache: `rm -rf .next`
- Restart dev server

### Poor performance?

- Optimize images further
- Reduce quality setting
- Use WebP format
- Implement lazy loading (already configured)

---

**Remember**: Always respect copyright and intellectual property rights when using images online.

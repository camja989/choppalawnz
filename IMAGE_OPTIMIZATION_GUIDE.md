# Image Optimization Guide for Choppalawnz Website

## Current Issues (PageSpeed Insights)
Your website has **8.8 MB** of images that need optimization, causing slow load times:
- IMG_5261.jpeg: 5.3 MB → needs to be ~30 KB (98% reduction!)
- IMG_1650.jpeg: 2.3 MB → needs to be ~5 KB (99.8% reduction!)
- updated logo.png: 1.2 MB → needs to be ~50 KB (96% reduction!)

## Quick Optimization Steps

### Option 1: Use Online Tools (Easiest)
1. **Go to https://squoosh.app** (Google's free image compressor)
2. Upload each image
3. Choose WebP format
4. Adjust quality to 80-85%
5. Resize to display dimensions:
   - `IMG_5261.jpeg` → resize to 800x1066px (or 728x969px for mobile-first)
   - `IMG_1650.jpeg` → resize to 300x300px
   - `updated logo.png` → resize to 280x52px (2x display size for retina)

### Option 2: Use macOS Tools

#### Using Preview (Built-in)
```bash
# Open image in Preview
# Tools → Adjust Size...
# Set new dimensions (uncheck "Resample image" for better quality)
# File → Export... → Choose format → Adjust Quality slider
```

#### Using ImageOptim (Free App)
```bash
# Download from: https://imageoptim.com/mac
# Drag and drop images
# Automatically compresses without quality loss
```

### Option 3: Command Line (Advanced)

Install ImageMagick and cwebp:
```bash
brew install imagemagick webp
```

Then run these commands in your `img` directory:

```bash
# Optimize and convert IMG_5261.jpeg (hero image)
magick img/IMG_5261.jpeg -resize 800x1066 -quality 85 img/IMG_5261-optimized.jpg
cwebp -q 85 img/IMG_5261-optimized.jpg -o img/IMG_5261.webp

# Optimize and convert IMG_1650.jpeg (profile image)
magick img/IMG_1650.jpeg -resize 300x300^ -gravity center -extent 300x300 -quality 85 img/IMG_1650-optimized.jpg
cwebp -q 85 img/IMG_1650-optimized.jpg -o img/IMG_1650.webp

# Optimize and convert logo PNG
magick "img/updated logo.png" -resize 280x52 -quality 85 "img/updated-logo-optimized.png"
cwebp -q 90 "img/updated-logo-optimized.png" -o "img/updated-logo.webp"

# Optimize gallery images
magick img/IMG_4941.jpeg -resize 800x600 -quality 85 img/IMG_4941-optimized.jpg
cwebp -q 85 img/IMG_4941-optimized.jpg -o img/IMG_4941.webp

magick img/IMG_5133.jpeg -resize 800x600 -quality 85 img/IMG_5133-optimized.jpg
cwebp -q 85 img/IMG_5133-optimized.jpg -o img/IMG_5133.webp
```

## Using WebP with Fallbacks

Once you have WebP versions, update your HTML to use the `<picture>` element:

### Hero Image Example
```html
<picture>
  <source srcset="img/IMG_5261.webp" type="image/webp">
  <img src="img/IMG_5261.jpeg" 
       alt="Professional lawn mowing service in Wellington - Choppalawnz"
       width="364"
       height="485"
       fetchpriority="high">
</picture>
```

### Logo Example
```html
<picture>
  <source srcset="img/updated-logo.webp" type="image/webp">
  <img src="img/updated logo.png" 
       alt="Choppalawnz - Wellington Lawn Care"
       width="140"
       height="26">
</picture>
```

### Profile Image Example
```html
<picture>
  <source srcset="img/IMG_1650.webp" type="image/webp">
  <img src="img/IMG_1650.jpeg" 
       alt="Jack Campbell - CEO of Choppalawnz"
       class="profile-image"
       width="150"
       height="150"
       loading="lazy">
</picture>
```

## Responsive Images (Advanced)

For even better performance, serve different sizes for different screen sizes:

```html
<picture>
  <source 
    srcset="img/IMG_5261-400.webp 400w, 
            img/IMG_5261-800.webp 800w, 
            img/IMG_5261-1200.webp 1200w"
    type="image/webp"
    sizes="(max-width: 768px) 100vw, 50vw">
  <source 
    srcset="img/IMG_5261-400.jpg 400w, 
            img/IMG_5261-800.jpg 800w, 
            img/IMG_5261-1200.jpg 1200w"
    type="image/jpeg"
    sizes="(max-width: 768px) 100vw, 50vw">
  <img src="img/IMG_5261-800.jpg" 
       alt="Professional lawn mowing service in Wellington - Choppalawnz"
       width="364"
       height="485"
       fetchpriority="high">
</picture>
```

## Expected Results After Optimization

✅ **LCP improved from 48.6s → ~2-3s** (goal: under 2.5s)
✅ **File size reduced from 8.8 MB → ~150 KB** (98% reduction!)
✅ **Performance score improved from 59 → 85-95+**
✅ **Bandwidth savings of ~8.7 MB per page load**

## Testing Your Changes

1. Test locally first
2. Upload to your server
3. Clear Cloudflare cache (if using)
4. Re-run PageSpeed Insights: https://pagespeed.web.dev/
5. Check that images still look good on mobile and desktop

## Important Notes

- **Always keep original images as backups!**
- Test on mobile devices - most users will see mobile version
- WebP has 95%+ browser support (IE11 excluded)
- The `<picture>` element provides automatic fallback for old browsers
- Monitor Core Web Vitals in Google Search Console

## Quick Win Checklist

- [ ] Backup original images
- [ ] Resize images to display dimensions
- [ ] Convert to WebP format
- [ ] Replace in HTML with `<picture>` elements
- [ ] Test on mobile and desktop
- [ ] Clear CDN cache
- [ ] Re-test with PageSpeed Insights

## Need Help?

If you need assistance with bulk image optimization, consider:
- Hiring a developer on Upwork/Fiverr
- Using Cloudflare's Image Resizing (paid feature)
- Using Netlify's Image CDN
- Using imgix or Cloudinary services

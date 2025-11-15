const { program } = require('commander');
const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

program
  .option('-t, --title <title>', 'The title of the article')
  .option('-a, --author <author>', 'The author of the article')
  .option('-d, --date <date>', 'The publish date of the article')
  .option('-b, --background <background>', 'The header image url of the article (supports local paths and external URLs)')
  .option('-o, --output <output>', 'The ogimage output path')
  .parse(process.argv);

const data = program.opts();

// Validate required parameters
if (!data.title || !data.author || !data.date || !data.background || !data.output) {
  console.error('Error: All parameters are required (title, author, date, background, output)');
  console.log('Example usage:');
  console.log('  node opengraph.js -t "My Article Title" -a "John Doe" -d "2023-01-01" -b "https://example.com/image.jpg" -o "output.jpg"');
  console.log('  node opengraph.js -t "My Article Title" -a "John Doe" -d "2023-01-01" -b "./local-image.jpg" -o "output.jpg"');
  process.exit(1);
}

console.log(`Generating OpenGraph image for: "${data.title}"`);
console.log(`Background image: ${data.background} ${isExternalUrl(data.background) ? '(external)' : '(local)'}`);

// Using Canvas
registerFont('./shared/assets/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf', { family: 'SourceSansPro', weight: 400 });
registerFont('./shared/assets/fonts/Source_Sans_Pro/SourceSansPro-Bold.ttf', { family: 'SourceSansPro', weight: 700 });
const canvas = createCanvas(1200, 630);
const ctx = canvas.getContext('2d');

// Determine fallback image path for background
const backgroundFallback = isExternalUrl(data.background) ? './assets/img/default-background.jpg' : null;

loadImageWithFallback(data.background, backgroundFallback).then((image) => {
  console.log(`Successfully loaded background image: ${data.background}`);

  // Draw the background image
  scaleToFill(image);

  // Add gradient overlay
  const gradient = ctx.createLinearGradient(0, 0, 0, 630);
  gradient.addColorStop(0, "rgba(0,0,0,0.2)");
  gradient.addColorStop(1, "rgba(0,0,0,0.6)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 630);

  ctx.textBaseline = "top";
  // Write title
  ctx.font = '700 90px SourceSansPro';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = "rgba(0,0,0,0.2)";
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;
  wrapText(ctx, data.title, 80, 130, 1100, 100);

  // Write date
  ctx.textBaseline = "top";
  ctx.font = '700 30px SourceSansPro';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(data.date, 80, 80);

  // Write bottom line
  ctx.textBaseline = "bottom";
  ctx.font = '700 40px SourceSansPro';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(data.author, 80, 555);

  // Load logo with fallback
  loadImageWithFallback('./assets/img/logo-with-poweredby-white.png').then(logo => {
    console.log('Successfully loaded logo image');
    ctx.drawImage(logo, 820, 490, 300, 300 * logo.height / logo.width);

    const out = fs.createWriteStream(data.output);
    const stream = canvas.createJPEGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('The JPEG file was created successfully.'));
  }).catch(error => {
    console.error('Failed to load logo image:', error);
    // Continue without logo
    const out = fs.createWriteStream(data.output);
    const stream = canvas.createJPEGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('The JPEG file was created successfully (without logo).'));
  });
}).catch(error => {
  console.error('Failed to load background image:', error);
  process.exit(1);
})

// Functions
function isExternalUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://');
}

function loadImageWithFallback(imagePath, fallbackPath = null) {
  return new Promise((resolve, reject) => {
    loadImage(imagePath)
      .then(resolve)
      .catch((error) => {
        console.warn(`Failed to load image: ${imagePath}`, error.message);
        if (fallbackPath && fallbackPath !== imagePath) {
          console.log(`Trying fallback image: ${fallbackPath}`);
          return loadImage(fallbackPath);
        } else {
          // Create a simple colored rectangle as ultimate fallback
          const fallbackCanvas = createCanvas(800, 600);
          const fallbackCtx = fallbackCanvas.getContext('2d');
          fallbackCtx.fillStyle = '#2c3e50';
          fallbackCtx.fillRect(0, 0, 800, 600);

          // Add some text to indicate it's a fallback
          fallbackCtx.fillStyle = '#ffffff';
          fallbackCtx.font = '48px Arial';
          fallbackCtx.textAlign = 'center';
          fallbackCtx.fillText('Image not available', 400, 300);

          resolve(fallbackCanvas);
        }
      })
      .then(resolve)
      .catch(reject);
  });
}

function scaleToFill(img){
  // get the scale
  var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  // get the top left position of the image
  var x = (canvas.width / 2) - (img.width / 2) * scale;
  var y = (canvas.height / 2) - (img.height / 2) * scale;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Register fonts
const fontPath = path.join(rootDir, 'public/shared/assets/fonts/Source_Sans_Pro');
registerFont(path.join(fontPath, 'SourceSansPro-Regular.ttf'), { family: 'SourceSansPro', weight: '400' });
registerFont(path.join(fontPath, 'SourceSansPro-Bold.ttf'), { family: 'SourceSansPro', weight: '700' });

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function generateDefaultOG() {
  const canvas = createCanvas(OG_WIDTH, OG_HEIGHT);
  const ctx = canvas.getContext('2d');

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, OG_WIDTH, OG_HEIGHT);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(0.3, '#16213e');
  gradient.addColorStop(0.7, '#0f3460');
  gradient.addColorStop(1, '#1a1a2e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, OG_WIDTH, OG_HEIGHT);

  // Add subtle pattern
  ctx.globalAlpha = 0.05;
  for (let i = 0; i < OG_WIDTH; i += 40) {
    for (let j = 0; j < OG_HEIGHT; j += 40) {
      ctx.beginPath();
      ctx.arc(i, j, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;

  // Add brand color accent
  const accentGradient = ctx.createLinearGradient(0, 0, OG_WIDTH, 0);
  accentGradient.addColorStop(0, 'rgba(221, 0, 49, 1)');
  accentGradient.addColorStop(0.5, 'rgba(221, 0, 49, 0.5)');
  accentGradient.addColorStop(1, 'rgba(221, 0, 49, 0)');
  ctx.fillStyle = accentGradient;
  ctx.fillRect(0, 0, OG_WIDTH, 8);

  // Draw main title
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '700 100px SourceSansPro';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 10;
  ctx.fillText('Angular.DE', OG_WIDTH / 2, OG_HEIGHT / 2 - 40);

  // Draw subtitle
  ctx.font = '400 36px SourceSansPro';
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.shadowColor = 'transparent';
  ctx.fillText('Deine deutsche Angular Community', OG_WIDTH / 2, OG_HEIGHT / 2 + 50);

  // Draw tagline
  ctx.font = '400 24px SourceSansPro';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.fillText('Tutorials • Schulungen • Community', OG_WIDTH / 2, OG_HEIGHT / 2 + 100);

  // Load and draw logo
  try {
    const logoPath = path.join(rootDir, 'public/assets/img/logo-with-poweredby-white.png');
    if (fs.existsSync(logoPath)) {
      const logo = await loadImage(logoPath);
      const logoWidth = 180;
      const logoHeight = logoWidth * logo.height / logo.width;
      ctx.drawImage(logo, OG_WIDTH - logoWidth - 40, OG_HEIGHT - logoHeight - 30, logoWidth, logoHeight);
    }
  } catch (error) {
    console.warn('Could not load logo');
  }

  // Save the image
  const outputDir = path.join(rootDir, 'public/assets/img');
  const outputPath = path.join(outputDir, 'og-default.jpg');

  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  fs.writeFileSync(outputPath, buffer);
  console.log(`✓ Generated default OG image: ${outputPath}`);
}

generateDefaultOG().catch(console.error);


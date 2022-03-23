const { program } = require('commander');
const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs')

program
  .option('-t, --title <title>', 'The title of the article')
  .option('-a, --author <author>', 'The author of the article')
  .option('-d, --date <date>', 'The publish date of the article')
  .option('-b, --background <background>', 'The header image url of the article')
  .option('-o, --output <output>', 'The ogimage output')
  .parse(process.argv);

const data = program.opts();

// Using Canvas
registerFont('./shared/assets/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf', { family: 'SourceSansPro', weight: 400 });
registerFont('./shared/assets/fonts/Source_Sans_Pro/SourceSansPro-Bold.ttf', { family: 'SourceSansPro', weight: 700 });
const canvas = createCanvas(1200, 630);
const ctx = canvas.getContext('2d');

loadImage(data.background).then((image) => {
  // ctx.drawImage(image, 0, 0, 1200, 630);
  scaleToFill(image);

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
  // ctx.fillText(data.title, 80, 80);

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

  const out = fs.createWriteStream(data.output)
  const stream = canvas.createJPEGStream()
  stream.pipe(out)
  out.on('finish', () => console.log('The PNG file was created.'))
})

// Functions
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

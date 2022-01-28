const { program } = require('commander');
const renderSocialImage = require('puppeteer-social-image');

program
  .option('-t, --title <title>', 'The title of the article')
  .option('-a, --author <author>', 'The author of the article')
  .option('-d, --date <date>', 'The publish date of the article')
  .option('-b, --background <background>', 'The header image url of the article')
  .option('-o, --output <output>', 'The ogimage output')
  .parse(process.argv);

const data = program.opts();

// Using Puppeteer Social Image
renderSocialImage.default({
  template: 'article',
  templateParams: {
    title: data.title,
    subtitle: data.author,
    eyebrow: data.date,
    imageUrl: data.background ? data.background : null,
    googleFont: 'Source Sans Pro'
  },
  type: 'jpeg',
  output: data.output,
  size: 'twitter'
});

console.log(`Generated og-image for "${data.title}"!`);
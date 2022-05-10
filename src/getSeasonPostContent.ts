import fs from 'fs';
import { chromium } from 'playwright';
import { roundConfig } from './config';
import { getPostContent } from './getPostContent';

export const getSeasonPostContent = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seasonPostContent = [];
  seasonPostContent.push('<html>');
  seasonPostContent.push('\t<head>');
  seasonPostContent.push('\t\t<style>');
  seasonPostContent.push('\t\t\tbody { font-family: Helvetica, Arial, sans-serif; }');
  seasonPostContent.push('\t\t</style>');
  seasonPostContent.push('\t</head>');
  seasonPostContent.push('\t<body>');
  seasonPostContent.push('\t\t<h1>Fixtures</h1>');
  seasonPostContent.push('\t\t<ul>');
  seasonPostContent.push('\t\t\t<li><a href="https://websites.mygameday.app/comp_info.cgi?a=FIXTURE&compID=572987&c=1-722-0-481763-0">U8 Mixed</a></li>');
  seasonPostContent.push('\t\t\t<li><a href="https://websites.mygameday.app/comp_info.cgi?a=FIXTURE&compID=572984&c=1-722-0-481763-0">U9 Mixed</a></li>');
  seasonPostContent.push('\t\t\t<li><a href="https://websites.mygameday.app/comp_info.cgi?a=FIXTURE&compID=572991&c=1-722-0-481763-0">U10 Mixed</a></li>');
  seasonPostContent.push('\t\t\t<li><a href="https://websites.mygameday.app/comp_info.cgi?a=FIXTURE&compID=572959&c=1-722-0-481763-0">U11 Mixed</a></li>');
  seasonPostContent.push('\t\t\t<li><a href="https://websites.mygameday.app/comp_info.cgi?a=FIXTURE&compID=572988&c=1-722-0-572988-0">U12 Girls</a></li>');
  seasonPostContent.push('\t\t\t<li><a href="https://websites.mygameday.app/comp_info.cgi?a=FIXTURE&compID=572997&c=1-722-0-481763-0">U12 Boys</a></li>');
  seasonPostContent.push('\t\t\t<li><a href="https://websites.mygameday.app/comp_info.cgi?a=FIXTURE&compID=572989&c=1-722-0-481763-0">U14 Girls</a></li>');
  seasonPostContent.push('\t\t\t<li><a href="https://websites.mygameday.app/comp_info.cgi?a=FIXTURE&compID=573005&c=1-722-0-481763-0">U14 Boys</a></li>');
  seasonPostContent.push('\t\t\t<li><a href="https://websites.mygameday.app/comp_info.cgi?a=FIXTURE&compID=572998&c=1-722-0-481763-0">U16 Girls</a></li>');
  seasonPostContent.push('\t\t\t<li><a href="https://websites.mygameday.app/comp_info.cgi?a=FIXTURE&compID=572982&c=1-722-0-481763-0">U17 Boys Gold</a></li>');
  seasonPostContent.push('\t\t\t<li><a href="https://websites.mygameday.app/comp_info.cgi?a=FIXTURE&compID=572966&c=1-722-0-481763-0">U17 Boys Green</a></li>');
  seasonPostContent.push('\t\t\t<li><a href="https://websites.mygameday.app/comp_info.cgi?a=FIXTURE&compID=589952&c=1-722-0-481763-0">U18 Girls</a></li>');
  seasonPostContent.push('\t\t</ul>');
  seasonPostContent.push('\t\t<br /><hr /><br />');
  for (let i = 0; i < roundConfig.length; i++) {
    const { number, date } = roundConfig[i];
    const postContent = await getPostContent(page, number, date);
    for (let j = 0; j < postContent.length; j++) {
      seasonPostContent.push(`${'\t\t'}${postContent[j]}${'<br />'}`);
    }

    seasonPostContent.push('\t\t<br /><hr /><br />');
  }
  seasonPostContent.push('\t</body>');
  seasonPostContent.push('</html>');

  await browser.close();
  fs.writeFileSync('post.html', seasonPostContent.join('\r\n'));
  return seasonPostContent.join('\r\n');
};

getSeasonPostContent().then(() => console.log('done'));

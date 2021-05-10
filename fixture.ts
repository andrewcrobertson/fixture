import * as fs from 'fs';
import { getSeasonPostContent } from './src/getSeasonPostContent';

(async () => {
  const postContent = await getSeasonPostContent();
  fs.writeFileSync(`index.html`, Buffer.from(`\ufeff${postContent}`, 'utf16le'));
})();

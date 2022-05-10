import { extractFixture } from './src/extract/extractFixture';
import { clashes } from './src/reports/clashes';
import { groundUsage } from './src/reports/groundUsage';

(async () => {
  await extractFixture();
  await groundUsage();
  await clashes();
})();

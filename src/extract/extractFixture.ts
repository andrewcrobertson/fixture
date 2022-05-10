import fs from 'fs';
import { chromium } from 'playwright';
import { dataFile } from '../config';
import { getFixture } from './getFixture';

export const extractFixture = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const fixture = await getFixture(page);
  await browser.close();

  fs.writeFileSync(dataFile, JSON.stringify(fixture, null, 2));
};

import fs from 'fs';
import { clashesFile, dataFile } from '../config';
import { getClashes } from '../util/getClashes';

export const clashes = async () => {
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  const clashes = getClashes(data);
  fs.writeFileSync(clashesFile, JSON.stringify(clashes, null, 2));
};

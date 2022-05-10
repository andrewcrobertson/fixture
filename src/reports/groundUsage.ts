import fs from 'fs';
import { Parser } from 'json2csv';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import { compMap, dataFile, groundUsageFile, venueMap } from '../config';
import { flatten } from '../util/flatten';
// import { getClashes } from '../util/getClashes';

export const groundUsage = async () => {
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  const records = map(flatten(data), ({ id, name, round, homeTeam, awayTeam, time, venue }) => ({
    id,
    name: compMap[name] ?? name,
    round,
    homeTeam,
    awayTeam,
    time,
    venue: venueMap[venue] ?? venue,
  }));
  // const clashes = getClashes(data);
  // console.log(clashes[0])
  const json2csvParser = new Parser({ eol: ',\r\n' });
  const csv = json2csvParser.parse(orderBy(records, ['round', 'name']));
  fs.writeFileSync(groundUsageFile, csv);
};

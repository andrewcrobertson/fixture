import filter from 'lodash/filter';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import toPairs from 'lodash/toPairs';
import { flatten } from './flatten';

export const getClashes = (data: any) => {
  const records = flatten(data);
  const grouped = groupBy(records, ({ round, venue, time }) => JSON.stringify({ round, venue, time }));
  const pairs = filter(toPairs(grouped), ([key, value]) => value.length > 1);
  const clashes = map(pairs, ([key, value]) => ({
    ...JSON.parse(key),
    games: map(value, ({ id, name, homeTeam, awayTeam }) => ({ id, name, homeTeam, awayTeam })),
  }));
  return clashes;
};

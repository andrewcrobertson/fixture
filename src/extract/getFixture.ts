import filter from 'lodash/filter';
import includes from 'lodash/includes';
import map from 'lodash/map';
import { Page } from 'playwright';
import { teamConfig } from '../config';
import { getCompetitionFixture } from './getCompetitionFixture';
import { getCompetitionsMeta } from './getCompetitionsMeta';

const compIds = map(teamConfig, ({ compId }) => compId);

export const getFixture = async (page: Page) => {
  const competitionsMetaRaw = await getCompetitionsMeta(page);
  const competitionsMeta = filter(
    competitionsMetaRaw,
    ({ name }) =>
      !includes(name, 'Seniors') && !includes(name, 'Reserves') && !includes(name, 'Under 19') && !includes(name, 'Women') && !includes(name, 'Veterans')
  );
  // const competitionsMeta = filter(competitionsMetaRaw, ({ id }) => includes(compIds, id));
  const competitionFixtures = [];
  for (let i = 0; i < competitionsMeta.length; i++) {
    const { id, name } = competitionsMeta[i];
    const competition = await getCompetitionFixture(page, id, name);
    competitionFixtures.push(competition);
  }

  return competitionFixtures;
};

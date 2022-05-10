import { Page } from 'playwright';
import { getCompetitionFixtureRound } from './getCompetitionFixtureRound';

export const getCompetitionFixture = async (page: Page, compId: string, name: string) => {
  const rounds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  //const rounds = [1, 2, 3, 4]

  const competition = { id: compId, name, fixture: [] };
  console.log(name);
  for (let i = 0; i < rounds.length; i++) {
    const round = rounds[i];
    console.log(`- Round ${round}`);
    const { games, bye } = await getCompetitionFixtureRound(page, compId, round);
    competition.fixture.push({ round, games, bye });
  }

  return competition;
};

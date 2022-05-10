import { Page } from 'playwright';

export interface ICompetitionFixtureRound {
  games: IFixtureItemGame[];
  bye: string | null;
}

export interface IFixtureItemGame {
  homeTeam: string;
  awayTeam: string;
  venue: string;
  time: string;
}

export const getCompetitionFixtureRound = async (page: Page, compId: string, round: number) => {
  const competitionFixtureRound: ICompetitionFixtureRound = { games: [], bye: null };

  try {
    await page.goto(`https://websites.mygameday.app/comp_info.cgi?round=${round}&a=ROUND&client=1-722-0-${compId}-0`);

    const name = await page.$$(`//select[@name="round"]/option[@value="${round}"]`);
    if (name.length === 0) throw new Error('No Round Yet');

    const gameRows = await page.$$('//div[@class="match-detail"]');
    for (let j = 0; j < gameRows.length; j++) {
      const gameRow = gameRows[j];
      const homeElement = await gameRow.$('//a[contains(@class, "m-home")]');
      const awayElement = await gameRow.$('//a[contains(@class, "m-away")]');
      const timeElement = await gameRow.$('//div[contains(@ng-bind-html, "::m.Time")]');
      const venueElement = await gameRow.$('//a[contains(@class, "venuename")]');
      const homeTeam = await homeElement.innerHTML();
      const awayTeam = await awayElement.innerHTML();
      const venue = await venueElement.innerHTML();
      const time = await timeElement.innerHTML();
      competitionFixtureRound.games.push({ homeTeam, awayTeam, venue, time: time.replace('&nbsp;', '').toLowerCase() });
    }

    const byeRows = await page.$$('//div[contains(@class, "m-bye")]');
    if (byeRows.length > 1) throw new Error('Too many bye rows');
    for (let j = 0; j < byeRows.length; j++) {
      const byeRow = byeRows[j];
      const teamElement = await byeRow.$('//a[contains(@class, "m-team")]');
      const team = await teamElement.innerHTML();
      competitionFixtureRound.bye = team;
    }
  } catch (err) {
    console.log(err);
  }

  return competitionFixtureRound;
};

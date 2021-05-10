import { Page } from 'playwright';
import { teamConfig } from './config';

export const getFixture = async (page: Page, round: number) => {
  const postContent: string[] = [];

  for (let i = 0; i < teamConfig.length; i++) {
    const teamX = teamConfig[i];

    try {
      await page.goto(`https://websites.sportstg.com/comp_info.cgi?round=${round}&a=ROUND&client=1-722-0-${teamX.compId}-0`);

      const name = await page.$$(`//select[@name="round"]/option[@value="${round}"]`);
      if (name.length === 0) throw new Error('No Round Yet');

      const gameRows = await page.$$('//div[@class="match-detail"]');
      const byeRows = await page.$$('//div[contains(@class, "m-bye")]');

      for (let j = 0; j < gameRows.length; j++) {
        const gameRow = gameRows[j];
        const homeElement = await gameRow.$('//a[contains(@class, "m-home")]');
        const awayElement = await gameRow.$('//a[contains(@class, "m-away")]');
        const timeElement = await gameRow.$('//div[contains(@ng-bind-html, "::m.Time")]');
        const venueElement = await gameRow.$('//a[contains(@class, "venuename")]');
        const homeTmp = await homeElement.innerHTML();
        const awayTmp = await awayElement.innerHTML();
        const timeTmp = await timeElement.innerHTML();
        const venueTmp = await venueElement.innerHTML();
        if (homeTmp === teamX.name || awayTmp === teamX.name) {
          const oppositionTeam = homeTmp === teamX.name ? awayTmp : homeTmp;
          const venue = venueTmp === 'Bayswater Junior Oval' ? 'Home' : venueTmp;
          postContent.push(`${teamX.bullet} ${teamX.team} Vs ${oppositionTeam} @ ${venue} - ${timeTmp.replace('&nbsp;', '').toLowerCase()}`);
        }
      }

      for (let j = 0; j < byeRows.length; j++) {
        const byeRow = byeRows[j];
        const teamElement = await byeRow.$('//a[contains(@class, "m-team")]');
        const team = await teamElement.innerHTML();
        if (team === teamX.name) postContent.push(`${teamX.bullet} ${teamX.team} BYE`);
      }
    } catch {
      postContent.push(`${teamX.bullet} ${teamX.team} ??`);
    }
  }

  return postContent;
};

import last from 'lodash/last';
import orderBy from 'lodash/orderBy';
import split from 'lodash/split';
import { Page } from 'playwright';

// href eg. `comp_info.cgi?a=FIXTURE&compID=574748&c=1-722-0-481763-0`
const getCompId = (href: string) => {
  const queryString = last(split(href, '?'));
  const compIdKeyValue = split(queryString, '&')[1];
  const compId = last(split(compIdKeyValue, '='));
  return compId;
};

export const getCompetitionsMeta = async (page: Page) => {
  await page.goto(`https://websites.mygameday.app/assoc_page.cgi?c=1-722-0-481763-0&a=COMPS`);

  const competitionsMeta = [];

  const rowElements = await page.$$('//tr[./td[@class="flr-list-comp"]]');
  for (let i = 0; i < rowElements.length; i++) {
    const competitionMeta = { id: null, name: 'Unknown' };
    const rowElement = rowElements[i];
    const tdElements = await rowElement.$$('//td[@class="flr-list-comp"]');
    if (tdElements.length === 1) {
      const name = await tdElements[0].innerHTML();
      competitionMeta.name = name;
    }

    const anchorElements = await rowElement.$$('//a[@class="fixture-link"]');
    if (anchorElements.length === 1) {
      const href = await anchorElements[0].getAttribute('href');
      const compId = getCompId(href);
      competitionMeta.id = compId;
    }

    competitionsMeta.push(competitionMeta);
  }

  return orderBy(competitionsMeta, ['name', 'id']);
};

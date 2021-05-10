import { Page } from 'playwright';
import { getFixture } from './getFixture';

export const getPostContent = async (page: Page, round: number, date: string) => {
  const fixture = await getFixture(page, round);

  const postContent = [];
  postContent.push(`ROUND ${round} | ${date}`);
  postContent.push('');
  postContent.push('Wishing all teams a great game today! 🤗🏉🏟');
  postContent.push('');
  postContent.push(...fixture);
  postContent.push('');
  postContent.push('Go Baysie! 💚💛');

  return postContent;
};

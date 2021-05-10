import { chromium } from "playwright";
import { roundConfig } from "./config";
import { getPostContent } from "./getPostContent";

export const getSeasonPostContent = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seasonPostContent = [];
  for (let i = 0; i < roundConfig.length; i++) {
    const { number, date } = roundConfig[i];
    const postContent = await getPostContent(page, number, date);
    seasonPostContent.push(postContent);
  }

  await browser.close();
  return seasonPostContent.join("\r\n\r\n---\r\n\r\n");
};

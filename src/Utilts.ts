import { IRedditPost } from "./Interface";
import { openAnswer, startBrowser } from "./Puppeteer.js";

export const formatUpvotes = (upvotes: number): string => {
  if (upvotes < 1000) {
    return upvotes.toString();
  }

  const rounded = (upvotes / 1000).toPrecision(2);

  return `${rounded}k`;
};

export const getMultipleImages = async (comments: IRedditPost[]) => {
  const { page, browser } = await startBrowser();

  for (var i = 0; i < comments.length; i++) {
    await openAnswer(page, comments[i]);
  }

  browser.close();
};
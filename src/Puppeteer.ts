import puppeteer, { Page } from "puppeteer";
import * as path from "path";
import * as fs from "fs";
import { IRedditPost } from "./Interface";
import { formatUpvotes, getRandomUserIcon } from "./Utilts";

export const startBrowser = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  return { browser, page };
};

export const openAnswer = async (page: Page, comment: IRedditPost) => {
  await page.setViewport({ width: 470, height: 300, deviceScaleFactor: 10 });

  const __dirname = path.resolve(path.dirname("."));
  var content = fs.readFileSync(`${__dirname}/comment.html`, "utf-8");

  const upvotesFormated = formatUpvotes(comment.upvotes);

  const json = await fetch(
    `https://www.reddit.com/user/${comment.author}/about.json`
  );
  const data = await json.json();
  var icon =
    data === undefined
      ? ""
      : data.data === undefined
      ? ""
      : data.data.snoovatar_img;

  if (icon === "" || data.data.snoovatar_img === undefined) {
    icon = getRandomUserIcon();
  }

  content = content.replace("(AUTHOR)", comment.author);
  content = content.replace("(TEXT)", comment.text);
  content = content.replace("(UPVOTES)", upvotesFormated);
  content = content.replace("(ICON)", icon);
  const css = fs.readFileSync(`${__dirname}/stylescomment.css`, "utf-8");
  content = content.replace("(STYLE)", css);

  //Change local fonts to redit fonts
  content = content.replace(
    '"font.woff"',
    `"https://www.redditstatic.com/desktop2x/fonts/redesignIcon2020/redesignFont2020.971ac4e47ee7863c9338c58b059a0c86.woff"`
  );
  content = content.replace(
    '"font2.woff2"',
    `"https://www.redditstatic.com/desktop2x/fonts/IBMPlexSans/Bold-875de5047556e7c822519d95d7ee692d-font.woff2"`
  );
  await page.setContent(content);

  const headerElem = await page.$(".header");
  const headerHeight =
    (await headerElem?.evaluate((e) => e.getBoundingClientRect().height)) || 0;

  const bodyElem = await page.$(".main");
  const bodyHeight =
    (await bodyElem?.evaluate((e) => e.getBoundingClientRect().height)) || 0;

  await page.screenshot({
    path: `RedditImages/Comments/comment-${comment.author}-${comment.upvotes}.png`,
    clip: {
      x: 0,
      y: 0,
      width: 470,
      height: headerHeight + bodyHeight,
    },
  });
};

export const openQuestion = async (post: IRedditPost) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 500,
    height: 200,
    deviceScaleFactor: 10,
  });

  const __dirname = path.resolve(path.dirname("."));
  var content = fs.readFileSync(`${__dirname}/question.html`, "utf-8");

  const upvotesFormated = formatUpvotes(post.upvotes);

  //Load and format html with post information
  content = content.replace("(SCORE)", upvotesFormated);
  content = content.replace("(AUTHOR)", post.author);
  content = content.replace("(TEXT)", post.text);

  //Load css from other file
  const css = fs.readFileSync(`${__dirname}/stylesquestion.css`, "utf-8");
  content = content.replace("(STYLE)", css);

  //Change local fonts to redit fonts
  content = content.replace(
    '"font.woff"',
    `"https://www.redditstatic.com/desktop2x/fonts/redesignIcon2020/redesignFont2020.971ac4e47ee7863c9338c58b059a0c86.woff"`
  );
  content = content.replace(
    '"font2.woff2"',
    `"https://www.redditstatic.com/desktop2x/fonts/IBMPlexSans/Bold-875de5047556e7c822519d95d7ee692d-font.woff2"`
  );

  await page.setContent(content);

  await page.screenshot({
    path: `RedditImages/Question.png`,
    fullPage: true,
  });

  await browser.close();
};

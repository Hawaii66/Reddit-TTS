import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { IRedditPost } from "./Interface";
import { formatUpvotes } from "./Utilts.js";

export const go = async (post: IRedditPost) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({
    width: 500,
    height: 200,
  });

  const __dirname = path.resolve(path.dirname("."));
  var content = fs.readFileSync(`${__dirname}/test.html`, "utf-8");

  const upvotesFormated = formatUpvotes(post.upvotes);

  //Load and format html with post information
  content = content.replace("(SCORE)", upvotesFormated.toString());
  content = content.replace("(AUTHOR)", post.author);
  content = content.replace("(TEXT)", post.text);

  //Load css from other file
  const css = fs.readFileSync(`${__dirname}/styles.css`, "utf-8");
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

  await page.screenshot({ path: "example1.png" });

  await browser.close();
};

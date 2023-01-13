import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { IRedditPost } from "./Interface";

export const go = async (post: IRedditPost) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 200,
    height: 200,
  });

  const __dirname = path.resolve(path.dirname("."));

  var content = fs.readFileSync(`${__dirname}/test.html`, "utf-8");

  content = content.replace("{TITLE}", post.author);
  content = content.replace("{TEXT}", post.text);
  content = content.replace("{UPVOTES}", post.upvotes.toString());

  await page.setContent(content);

  await page.screenshot({ path: "example2.png" });

  await browser.close();
};

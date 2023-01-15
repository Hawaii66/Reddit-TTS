import { IRedditPost } from "./Interface";
import * as path from "path";
import * as fs from "fs";
import { openAnswer, openQuestion, startBrowser } from "./Puppeteer";
import { getPost } from "./Reddit";

export const formatUpvotes = (upvotes: number): string => {
  if (upvotes < 1000) {
    return upvotes.toString();
  }

  const rounded = (upvotes / 1000).toPrecision(2);

  return `${rounded}k`;
};

export const getRandomUserIcon = () => {
  const number = Math.floor(Math.random() * 8);
  return `https://www.redditstatic.com/avatars/defaults/v2/avatar_default_${number}.png`;
};

export const getMultipleImages = async (comments: IRedditPost[]) => {
  const { page, browser } = await startBrowser();

  for (var i = 0; i < comments.length; i++) {
    await openAnswer(page, comments[i]);
  }

  browser.close();
};

export const getAskRedditImage = async () => {
  const post = await getPost();

  removeImages("RedditImages");
  removeImages("RedditImages/Comments");
  removeVoices("RedditImages");
  removeVoices("RedditImages/Comments");

  await openQuestion(post);
  await getMultipleImages(post.comments);

  return post;
};

export const removeImages = (dir: string) => {
  removeWithExtension(dir, ".png");
};

export const removeVoices = (dir: string) => {
  removeWithExtension(dir, ".mp3");
};

export const removeWithExtension = (dir: string, ext: string) => {
  const __dirname = path.resolve(path.dirname("."));
  fs.readdir(`${__dirname}/${dir}`, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      if (path.extname(file) === ext) {
        fs.unlink(path.join(`${__dirname}/${dir}`, file), (err) => {
          if (err) throw err;
        });
      }
    }
  });
};

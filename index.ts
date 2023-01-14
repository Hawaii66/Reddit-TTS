import { openAnswer } from "./src/Puppeteer.js";
import { getPost } from "./src/Reddit.js";
import { getAskRedditImage, getMultipleImages } from "./src/Utilts.js";

const main = async () => {
  await getAskRedditImage();
};

main();

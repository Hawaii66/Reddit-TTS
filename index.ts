import { openAnswer } from "./src/Puppeteer.js";
import { getPost } from "./src/Reddit.js";
import { getMultipleImages } from "./src/Utilts.js";

const main = async () => {
  const post = await getPost();

  await getMultipleImages(post.comments);
};

main();

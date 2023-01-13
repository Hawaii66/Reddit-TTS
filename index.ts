import { go } from "./src/Puppeteer.js";
import { getPost } from "./src/Reddit.js";

const main = async () => {
  const post = await getPost();

  go(post);
};

main();

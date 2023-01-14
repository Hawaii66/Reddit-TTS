import { openAnswer } from "./src/Puppeteer.js";
import { getPost } from "./src/Reddit.js";
import { getAskRedditImage, getMultipleImages } from "./src/Utilts.js";
import { generateText } from "./src/Polly.js";

const main = async () => {
  const askReddit = await getAskRedditImage();

  for (var i = 0; i < askReddit.comments.length; i++) {
    generateText(
      askReddit.comments[i].text,
      `/Comments/Voice-${askReddit.comments[i].author}-${askReddit.comments[i].upvotes}`
    );
  }
};

main();

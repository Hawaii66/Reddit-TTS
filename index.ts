import { openAnswer } from "./src/Puppeteer";
import { getPost } from "./src/Reddit";
import { getAskRedditImage, getMultipleImages } from "./src/Utilts";
import { generateText } from "./src/Polly";

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

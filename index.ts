import { generateText } from "./src/Polly";
import { getAskRedditImage } from "./src/Utilts";

const main = async () => {
  const askReddit = await getAskRedditImage();

  generateText(
    askReddit.text,
    `Voice-${askReddit.author}-${askReddit.upvotes}`
  );

  for (var i = 0; i < askReddit.comments.length; i++) {
    generateText(
      askReddit.comments[i].text,
      `/Comments/Voice-${askReddit.comments[i].author}-${askReddit.comments[i].upvotes}`
    );
  }
};

main();

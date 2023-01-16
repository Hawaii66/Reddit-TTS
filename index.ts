import { generateText } from "./src/Polly";
import { getAskRedditImage } from "./src/Utilts";

const main = async () => {
  console.log("Starting reddit fetch");
  const askReddit = await getAskRedditImage();
  console.log("Generating question voice");
  generateText(askReddit.text, `/Voice`);
  console.log("Generating question voices");
  for (var i = 0; i < askReddit.comments.length; i++) {
    console.log("Generating voice", askReddit.comments[i].author);
    generateText(
      askReddit.comments[i].text,
      `/Comments/Voice-${askReddit.comments[i].author}-${askReddit.comments[i].upvotes}`
    );
  }
};

main();

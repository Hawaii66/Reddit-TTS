import { generateText } from "./src/Polly";
import { getAskRedditImage } from "./src/Utilts";

const main = async () => {
  console.log("Starting reddit fetch");
  const askReddit = await getAskRedditImage();
  console.log("Generating question voice");
  await generateText(askReddit.text, `/Voice`);
  console.log("Generating question voices");
  var promises: Promise<any>[] = [];
  for (var i = 0; i < askReddit.comments.length; i++) {
    console.log("Generating voice", askReddit.comments[i].author);
    promises.push(
      generateText(
        askReddit.comments[i].text,
        `/Comments/Voice-${askReddit.comments[i].author}-${askReddit.comments[i].upvotes}`
      )
    );
  }

  await Promise.all(promises);
  console.log("Done generating responses");
};

main();

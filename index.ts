import { generateText } from "./src/Polly";
import { getAskRedditImage } from "./src/Utilts";
import { spawn } from "child_process";

const main = async () => {
  const askReddit = await getAskRedditImage();

  await generateText(askReddit.text, `/Voice`);

  var promises: Promise<any>[] = [];
  for (var i = 0; i < askReddit.comments.length; i++) {
    promises.push(
      generateText(
        askReddit.comments[i].text,
        `/Comments/Voice-${askReddit.comments[i].author}-${askReddit.comments[i].upvotes}`
      )
    );
  }

  await Promise.all(promises);

  const python = spawn("python", ["editor.py"]);

  python.on("close", () => {
    console.log("Python script done");
  });

  python.stdout.on("data",(t)=>{
	console.log(t);
  })
};

main();

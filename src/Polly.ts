import * as dotenv from "dotenv";
dotenv.config();

import AWS from "aws-sdk/global.js";
import Polly from "aws-sdk/clients/polly.js";
import fs from "fs";
import path from "path";

export const getPolly = () => {
  const creds = new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET_KEY || "",
  });

  const polly = new Polly({
    apiVersion: "2016-06-10",
    credentials: creds,
    region: "eu-north-1",
  });

  return polly;
};

export const generateText = async (text: string, directory: string) => {
  const polly = getPolly();

  const params = {
    OutputFormat: "mp3",
    Text: text,
    VoiceId: "Matthew",
  };

  polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
      console.log("Polly error", err);
      return;
    }
    const __dirname = path.resolve(path.dirname("."));
    fs.writeFile(
      `${__dirname}/RedditImages${directory}.mp3`,
      data.AudioStream as string,
      (e) => {
        console.log("File writing error", e);
      }
    );
  });
};

import { resolve } from "dns";
import fs from "fs";
import readline from "readline";

function fetchWords(readableStream) {
  return new Promise((resolve, reject) => {
    let wordCounter = 0;

    const rl = readline.createInterface({
      input: readableStream,
      crlfDelay: Infinity,
    });

    //events
    rl.on("line", (line) => {
      const strArray = line.trim().match(/\w+/g);
      const re = /^[A-Za-z]+$/;
      if (strArray) {
        for (let str of strArray) {
          const word = str.replace(/[^a-zA-Z0-9]/g, "");
          if (re.test(word)) {
            wordCounter++;
          }
        }
      }
    });

    rl.on("close", () => {
      //console.log(wordCounter);
      resolve(wordCounter);
    });

    rl.on("error", reject);
  });
}

export async function getFileWords(readableStream) {
  try {
    const words = await fetchWords(readableStream);
    return words;
  } catch (err) {
    // console.error(err);
    console.error("Error: no specific file or directory");
  }
}

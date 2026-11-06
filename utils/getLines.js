import fs from "fs";
import readline from "readline";

function fetchLine(readableStream) {
  return new Promise((resolve, reject) => {
    //const fileStream = fs.createReadStream(filePathArgument);
    let lineCounter = 0;

    const rl = readline.createInterface({
      input: readableStream,
      crlfDelay: Infinity,
    });
    //events
    rl.on("line", () => {
      lineCounter++;
    });
    rl.on("close", () => {
      resolve(lineCounter);
    });
    rl.on("error", reject);
  });
}

//
export async function getFileLines(readableStream) {
  try {
    const lines = await fetchLine(readableStream);

    return lines;
  } catch (err) {
    console.error("Error: no specified file or directory");
    console.error(err);
  }
}

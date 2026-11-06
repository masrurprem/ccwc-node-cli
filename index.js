#!/usr/bin/env node
//imports
import fs from "fs";
import { Readable } from "stream";
import { getFileByte } from "./utils/getBytes.js";
import { getFileLines } from "./utils/getLines.js";
import { getFileWords } from "./utils/getWords.js";
import { getChars } from "./utils/getChars.js";

//

async function main() {
  const opsArgs = process.argv.slice(2);
  const options = opsArgs.filter((ops) => ops.startsWith("-"));
  const args = opsArgs.filter((arg) => !arg.startsWith("-"));
  //console.log(options.length);
  //return;
  let filePathArgument = "";
  let option = "";
  if (options.length > 0) {
    option = options[0];
  }

  if (args.length > 0) {
    filePathArgument = args[0];
  }

  let lines = 0,
    bytes = 0,
    words = 0,
    chars = 0;

  if (filePathArgument) {
    //get all data
    lines = await getFileLines(fs.createReadStream(filePathArgument));
    bytes = await getFileByte(fs.createReadStream(filePathArgument));
    words = await getFileWords(fs.createReadStream(filePathArgument));
    chars = await getChars(
      fs.createReadStream(filePathArgument, { encoding: "utf-8" }),
    );
  } else {
    const chunks = [];
    for await (const chunk of process.stdin) {
      chunks.push(chunk);
    }
    const data = Buffer.concat(chunks);
    //

    //
    lines = await getFileLines(Readable.from([data]));
    bytes = await getFileByte(Readable.from([data]));
    words = await getFileWords(Readable.from([data]));
    chars = await getChars(Readable.from([data]).setEncoding("utf-8"));
  }

  //
  if (option === "-l" || option === "--line") {
    console.log(lines, filePathArgument);
  } else if (option === "-w") {
    console.log(words, filePathArgument);
  } else if (option === "-c") {
    console.log(bytes, filePathArgument);
  } else if (option === "-m") {
    console.log(chars, filePathArgument);
  } else if (option === "") {
    console.log(lines, words, bytes, filePathArgument);
  }
}
main();

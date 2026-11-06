import fs from "fs/promises";

export async function getChars(ReadableStream) {
  try {
    let charLength = 0;
    for await (let chunk of ReadableStream) {
      charLength += chunk.length;
    }
    return charLength;
  } catch (err) {
    //console.error(err);
    console.error("Error: no specific file or directory");
  }
}

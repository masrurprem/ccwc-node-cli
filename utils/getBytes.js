import fs from "fs/promises";

export async function getFileByte(readableStream) {
  try {
    let byteCount = 0;
    for await (let chunk of readableStream) {
      byteCount += chunk.length;
    }
    return byteCount;
  } catch (err) {
    console.error("Error: no specific file or directory");
    //console.log(err);
  }
}

import readline from "readline";
export async function pipe() {
  const rl = readline.createInterface({
    input: process.stdin,
  });

  for await (const line of rl) {
    process.stdout.write(line + "\n");
  }
}

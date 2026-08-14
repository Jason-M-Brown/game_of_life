import * as readline from "node:readline/promises";

export function print(output: any) {
  return console.log(output);
}

export async function waitForKey(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let answer: string;
  do {
    answer = await rl.question(question);
  } while (answer !== "");

  rl.close();
  return answer;
}

export async function waitForBoardSize(question: string) : Promise<number> {
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let answer: string;
  let num: number;
  do {
    answer = await r1.question(question);
    num = Number(answer);
  } while(Number.isNaN(num) || num < 1 || num > 10);
  return num
}
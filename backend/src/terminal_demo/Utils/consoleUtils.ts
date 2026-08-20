import * as readline from "node:readline/promises";

export function print(output: any) {
  return console.log(output);
}


//NEED TO UNDERSTAND WHAT THIS IS DOING
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

export async function getUserCords(question: string): Promise<string> {
  console.log("question ran")
  const coordPattern = /^\(?\s*-?\d+\s*,\s*-?\d+\s*\)?$/;
  let answer: string;
  do {
    answer = await r1.question(question);
  } while (!coordPattern.test(answer));
  return answer;
}


export async function waitForKey(question: string): Promise<string> {
  return r1.question(question);
}

export async function waitForBoardSize(question: string) : Promise<number> {
  let answer: string;
  let num: number;
  do {
    answer = await r1.question(question);
    num = Number(answer);
  } while(Number.isNaN(num) || num < 1 || num > 10);
  return num
}

export function closeInput(): void {
  r1.close();
}
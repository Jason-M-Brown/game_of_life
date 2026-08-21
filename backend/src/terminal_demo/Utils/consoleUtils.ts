import * as readline from "node:readline/promises";


//NEED TO UNDERSTAND WHAT THIS IS DOING
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


/*
  EFFECT: allows me to use print, instead of console.log :)
*/
export function print(output: any) {
  return console.log(output);
}

/*
  EFFECT: Ask user to enter a coordinate grid they wish to toggle
  RETURN: (x,y)
*/
export async function getUserCords(question: string, max:number): Promise<string> {
  const limit = max - 1;
  const coordPattern = new RegExp(`^[0-${limit}],[0-${limit}]$`)
  const toString = (input:string) => input;
  const isValid = (value:string) => coordPattern.test(value)
  return promptUntilValid(question, (input) => input, (value) => coordPattern.test(value))
}

/*
  EFFECT: Ask user to enter a valid board size
*/
export async function waitForBoardSize(question: string) : Promise<number> {
  const isValid = (input:number) => !Number.isNaN(input) && input >= 1 && input < 10
  const toNumber = (input:string) => Number(input);
  
  return promptUntilValid(question, toNumber, isValid);
}

/*
  EFFECT: waits for user to press enter
*/
export async function waitForKey(question: string): Promise<string> {
  return r1.question(question);
}

/*
  EFFECT: asks user if they wish to change the default state of the board
*/
export async function askChangeState(question: string) : Promise<boolean> {
  const isValid = (input:string) => input === "y" || input === "n";
  const toString = (input:string) => input;
  const result = await promptUntilValid(question, toString, isValid);

  return result === "y";
}

/*
  EFFECT: closes the r1 user input
*/
export function closeInput(): void {
  r1.close();
}


// HELPERS

/*
  REQUIRES: a parse function and a isValid Function 
  EFFECT: Continues to ask user a question until requirement is met
*/
async function promptUntilValid<T>(
  question: string, 
  parse: (input: string) => T, 
  isValid: (value: T) => boolean): Promise<T> {
    let value: T;                       
    do {
      const answer = await r1.question(question);
      value = parse(answer);
    } while (!isValid(value));
    return value;
  }

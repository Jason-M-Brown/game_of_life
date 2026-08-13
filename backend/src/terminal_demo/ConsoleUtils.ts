export function print(output: any) {
    return console.log(output);
}

export function waitForKey(target: string): Promise<void> {
  return new Promise((resolve) => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    const handler = (key: string) => {
      if (key === target) {
        process.stdin.off("data", handler);
        resolve();
      }
    };

    process.stdin.on("data", handler);
  });
}

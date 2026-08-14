const whitespace = `

















`




export function getWhiteSpace() : string {
    return whitespace;
}

export function getStartup() {
    return `
    ${whitespace}
Welcome to Conway's game of life

Press enter to continue....`
};

export function getSize(dimension: string) {
    return `Please enter the ${dimension} size. (3 to 10)`};

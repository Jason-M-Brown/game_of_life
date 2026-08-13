

const whitespace = `

















`
export function getStartup() {
    return `
    ${whitespace}
    Welcome to Conway's game of life


    Press space to continue....
    `;
}

export function getSize(dimension: string) {
    return `

    Please enter the ${dimension} size. (3 to 10)

    `
};

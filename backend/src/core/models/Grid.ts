export class Pattern {
    grid : boolean[][] = [];

    constructor(size: number) {

        checkIfOddSize(size);
        this.grid = generateGrid(size);
    };

    //Checks to see if size is a valid input
    private static checkIfOddSize(size: number): void {
        if(size <= 1 || size % 2 === 0 || Number.isInteger(size)) {
            throw new Error("Pattern size must be a positive odd Number");
        };
    };

    //Generates a 2D boolean grid filled with false
    private static generateGrid(size: number) : boolean[][] {
        let grid : boolean[][] = []
        for(let y = 0; y < size; y++) {
            const row: boolean[] = new Array(size).fill(false);
            grid.push(row);
        };
        return grid;
    };
};




/*
    HELPERS
*/


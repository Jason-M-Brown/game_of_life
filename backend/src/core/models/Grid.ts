/*
NOTES: When writting this class I noticed that Pattern is really a type of gameboard, but I do not want to 
       run this object. Maybe I should turn boardUtils into a class and abstract away the common behaviours
       this way both Patterns and boardUtils can use the same underlined logic. 

       Patterns has a harder requirement, so I have to be careful not to break liskov principle. 
*/

export class Grid {
    grid : boolean[][] = [];

    constructor(size: number) {

        Grid.checkIfOddSize(size);
        this.grid = Grid.generateGrid(size);
    };

    //Checks to see if size is a valid input
    private static checkIfOddSize(size: number): void {
        if(!Number.isInteger(size) || size <= 0 || size % 2 == 0) {
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

// EFFECT: takes a set of coordinates, and turns 
function setAllStates(grid: Grid, coordinates :Set<string>, state: boolean) {

}



/*
    HELPERS
*/


/*
NOTES: When writting this class I noticed that Pattern is really a type of gameboard, but I do not want to 
       run this object. Maybe I should turn boardUtils into a class and abstract away the common behaviours
       this way both Patterns and boardUtils can use the same underlined logic. 

       Patterns has a harder requirement, so I have to be careful not to break liskov principle. 
*/


export class Grid {
    grid : boolean[][] = [];
    columns : number;
    row : number;

    private static readonly OUT_OF_BOUNDS_ROW = "Row out of Bounds: ";
    private static readonly OUT_OF_BOUNDS_COL = "Column out of Bounds: ";
    private static readonly INVALID_HEIGHT = "Invalid Column size";
    private static readonly INVALID_WIDTH  = "Invalid Row size";


    constructor(height: number, columns: number) {
        //Grid.checkIfOddSize(size);  <- for subchild pattern
        Grid.validateCoordinates(height, columns);
        this.grid = Grid.generateGrid(height, columns);
        this.columns = columns;
        this.row = height;
        
    };

    getCell(y: number, x: number) : boolean {
        Grid.validateBounds(this, y, x);
        return this.getGrid()[y]![x]!;
    }

    flipState(y: number, x: number) : void {
        this.getGrid()[y]![x] = !this.getCell(y, x);     
    }

    setCell(y: number, x: number, value: boolean) : void {
        Grid.validateBounds(this, y, x);
        this.getGrid()[y]![x] = value;
    }
    
    //TO DO:
    clone(grid: boolean[][]) {

    }
    //clone()


    // Private Functions //

    private getGrid() : boolean[][] {
        return this.grid;
    }

    private static validateBounds(grid: Grid, y: number, x: number) : void {
        Grid.validateRowInBounds(grid, y);
        Grid.validateColumnInBounds(grid, y, x);

    }

    private static validateRowInBounds(grid  :Grid, y: number) : void {
        if(y < 0 || y >= grid.row) {
            throw new Error(Grid.OUT_OF_BOUNDS_ROW);
        }
    }

    private static validateColumnInBounds(grid: Grid, y:number, x:number) : void {
        if(x < 0 || x >= grid.columns) {
            throw new Error(Grid.OUT_OF_BOUNDS_COL);
        }
    }

    /*
    // For subchild pattern
    //Checks to see if size is a valid input
    private static checkIfOddSize(size: number): void {
        if(!Number.isInteger(size) || size <= 0 || size % 2 == 0) {
            throw new Error("Pattern size must be a positive odd Number");
        };
    };
    */

    private static validateCoordinates(height: number, width: number) : void {
        if(height <= 0 || !Number.isInteger(height)) {
            throw new Error(Grid.INVALID_HEIGHT);
        }

        if(width <= 0 || !Number.isInteger(width)) {
            throw new Error(Grid.INVALID_WIDTH);
        }
        
    };

    //Generates a 2D boolean grid filled with false
    private static generateGrid(height: number, width: number) : boolean[][] {
        let grid : boolean[][] = []
        for(let y = 0; y < height; y++) {
            const row: boolean[] = new Array(width).fill(false);
            grid.push(row);
        };
        return grid;
    };
};


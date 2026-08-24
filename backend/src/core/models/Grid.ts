/*
NOTES: When writting this class I noticed that Pattern is really a type of gameboard, but I do not want to 
       run this object. Maybe I should turn boardUtils into a class and abstract away the common behaviours
       this way both Patterns and boardUtils can use the same underlined logic. 

       Patterns has a harder requirement, so I have to be careful not to break liskov principle. 
*/


export class Grid {
    grid : boolean[][] = [];
    width : number;
    height : number;

    private static readonly OUT_OF_BOUNDS_ROW = "Row out of Bounds: ";
    private static readonly OUT_OF_BOUNDS_COL = "Column out of Bounds: ";
    private static readonly INVALID_HEIGHT = "Invalid Height";
    private static readonly INVALID_WIDTH  = "Invalid Width";


    constructor(height: number, width: number) {
        //Grid.checkIfOddSize(size);  <- for subchild pattern
        Grid.validateCoordinates(height, width);
        this.grid = Grid.generateGrid(height, width);
        this.width = width;
        this.height = height;
        
    };

    //
    getGrid() : boolean[][] {
        return this.grid;
    }

    //
    getCell(y: number, x: number) : boolean {
        Grid.validateBounds(this.getGrid(), y, x);
        return this.getGrid()[y]![x]!;
    }

    //EFFECT: flipps the state of the cell
    flipState(y: number, x: number) : void {
        this.getGrid()[y]![x] = !this.getCell(y, x);     
    }

    //EFFECT: allows user to set the state of location {x,y}
    setCell(y: number, x: number, value: boolean) : void {
        Grid.validateBounds(this.getGrid(), y, x);
        this.getGrid()[y]![x] = value;
    }
    //TO DO:
    
    //clone()


    // Private Functions //

    private static validateBounds(grid: boolean[][], y: number, x:number) : void {
        this.validateColumnInBound(grid, y, x);
    }

    //Checks to see if the Row is in bounds
    private static validateRowInBounds(grid: boolean[][], y: number) : void {
        if(y < 0 || y >= grid.length) {
            throw new Error(Grid.OUT_OF_BOUNDS_ROW + `y = ${y}`);
        }
    }

    //Checks to see if the Column is in bounds
    private static validateColumnInBound(grid: boolean[][], y:number, x:number) : void {
        this.validateRowInBounds(grid, y);
        if(x < 0 || x >= grid[y]!.length) {
            throw new Error(Grid.OUT_OF_BOUNDS_COL + `x =${x}, y =${y})`);
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
            throw new Error(Grid.INVALID_HEIGHT + `: ${height}`);
        }

        if(width <= 0 || !Number.isInteger(width)) {
            throw new Error(Grid.INVALID_HEIGHT + `: ${width}`);
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


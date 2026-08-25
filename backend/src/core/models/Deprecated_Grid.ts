/*
NOTES: When writting this class I noticed that Pattern is really a type of gameboard, but I do not want to 
       run this object. Maybe I should turn boardUtils into a class and abstract away the common behaviours
       this way both Patterns and boardUtils can use the same underlined logic. 

       Patterns has a harder requirement, so I have to be careful not to break liskov principle. 
*/


export abstract class Grid {
    grid : boolean[][] = [];
    readonly columns : number;
    readonly rows : number;

    private static readonly OUT_OF_BOUNDS_COL = "Columns out of Bounds";
    private static readonly OUT_OF_BOUNDS_ROW = "Row out of Bounds";
    private static readonly INVALID_COL = "Invalid Column size";
    private static readonly INVALID_ROW = "Invalid Row size";


    constructor(rows: number, columns: number) {
        Grid.validateCoordinates(rows, columns);
        this.grid = Grid.generateGrid(rows, columns);
        this.columns = columns;
        this.rows = rows;
        
    };

    abstract clone(): Grid;

    //TO DO: fix the reliance on "!"
    getCell(y: number, x: number) : boolean {
        Grid.validateBounds(this, y, x);
        return this.getGrid()[y]![x]!;
    }

    //TO DO: fix the reliance on "!"
    flipState(y: number, x: number) : void {
        this.setCell(y, x, !this.getCell(y, x));   
    }

    //TO DO: fix the reliance on "!"
    setCell(y: number, x: number, value: boolean) : void {
        Grid.validateBounds(this, y, x);
        this.getGrid()[y]![x] = value;
    }


    // Protected Functions //
    protected copyStates(clone: Grid) {
        for(let row = 0; row < this.rows; row++) {
            for(let col = 0; col < this.columns; col++) {
                clone.setCell(row, col, this.getCell(row, col))
            };
        };
    };

    // Private Functions //
    private getGrid() : boolean[][] {
        return this.grid;
    };

    private static validateBounds(grid: Grid, y: number, x: number) : void {
        Grid.validateRowInBounds(grid, y);
        Grid.validateColumnInBounds(grid, x);

    };

    private static validateRowInBounds(grid  :Grid, size: number) : void {
        if(size < 0 || size >= grid.rows) {
            throw new Error(Grid.OUT_OF_BOUNDS_ROW);
        };
    };

    private static validateColumnInBounds(grid: Grid, x:number) : void {
        if(x < 0 || x >= grid.columns) {
            throw new Error(Grid.OUT_OF_BOUNDS_COL);
        };
    };

    private static validateCoordinates(height: number, width: number) : void {
        if(height <= 0 || !Number.isInteger(height)) {
            throw new Error(Grid.INVALID_ROW);
        };

        if(width <= 0 || !Number.isInteger(width)) {
            throw new Error(Grid.INVALID_COL);
        };
        
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


import type {Coords} from "../types.js";

export abstract class Grid {
    private grid : Set<number>;
    readonly rows: number;
    readonly columns : number;

    private static readonly INVALID_VALUE = "Value provided must be a positive Integer greater than 1";
    private static readonly INVALID_TOGGLE = "Cannot toggle cell outside grid bounds"


    constructor(rows: number, columns: number) {
        Grid.validateBounds(rows, columns);
        this.validate(rows, columns);
        this.grid = new Set<number>();

        this.rows = rows;
        this.columns = columns;
    };

    abstract clone(): Grid;
    protected abstract validate(rows: number, columns :number): void;
    
    addCell(num: number) : void {
        this.validateCell(num);
        this.grid.add(num);
    };

    isCellAlive(num: number) : boolean {
        this.validateCell(num);
        return this.grid.has(num);
    }

    toggleCell(num: number) : void {
        if(this.isCellAlive(num)) {
            this.deleteCell(num);
        } else {
            this.addCell(num);
        }
    }

    deleteCell(num: number) : void {
        this.validateCell(num);
        this.grid.delete(num);
    };

    getGrid() : ReadonlySet<number> {
        return this.grid;
    }

    has(num: number) : boolean {
        this.validateCell(num);
        return this.grid.has(num);
    }

    updateGridCells(cells : Set<number>) {
        this.grid.clear();
        for(const nextCell of cells) {
            this.addCell(nextCell);
        }
    }



    // Protected Functions //
    protected copyStates(clone: Grid) : void {
        clone.grid = new Set(this.grid);
    };

    protected validateCell(num: number) {
        if (!Number.isInteger(num) || num < 0 || num >= this.getMaxSize()) {
            throw new Error(Grid.INVALID_TOGGLE)
        };
    };


     // Private functions //

    private getMaxSize() : number {
        return this.rows * this.columns;
    };

    private static validateBounds(y: number, x: number) : void {
        Grid.validateValue(y);
        Grid.validateValue(x);
    };

    private static validateValue(value: number) : void {
        if(!Number.isInteger(value) || value <= 1) {
            throw new Error(Grid.INVALID_VALUE);
        };
    };

};


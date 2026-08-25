
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
    

    isCellAlive(num: number) : boolean {
        this.validateCell(num);
        return this.grid.has(num);
    }

    toggleCell(num: number) : void {
        this.validateCell(num);

        if(this.isCellAlive(num)) {
            this.deleteCell(num);
        } else {
            this.addCell(num);
        }
    }

    getGrid() : ReadonlySet<number> {
        return this.grid;
    }



    // Protected Functions //
    protected copyStates(clone: Grid) : void {
        clone.grid = new Set(this.grid);
    };


     // Private functions //
    private deleteCell(num: number) : void {
        this.grid.delete(num);
    };

    private addCell(num: number) : void {
        this.grid.add(num);
    };

    private validateCell(num: number) {
        if (!Number.isInteger(num) || num < 0 || num >= this.getMaxSize()) {
            throw new Error(Grid.INVALID_TOGGLE)
        };
    };

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


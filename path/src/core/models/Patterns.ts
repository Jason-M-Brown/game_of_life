import { Grid } from "./Grid.js";
import type { GridState } from "../interfaces.js"

export class Pattern extends Grid {

    private static readonly INVALID_PATTERN_SIZE = "Pattern dimension must be odd";

    constructor(rows: number, columns: number) {
        super(rows, columns);
    }

    clone(): Pattern {
        const copy = new Pattern(this.rows, this.columns);
        this.copyStates(copy);
        return copy;
    }

    /*
    //Was in parent, but I don't think board needs
    isCellAlive(num: number) : boolean {
        return this.has(num);
    }
    */

    has(num: number) : boolean {
        this.validateCell(num);
        return this.has(num);
    };


    buildState() : GridState {
        return {
            columns: this.columns,
            rows: this.rows,
            maxSize: this.getMaxSize(),
            has: this.has
        };
    };


    protected validate(rows: number, columns: number): void {
        if (rows % 2 === 0 || columns % 2 === 0) {
            throw new Error(Pattern.INVALID_PATTERN_SIZE);
        };
    };
};
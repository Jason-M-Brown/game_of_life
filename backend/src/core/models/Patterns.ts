import { Grid } from "./Grid.js";

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

    protected validate(rows: number, columns: number): void {
        if (rows % 2 === 0 || columns % 2 === 0) {
            throw new Error(Pattern.INVALID_PATTERN_SIZE);
        }
    }
}
import { Grid } from "./grid.js";

export class Board extends Grid {

    private static readonly INVALID_PATTERN_SIZE = "Pattern dimension must be odd";

    constructor(rows: number, columns: number) {
        super(rows, columns);
    }

    clone(): Board {
        const copy = new Board(this.rows, this.columns);
        this.copyStates(copy);
        return copy;
    }

    //Takes current board and generates the next board
    generateNext(): void {

    }

    //EFFECT: allows user to place a pattern at x, y by using a Pattern
    placePattern(): void {

    }


    protected validate(rows: number, columns: number): void {
        return;
    }
}
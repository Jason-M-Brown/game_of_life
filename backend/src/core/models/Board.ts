import { Grid } from "./Grid.js";
import { updateState } from "./GameRules.js"
import type { BoardState } from "../interfaces.js"

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
    generateNextState(): void {
        const newState : Set<number> = updateState(this.buildBoardState());
        this.updateGridCells(newState);
    };

    //EFFECT: allows user to place a pattern at x, y by using a Pattern
    placePattern(): void {

    };

    // Protected 

    protected validate(rows: number, columns: number): void {
        return;
    };

    // Private
    private buildBoardState() : BoardState {
        const state : BoardState = {
            activeCells: this.getGrid(),
            columnSize: this.columns,
            rowSize:  this.rows
        };
        return state;
    };




};
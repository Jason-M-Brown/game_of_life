import { Grid } from "./Grid.js";
import { updateState } from "./GameRules.js";
import { Pattern } from "./Patterns.js";
import type { BoardState } from "../interfaces.js";

//Delete import later
import { resolvePatternPlacement } from "../utils/coordinateUtils.js"

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
        //If I later wish to add the transition effect I can do that here
        const newState : Set<number> = updateState(this.buildState());
        this.updateGridCells(newState);
    };

    //EFFECT: allows user to place a pattern at x, y by using a Pattern
    placePattern(pattern: Pattern, location: number): void {

        this.validateCell(location);

        const resolution = resolvePatternPlacement(pattern.buildState(), location, this.columns, this.rows);
        for(const {index, alive} of resolution) {
            if (alive) this.addCell(index);
            else this.deleteCell(index);
        };
    };
















    // Protected 
    protected validate(rows: number, columns: number): void {
        return;
    };

    // Private
    private buildState() : BoardState {
        const state : BoardState = {
            activeCells: this.getGrid(),
            columnSize: this.columns,
            rowSize:  this.rows
        };
        return state;
    };




};
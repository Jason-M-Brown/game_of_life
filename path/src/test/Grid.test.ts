import fs from "fs/promises";
import { expect } from "chai";
import { Grid } from "../core/models/Grid.js";
import { Board } from "../core/models/Board.js";


describe("Grid v1", function() {
    const emptyGrid : Grid = new Board(0, 0)
    const singleValueGrid : Grid = new Board(1, 1);
    const doubleValueGrid : Grid = new Board(5, 5);
    const emptySet : Set<number> = new Set<number>();
    const singleSet : Set<number> = new Set<number>();
    const doubleSet : Set<number> = new Set<number>();

    beforeEach(async () => {
        singleValueGrid.addCell(0);
        doubleValueGrid.addCell(0);
        doubleValueGrid.addCell(1);




    });

    describe("Test addCell", () => {
        it("Add cell to grid, return true", async () => {
            expect(emptyGrid.getGrid.length).to.equal(0);
            emptyGrid.addCell(0);
            expect(emptyGrid.getGrid.length).to.equal(1);
        })

    })

    describe("Test isCellAlive", () => {

    })

    describe("Test toggleCell", () => {

    })

    describe("Test deleteCell", () => {

    })

    describe("Test getGrid", () => {

    })

    describe("Test has", () => {

    })

    describe("Test updateGridCells", () => {

    })

//End of file
});
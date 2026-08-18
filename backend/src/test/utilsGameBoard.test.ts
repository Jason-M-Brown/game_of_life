import * as boardUtils from "../terminal_demo/Utils/utils_Board.js"
import fs from "fs/promises";
import { expect } from "chai";
//import request from "supertest";
import type {GameBoard} from "../terminal_demo/Interfaces/interface_board.js"


/* */



describe("Utils_Board v1", function() {

    let gameBoard : GameBoard;
    let gameBoardSizeOne : GameBoard
    const ALIVECELL = "2,2"
    const DEADCELL  = `${ALIVECELL} + ${ALIVECELL}`
    

    
    beforeEach(async () => {
        gameBoard = {
            height: 3,
            width: 3, 
            board: new Set<string>()
        }

        gameBoardSizeOne = {
            height: 3,
            width: 3,
            board: new Set<string>()
        }

        const [x_alive, y_alive] = ALIVECELL.split(",").map(Number) as [number, number];
        boardUtils.setAlive(gameBoardSizeOne, x_alive, y_alive);
    });

    afterEach(async () => {});

    /*
    it("text", async () => {

    });


    describe("", () => {
        describe("", () => {

        });
    });
    */

    /* 
    gameState tests
    */
    it("getState: Checks to see if state exists when state does not exist. Return 0", async () => {
        expect(gameBoardSizeOne.board.size).to.equal(1);
        expect(boardUtils.getState(gameBoardSizeOne, 3, 3)).to.equal(0);
    });

    it("getState: Checks to see if state exists when state does exist. Return 1", async () => {
        expect(gameBoardSizeOne.board.size).to.equal(1);
        expect(boardUtils.getState(gameBoardSizeOne, 2, 2)).to.equal(1);
    });

    /*
    setAlive
    */
    it("setAlive: Check that adding one to alive cells work", async () => {
        expect(gameBoard.board.size).to.equal(0);
        boardUtils.setAlive(gameBoard, 1, 1);
        expect(gameBoard.board.size).to.equal(1);
        //Edge case when Not given a num
    });

    /*
    setDead
    */
    it("setDead: Checks we can remove one cell that does exist in the set", async () => {
        expect(gameBoard.board.size).to.equal(0);
        boardUtils.setAlive(gameBoard, 1, 1);
        expect(gameBoard.board.size).to.equal(1);
        boardUtils.setDead(gameBoard, 1, 1);
        expect(gameBoard.board.size).to.equal(0);
    });


    /*
    isSurviving
    */

    describe("isSurviving: ", () => {
        describe("Cell is Alive", () => {
            it("Neighbour Count equals 1, return false", async () => {
                expect(boardUtils.isSurviving(gameBoardSizeOne, ALIVECELL, 1)).to.equal(false);
            });

            it("Neighbour Count equals 2, return true", async () => {
                expect(boardUtils.isSurviving(gameBoardSizeOne, ALIVECELL, 2)).to.equal(true);
            });

            it("Neighbour Count equals 3, return true", async () => {
                expect(boardUtils.isSurviving(gameBoardSizeOne, ALIVECELL, 3)).to.equal(true);
            });

            it("Neighbour Count equals 4, return false", async () => {
                expect(boardUtils.isSurviving(gameBoardSizeOne, ALIVECELL, 4)).to.equal(false);
            });

        });
        describe("Cell is Dead", () => {
            it("Neighbour Count equals 1, return false", async () => {
                expect(boardUtils.isSurviving(gameBoardSizeOne, DEADCELL, 1)).to.equal(false);
            });

            it("Neighbour Count equals 2, return false", async () => {
                expect(boardUtils.isSurviving(gameBoardSizeOne, DEADCELL, 2)).to.equal(false);
            });

            it("Neighbour Count equals 3, return false", async () => {
                expect(boardUtils.isSurviving(gameBoardSizeOne, DEADCELL, 3)).to.equal(false);
            });

            it("Neighbour Count equals 4, return false", async () => {
                expect(boardUtils.isSurviving(gameBoardSizeOne, DEADCELL, 4)).to.equal(false);
            });
        });
    });

    /*
    isReproducing
    */

    describe("isReproducing", () => {

        //Note The only alive Cell in this board set is "2,2"
        describe("when cell is dead:", () => {
            it("has 3 neighbours, return true", async () => {
                expect(boardUtils.isReproducing(gameBoardSizeOne, DEADCELL, 3)).to.equal(true);
            });

            it("has 2 neighbours, return false", async () => {
                expect(boardUtils.isReproducing(gameBoardSizeOne, DEADCELL, 2)).to.equal(false);
            });

            it("has 4 neighbours, returnc false", async () => {
                expect(boardUtils.isReproducing(gameBoardSizeOne, DEADCELL, 4)).to.equal(false);
            });
        });

        describe("when cell is alive:", () => {
            it("has 2 neighbours, return false", async () => {
                expect(boardUtils.isReproducing(gameBoardSizeOne, ALIVECELL, 2)).to.equal(false);
            });
            it("has 3 neighbours, return false", async () => {
                expect(boardUtils.isReproducing(gameBoardSizeOne, ALIVECELL, 3)).to.equal(false);
            });
            it("has 4 neighbours, return false", async () => {
                expect(boardUtils.isReproducing(gameBoardSizeOne, ALIVECELL, 4)).to.equal(false);
            });

        });
    });

    
})
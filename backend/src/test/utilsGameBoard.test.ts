import * as boardUtils from "../terminal_demo/Utils/utils_Board.js"
import fs from "fs/promises";
import { expect } from "chai";
//import request from "supertest";
import type {GameBoard} from "../terminal_demo/Interfaces/interface_board.js"


/* */



describe("Utils_Board v1", function() {

    let gameBoard : GameBoard;
    let gameBoardSizeOne : GameBoard

    
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

        boardUtils.setAlive(gameBoardSizeOne, 2, 2);
    });

    afterEach(async () => {});

    /*
    it("text", async () => {

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

    // Cell is alive
    it("isSurviving: If cell is alive and count equals 1, return false", async () => {
        expect(boardUtils.isSurviving(gameBoardSizeOne, "2,2", 1)).to.equal(false);
    });

    it("isSurviving: If cell is alive and count equals 2, return true", async () => {
        expect(boardUtils.isSurviving(gameBoardSizeOne, "2,2", 2)).to.equal(true);
    });

    it("isSurviving: If cell is alive and count equals 3, return true", async () => {
        expect(boardUtils.isSurviving(gameBoardSizeOne, "2,2", 3)).to.equal(true);
    });

    it("isSurviving: If cell is alive and count equals 4, return false", async () => {
        expect(boardUtils.isSurviving(gameBoardSizeOne, "2,2", 4)).to.equal(false);
    });

    // Cell is dead
    it("isSurviving: If cell is alive and count equals 1, return false", async () => {
        expect(boardUtils.isSurviving(gameBoardSizeOne, "3,2", 1)).to.equal(false);
    });

    it("isSurviving: If cell is alive and count equals 2, return true", async () => {
        expect(boardUtils.isSurviving(gameBoardSizeOne, "3,2", 2)).to.equal(false);
    });

    it("isSurviving: If cell is alive and count equals 3, return true", async () => {
        expect(boardUtils.isSurviving(gameBoardSizeOne, "3,2", 3)).to.equal(false);
    });

    it("isSurviving: If cell is alive and count equals 4, return false", async () => {
        expect(boardUtils.isSurviving(gameBoardSizeOne, "3,2", 4)).to.equal(false);
    });


    /*
    isReproducing
    */
    it("isReproducing: Check if current cell is reproducing: return true (3 neighbours)", async () => {
        expect(boardUtils.isReproducing(gameBoardSizeOne, "3,3", 3)).to.equal(true);
    });

    it("isReproducing: Check if current cell is not reproducing: return false (2 neighbours)", async () => {
        expect(boardUtils.isReproducing(gameBoardSizeOne, "3,3", 2)).to.equal(false);
    });

    it("isReproducing: Check if current cell is not reproducing: return false (4 neighbours)", async () => {
        expect(boardUtils.isReproducing(gameBoardSizeOne, "3,3", 4)).to.equal(false);
    });

    it("isReproducing: Check if current cell is not reproducing: return false (3 neighbours, but cell alive)", async () => {
        expect(boardUtils.isReproducing(gameBoardSizeOne, "2,2", 3)).to.equal(false);
    });

    it("isReproducing: Check if current cell is not reproducing: return false (4 neighbours, but cell alive)", async () => {
        expect(boardUtils.isReproducing(gameBoardSizeOne, "2,2", 4)).to.equal(false);
    });

    it("isReproducing: Check if current cell is not reproducing: return false (2 neighbours, but cell alive)", async () => {
        expect(boardUtils.isReproducing(gameBoardSizeOne, "2,2", 4)).to.equal(false);
    });

    
})
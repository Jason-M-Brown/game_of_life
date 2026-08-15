import * as boardUtils from "../terminal_demo/Utils/utils_Board.js"
import fs from "fs/promises";
import { expect } from "chai";
//import request from "supertest";
import type {GameBoard} from "../terminal_demo/Interfaces/interface_board.js"


/* */



describe("Utils_Board v1", function() {

    let gameBoard : GameBoard;

    
    beforeEach(async () => {
        gameBoard = {
            height: 3,
            width: 3, 
            board: new Set<string>()
        }
    });

    afterEach(async () => {});


    it("setAlive: Add a cell to the board set", async () => {
        const cell = "1,1";
        expect(gameBoard.board.size).to.equal(0);
        boardUtils.setAlive(gameBoard, 1, 1);

    });
    
})
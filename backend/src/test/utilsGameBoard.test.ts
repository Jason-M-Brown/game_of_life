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
    const [x_alive, y_alive] = ALIVECELL.split(",").map(Number) as [number, number];
    const x_dead: number = (x_alive + 3);
    const y_dead: number = (y_alive + 3);
    
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
    lookingAtSelf
    */
    describe("lookingAtSelf: ", () => {
        it("dx =  0 and dy =  0, return true", async () => {
            expect(boardUtils.lookingAtSelf(0, 0)).to.equal(true);
        });

        it("dx = -1 and dy =  0, return false" , async () => {
            expect(boardUtils.lookingAtSelf(-1, 0)).to.equal(false);
        });

        it("dx =  0 and dy = -1, return false", async () => {
            expect(boardUtils.lookingAtSelf(0, -1)).to.equal(false);
        });

        it("dx =  1 and dy =  0, return false", async () => {
            expect(boardUtils.lookingAtSelf(1, 0)).to.equal(false);
        });

        it("dx =  0 and dy =  1, return false", async () => {
            expect(boardUtils.lookingAtSelf(0, 1)).to.equal(false);
        });
    });

    /* 
    neighborAlive 
    */

    describe("neighborAlive: ", () => {
        it("Neighbour is inside board set : return true", async () => {
            expect(boardUtils.neighborAlive(gameBoardSizeOne, x_alive, y_alive)).to.equal(true);

        });

        it("Neighbour is not inside board set : return false", async () => {
            expect(boardUtils.neighborAlive(gameBoardSizeOne, x_dead, y_dead)).to.equal(false);
        });

    });

    /*
    parseKey
    */
    describe("parseKey: ", () => {
        describe("Valid key inputs: ", () => {
            it(`input "0,0"  returns {0, 0}`, async () => {
                expect(boardUtils.parseKey("0,0")).to.deep.equal({x: 0, y: 0});
            });
        });
        
        
        describe("Invalid Input: ", () => {
            describe("Input Size Incorrect", () => {
                it("throws on Malformed cell key error: ", () => {
                    expect(() => boardUtils.parseKey("0,0,")).to.throw("Malformed cell key: 0,0,");
                });

                it("throws on Malformed cell key error: Input too short", () => {
                    expect(() => boardUtils.parseKey("0")).to.throw("Malformed cell key: 0");
                });
            });
            describe("Invalid key input: ", () => {
                it("x is not a number: throw on Malformed cell key `n,1`", () => {
                    expect(() => boardUtils.parseKey("n,1")).to.throw("Malformed cell key: n,1");
                });
                it("y is not a number: throw on Malformed cell key: `1,n`", () => {
                    expect(() => boardUtils.parseKey("n,1")).to.throw("Malformed cell key: n,1");
                });
                it("x and y is not a number: throw on Malformed cell key: `n,n`", () => {
                    expect(() => boardUtils.parseKey("n,n")).to.throw("Malformed cell key: n,n");
                });
            });
        });
    });

    /*
    isSurviving
    */

    describe("isSurviving: ", () => {
        describe("Cell is Alive", () => {
            it("Neighbour Count equals 0, return false", async () => {
                expect(boardUtils.isSurviving(gameBoardSizeOne, ALIVECELL, 0)).to.equal(false);
            });

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
            it("Neighbour Count equals 0, return false", async () => {
                expect(boardUtils.isSurviving(gameBoardSizeOne, DEADCELL, 0)).to.equal(false);
            });

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

            it("Neighbour Count equals 9, return false", async () => {
                expect(boardUtils.isSurviving(gameBoardSizeOne, DEADCELL, 9)).to.equal(false);
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

            it("has 4 neighbours, return false", async () => {
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

    
});
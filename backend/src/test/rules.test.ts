import * as boardUtils from "../core/rules/gameRules.js"
import fs from "fs/promises";
import { expect } from "chai";
//import request from "supertest";
import type {GameBoard} from "../core/interfaces/interface_board.js"


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
    generateNextState
    */
    describe("generateNextState: ", () => {
        let currentBoard: GameBoard;
        describe("Underpopulation - 1x1 board (isolated cell): ", () => {
            
            beforeEach(() => {
                currentBoard = {
                height: 1,
                width: 1,
                board: new Set<string>()
                };
            });

            it("Isolated cell, no alive cells stays dead (underpopulated)", () => {
                const result: Set<string> = boardUtils.generateNextState(currentBoard);
                expect(result.size).to.equal(0);
            });

            it("Isolated cell, set alive but dies (underpopulated)", () => {
                expect(currentBoard.board.size).to.equal(0);
                boardUtils.setAlive(currentBoard, 0, 0)
                expect(currentBoard.board.size).to.equal(1);
                expect(currentBoard.board.has("0,0")).to.be.true;
                const result: Set<string> = boardUtils.generateNextState(currentBoard);
                expect(result.size).to.equal(0);
            });
        });

        let initialCells: [number, number][];
        let expectedCells: [number, number][];
        describe("General Rules - 5x5 Board, away from edge: ", () => {
            
            beforeEach(() => {
                currentBoard = {
                height: 5,
                width: 5,
                board: new Set<string>()
                }; 
            });

            it("5 live cells -> 5 live cells: one blink: ", () => {
                initialCells   = [[1, 1], [1, 2], [2, 1], [2, 2], [3, 3]];
                expectedCells = [[1, 1], [1, 2], [2, 1], [3, 2], [2, 3]];
                
                assertNextGeneration(currentBoard, initialCells, expectedCells);
            });

            it("4 live cells -> block formation no change", () => {
                initialCells   = [[1, 1], [2, 2], [1, 2], [2, 1]];
                expectedCells = [[1, 1], [2, 2], [1, 2], [2, 1]];

                assertNextGeneration(currentBoard, initialCells, expectedCells);
            });

            it("3 live cells -> line formation to horizontal formation - 90 degree rotation", () => {
                initialCells   = [[1, 1], [1, 2], [1, 3]];
                expectedCells = [[0, 2], [1, 2], [2, 2]];

                assertNextGeneration(currentBoard, initialCells, expectedCells);
            })

            it("4 live cells -> 6 live cells", () => {
                initialCells    = [[2, 2], [3, 3], [4, 3], [3, 4]];
                expectedCells  = [[3, 2], [2, 3], [3, 3], [4, 3], [3, 4], [4, 4]];

                assertNextGeneration(currentBoard, initialCells, expectedCells);
            });

            it("5 live cells -> 4 live cells  (frozen state)", () => {
                initialCells    = [[1, 1], [3, 1], [2, 2], [1, 3], [3, 3]];
                expectedCells  = [[1, 2], [2, 1], [2, 3], [3, 2]];
                //const failing: [number, number][] =  [[1, 2], [2, 1], [2, 3], [3, 2], [1,1]];

                assertNextGeneration(currentBoard, initialCells, expectedCells);
                //Applied Result Cells in TestCells location because no changes should occure
                //do to this being a stable state
                assertNextGeneration(currentBoard, expectedCells, expectedCells);
            });
            
            //TO DO: Can always generate more tests
        });
        
        describe("Boundary - 5x5 board, touching edge: ", () => {
            beforeEach(() => {
                currentBoard = {
                height: 5,
                width: 5,
                board: new Set<string>()
                }; 
            });

            it("TOP LEFT: 3 cells alive - Vertical line generates 2 alive cells", () => {
                initialCells   = [[0,0], [0,1], [0,2]];
                expectedCells = [[0,1], [1,1]];

                assertNextGeneration(currentBoard, initialCells, expectedCells);
            });

            it("TOP LEFT: 3 cells alive - 1 cells die, 1 cell born, 1 cell survives", () => {
                initialCells   = [[0,0], [1,1], [0,2]];
                expectedCells = [[0,1], [1, 1]];

                assertNextGeneration(currentBoard, initialCells, expectedCells);
            });

            it("TOP RIGHT: 3 cells alive - 3 cells die, 1 cell born", () => {
                initialCells   = [[3,0], [4,1], [2,2]];
                expectedCells = [[3,1]];
                
                assertNextGeneration(currentBoard, initialCells, expectedCells);
            });

            it("BOTTOM RIGHT: 3 cells alive - 3 cells die, 1 cell born", () => {
                initialCells   = [[4,3], [3,4], [2,2]];
                expectedCells = [[3,3]];

                assertNextGeneration(currentBoard, initialCells, expectedCells);
            });
        });
    });


    //////////////////
    //Helper Functions
    //////////////////


    /* 
    insideGameBoard
    */
    describe("insideGameBoard: ", () => {
        let width: number;
        let height: number;

        beforeEach(() => {
            width = gameBoard.width;
            height = gameBoard.height;
        })

        describe("Checking x Bounds: ", () => {
            it("X = -1, (below lower bound), return false", () => {
                expect(boardUtils.insideGameBoard(gameBoard, -1, 0)).to.be.false;
            });

            it("X = width - 1, (just below upper bound), return true", () => {
                expect(boardUtils.insideGameBoard(gameBoard, (width - 1), 0)).to.be.true;
            });

            it("X = width, (just past upper bound), return false", () => {
                expect(boardUtils.insideGameBoard(gameBoard, (width), 0)).to.be.false;  
            });
        });

        describe("Checking y Bounds: ", () => {
            it("y = -1, (below lower bound), return false", () => {
                expect(boardUtils.insideGameBoard(gameBoard, -1, 0)).to.be.false;
            });

            it("y = height - 1, (just below upper bound), return true", () => {
                expect(boardUtils.insideGameBoard(gameBoard, (height - 1), 0)).to.be.true;
            });

            it("y = height, (just past upper bound), return false", () => {
                expect(boardUtils.insideGameBoard(gameBoard, height, 0)).to.be.false;  
            });

        });

        describe("Checking x and y Bounds: ", () => {
            it("x = -1 , y = -1 (both x and y under lower bounds, return false", () => {
                expect(boardUtils.insideGameBoard(gameBoard, -1, -1)).to.be.false;
            })

            it("x = 0 , y = 0 (both x and y inside bounds, return true", () => {
                expect(boardUtils.insideGameBoard(gameBoard, 0, 0)).to.be.true;
            })

        });
    });

    /*
    parseNeighbourNode
    */
    describe("parseNeighbourNode: ", () => {
        let initialCells: [number, number][]
        let expectedCells: [number, number][];

        describe("Edge Casae 1x1 grid: ", () => {
            it("Checks single cell neighbour count", () => {
                //Setup 1x1 grid and insures its correct
                gameBoard.width = 1;
                gameBoard.height = 1;
                boardUtils.setAlive(gameBoard, 0, 0);
                expect(gameBoard.board.has("0,0"));

                //Start the check
                const result : Set<string> = boardUtils.parseNeighborNodes(gameBoard);
                expect(result.has("0,0")).to.be.true;
                expect(result.size).to.equal(1);
            })
        });

        describe("Corner Cases 3x3 grid:", () => {

            it("Check case top left corner alive", () => {
                initialCells = [[0,0]];
                expectedCells = [[0,0], [0,1], [1,0], [1,1]]
                
                assertNeighborNodesExist(gameBoard, initialCells, expectedCells);

            });
            it("Check case top right corner alive", () => {
                initialCells = [[2,0]];
                expectedCells = [[2,0], [2,1], [1,0], [1,1]]

                assertNeighborNodesExist(gameBoard, initialCells, expectedCells);
            });
            it("Check case bottom right corner alive", () => {
                initialCells = [[2,2]];
                expectedCells = [[2,2], [2,1], [1,2], [1,1]]

                assertNeighborNodesExist(gameBoard, initialCells, expectedCells);
            });
            it("Check case bottom left corner alive", () => {
                initialCells = [[0,2]];
                expectedCells = [[0,2], [0,1], [1,2], [1,1]]

                assertNeighborNodesExist(gameBoard, initialCells, expectedCells);
            });
        });
        
        describe("Center Case 3x3 grid: ", () => {
            it("Center of 3x3 grid is alive, all 9 nodes should be in neightbour set: ", () => {
                initialCells = [[1,1]];
                expectedCells = [
                        [0,0], [1,0], [2,0],
                        [0,1], [1,1], [2,1],
                        [0,2], [1,2], [2,2]
                    ];

                assertNeighborNodesExist(gameBoard, initialCells, expectedCells);       
            });
        });
        

        describe("General Case 5x5 grid: ", () => {
            beforeEach(() => {
                gameBoard.height = 5;
                gameBoard.width = 5;
            })
            it("5 alive generating 12 neighbours:", () => {
                initialCells = [[0,0], [0,1], [1,0], [1,1], [2,1]];
                
                expectedCells = [[0,0], [0,1], [1,0], [1,1], [2,1],
                                 [2,0], [3,0], [3,1], [3,2], [2,2],
                                 [1,2], [0,2]];
                
                assertNeighborNodesExist(gameBoard, initialCells, expectedCells);
            });
        });

        
    });

    /*
    nextGeneration
    */
    describe("nextGeneration: ", () => {
        let initialCells: [number, number][]
        let expectedCells: [number, number][];
        let parsedCells = new Set<string>();

        beforeEach(() => {
        parsedCells = new Set<string>([ "0,0", "0,1", "0,2", "1,0", 
                        "1,1", "1,2", "2,0", "2,1", 
                        "2,2"]);

        });


        it("Empty Parsed Board - return must be empty", () => {
            const result = boardUtils.nextGeneration(gameBoard, new Set<string>());
            expect(result.size).to.equal(0);
        });

        it("Reproduction: Dead cell with 3 neighbours becomes alive", () => {
            initialCells = [[1,1], [2,1], [1,2]]
            setAliveStates(gameBoard, initialCells);
            expectBoardHasExactly(gameBoard, initialCells);
            const result = boardUtils.nextGeneration(gameBoard, parsedCells)
            expect(result.size).to.equal(4);
        });

        it("Reproduction: 3 alive cells adjacent to current cell, but current cell is not in parsed List", () => {
            initialCells = [[1, 0], [1, 2], [0, 1]];
            setAliveStates(gameBoard, initialCells);
            expectBoardHasExactly(gameBoard, initialCells);
            parsedCells.delete("1,1");
            const result = boardUtils.nextGeneration(gameBoard, parsedCells);
            expect(result.size).to.equal(1);
        })

        it("Sanity: Have Parsed Board, but no alive cells, returns empty", () => {
            const result = boardUtils.nextGeneration(gameBoard, parsedCells);
            expect(result.size).to.equal(0);
        });

        it("Isolated Parsed Board key, result returns nothing", () => {
            parsedCells.clear();
            parsedCells.add("2,2");
            const result = boardUtils.nextGeneration(gameBoard, parsedCells);
            expect(result.size).to.equal(0);
        });
    }); 

    /*
    generateKey
    */
   describe("generateKey: ", () => {
        it("input x =  0, y =  0: returns ` 0, 0`", () => {
            expect(boardUtils.generateKey(0, 0)).to.equal("0,0");
        })
        it("input x =  1, y =  1: returns ` 1, 1`", () => {
            expect(boardUtils.generateKey(1, 1)).to.equal("1,1");
        })
        it("input x = -1, y = -1: returns `-1,-1`", () => {
            expect(boardUtils.generateKey(-1, -1)).to.equal("-1,-1");
        })
        it("input x = 1, y = 2: returns ` 1, 2`", () => {
            expect(boardUtils.generateKey(1, 2)).to.equal("1,2");
        })
   });

    /*
    parseKey
    */
    describe("parseKey: ", () => {
        describe("Valid key inputs: ", () => {
            it(`input "0,0"  returns {0, 0}`, async () => {
                expect(boardUtils.parseKey("0,0")).to.deep.equal({x: 0, y: 0});
            });

            it(`input "1,1"  returns {1, 1}`, async () => {
                expect(boardUtils.parseKey("1,1")).to.deep.equal({x: 1, y: 1});
            });

            it(`input "1,1"  returns {-1, -1}`, async () => {
                expect(boardUtils.parseKey("-1,-1")).to.deep.equal({x: -1, y: -1});
            })
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
                    expect(() => boardUtils.parseKey("1,n")).to.throw("Malformed cell key: 1,n");
                });
                it("x and y is not a number: throw on Malformed cell key: `n,n`", () => {
                    expect(() => boardUtils.parseKey("n,n")).to.throw("Malformed cell key: n,n");
                });
            });
        });
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


//Helper For Test cases

//  EFFECT: Add the array of cells to the current gameboard
function setAliveStates(game: GameBoard, cells: [number, number][]): void {
    game.board.clear();
    for (const [x, y] of cells) {
        boardUtils.setAlive(game, x, y);
    }
}

// EFFECT: checks that the given board contains exactly the specified cells
function expectBoardHasExactly(currentBoard: GameBoard, cells: [number, number][]): void {
    expect(currentBoard.board.size).to.equal(cells.length);
    for(const [x, y] of cells) {
        expect(currentBoard.board.has(`${x},${y}`)).to.be.true;
    }
};

/*
    EFFECT: setup the board with initial cells, run one generation,
            and verfy the results matches expected Cells
*/
function assertNextGeneration(currentBoard : GameBoard, initialCells: [number, number][], expectedCells: [number, number][]): void {
    //Set's which cells are alive
    setAliveStates(currentBoard, initialCells);
    //Validate Setup - confirms the pattern was set
    expectBoardHasExactly(currentBoard, initialCells);
    //Generates next board
    currentBoard.board = boardUtils.generateNextState(currentBoard);
    //Validates generated board is correct
    expectBoardHasExactly(currentBoard, expectedCells);
}

//  EFFECT: asserts that all neighbour nodes have been succesfully grabbed
function assertNeighborNodesExist(gameBoard: GameBoard, initialCells: [number, number][], expectedCells: [number,number][]): void {
    setAliveStates(gameBoard, initialCells);
    const result: Set<string> = boardUtils.parseNeighborNodes(gameBoard);
    const expectedKeys = expectedCells.map(([x, y]) => `${x},${y}`);
    expect(result.size).to.equal(expectedKeys.length);
    for (const key of expectedKeys) {
        expect(result.has(key)).to.be.true;
    }
}
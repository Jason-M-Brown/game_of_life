import type {GameBoard} from "../Interfaces/interface_board.js";

/*
    EFFECT: Checks if {x, y} is an alive cell
*/
export function getState(currentState: GameBoard, x: number, y: number): number{
    return currentState.board.has(generateKey(x, y)) ? 1: 0;
}

/*
    EFFECT: Set's the cell at {x, y} to be alive
*/
export function setAlive(currentState: GameBoard, x: number, y: number): void {
    currentState.board.add(generateKey(x, y));
}

/*
    EFFECT: Set's the cell at {x, y} to be dead
*/
export function setDead(currentState: GameBoard, x: number, y:number): void {
    currentState.board.delete(generateKey(x, y));
}

/*
    EFFECT: Generates the next Effect to display to user 
*/
export function generateNextState(currentState: GameBoard) : Set<string> {
    
    const parsedBoard = parseNeighborNodes(currentState);
    return nextGeneration(currentState, parsedBoard);
}



///////////////////////////////
// HELPER FUNCTIONS 
///////////////////////////////

/* 
    EFFECT: Grabs all nodes that are currently alive and neighbouring nodes,
           then returns the set 
*/
export function parseNeighborNodes(game: GameBoard) : Set<string> {
    const parsedNodes = new Set<string>();
    for (const nextCell of game.board) {  //To check if there is a bug
        const {x , y} = parseKey(nextCell);

        for (let dy = -1; dy <= 1; dy++) {
            for(let dx = -1; dx <= 1; dx++) {
                //TODO: Check if I am within the bounds of the game
                if(insideGameBoard(game, x+dx, y+dy)) {
                    parsedNodes.add(generateKey(x+dx, y+dy));
                }
                /*
                    I am currently looking at a node that is not within the board, so skip
                    NOTE!!! If I later wish to add a wrap around feature, this would be the 
                    place to define it.. IE bottom right corner maps to top right
                */
            }
        }
    }
    return parsedNodes;
}

/*
    EFFECT: Check to see if my current node is withing the bounds of the board.
            Return false if I am outside the bounds, true if I am within the bounds
*/
export function insideGameBoard(game: GameBoard, nextX: number, nextY: number) : boolean {
    if(game.width <= nextX || nextX < 0) {
        return false;
    }
    if(game.height <= nextY || nextY < 0) {
        return false;
    }
    return true;
}


/* EFFECT: check all required cells and only return the cells of the alive state. */
export function nextGeneration(game: GameBoard, parsedBoard: Set<string>) : Set<string> {
    const nextGenBoard = new Set<string>;

    for(const nextCell of parsedBoard) {
        const {x, y} = parseKey(nextCell);
        
        let count = 0;
        //Iterate over all this neighbours cells of the nextCell
        for(let dy = -1; dy <= 1; dy++) {
            for(let dx = -1; dx <= 1; dx++) {

                //If I am looking at myself, then skip
                if(lookingAtSelf(dx, dy)) {
                    continue;
                }

                //If I am not inside the gameboard, skip
                if(!insideGameBoard(game, x+dx, y+dy)) {
                    continue
                }
                
                //If neighbor is not alive, then skip
                if(!neighborAlive(game, x+dx, y+dy)) {
                    continue
                }

                count++;
            }
        }

        //Survival: A live cell with two or three live neighbors stays alive.
        if(isSurviving(game, nextCell, count)) {
            nextGenBoard.add(nextCell);
        }

        //Reproduction: A dead cell with exactly three live neighbors becomes alive.
        if(isReproducing(game, nextCell, count)) {
            nextGenBoard.add(nextCell);
        }

    }

    return nextGenBoard;
}

/*
    EFFECT: takes x and y and and converts it into a string "x, y"
*/
export function generateKey(x: number, y:number): string {
    return `${x},${y}`;
}

/* 
    EFFECT: take the string "x,y" and produce {x , y} object 
*/
export function parseKey(n: string) : {x: number, y: number} {
    const parts = n.split(",");
    if(parts.length !== 2) {
        throw new Error(`Malformed cell key: ${n}`);
    }

    const x = Number(parts[0]);
    const y = Number(parts[1]);

    if(Number.isNaN(x) || Number.isNaN(y)) {
        throw new Error(`Malformed cell key: ${n}`);
    };
    return {x, y};
}

/* 
    EFFECT: if dx and dy are 0, then return true
*/
export function lookingAtSelf(dx: number, dy: number): boolean {
    if (dx === 0 && dy === 0) {
        return true
    }
    return false;
}

/*  
    EFFECT: Return true if neighbour is currently alive, else false
 */
export function neighborAlive(game: GameBoard, x:number, y:number) : boolean {
    return game.board.has(generateKey(x, y))
}

/* 
    EFFECT: returns false if the cell does not survive based off survival rules, 
            else returns true
*/
export function isSurviving(game: GameBoard, nextCell: string, count:number) :boolean {
    if(!game.board.has(nextCell)) {
        return false
    }

    if(count !== 2 && count !== 3) {
        return false;
    }

    return true;
}

/*
    EFFECT: return true if the cell is not currently alive and the cell has 3
    neighbours exactly.
*/
export function isReproducing(game: GameBoard, nextCell: string, count:number) :boolean {
    if(!game.board.has(nextCell) && count === 3) {
        return true;
    }
    return false;
}
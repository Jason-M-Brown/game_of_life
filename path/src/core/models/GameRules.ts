
import type { Coords } from "../types.js";
import type { BoardState } from "../interfaces.js"
import { decode, encode, applyDelta } from "../utils/coordinateUtils.js";

// Export Functions 
export function updateState(state: BoardState) : Set<number> {

    const candidateCells : Set<number> = getCandidateCells(state);
    return nextGeneration(state, candidateCells);
};



// Helper Functions //
function getCandidateCells(boardState: BoardState) : Set<number> {

    const candidateCells = new Set<number>();

    for (const nextAliveCell of boardState.activeCells) {
        loopOverNeighbours(boardState, nextAliveCell, candidateCells)
    }; 
    
    return candidateCells;
};

function loopOverNeighbours(boardState: BoardState, nextAliveCell: number, candidateCells: Set<number>) : void {
    const coords = decode(nextAliveCell, boardState.columnSize);
     for(let dy = -1; dy <= 1; dy++) {
        for(let dx = -1; dx <= 1; dx++) {
            const offsetCoords = applyDelta(coords, dy, dx)
            if(isInsideGrid(boardState, offsetCoords)) {
                candidateCells.add(encode(offsetCoords, boardState.columnSize))
            };
        };
     };
};

function isInsideGrid(boardState: BoardState, offsetCoords: Coords) : boolean {
    if(boardState.columnSize <= offsetCoords.x || offsetCoords.x < 0) {
        return false;
    };
    if(boardState.rowSize <= offsetCoords.y || offsetCoords.y < 0) {
        return false;
    };
    return true;
};

function nextGeneration(boardState: BoardState, candidateCells: Set<number>) : Set<number>{
    const nextAliveCells = new Set<number>();

    for(const nextCell of candidateCells) {
        const coords = decode(nextCell, boardState.columnSize);
        const count = countAliveNeighbours(boardState, coords);
        applySurvivalRule(boardState, nextAliveCells, count, nextCell);
        applyReproductionRule(boardState, nextAliveCells, count, nextCell);
    }

    return nextAliveCells;
};

function countAliveNeighbours(boardState: BoardState, coords: Coords) : number {
    let count = 0;
    for(let dy = -1; dy <= 1; dy++) {
        for(let dx = -1; dx <= 1; dx++) {
            const offsetCoords = applyDelta(coords , dy, dx);

            if(lookingAtSelf(dx, dy)) {
                continue;
            };

            if(!isInsideGrid(boardState, offsetCoords)) {
                continue;
            };

            if(!neighborAlive(boardState, offsetCoords)) {
                continue;
            };
            
            count++;
        };
    };
    return count;
};

function lookingAtSelf(dx: number, dy:number) : boolean {
    return dx === 0 && dy === 0;
}


function neighborAlive(boardState: BoardState, offsetCoords: Coords) : boolean {
    const cell = encode(offsetCoords, boardState.columnSize);
    return boardState.activeCells.has(cell);
}

function applyReproductionRule(boardState: BoardState, nextAliveCells: Set<number>, count: number, nextCell: number) : void {
    if(!boardState.activeCells.has(nextCell) && count === 3) {
        nextAliveCells.add(nextCell);
    }
}

function applySurvivalRule(boardState: BoardState, nextAliveCells: Set<number>, count: number, nextCell: number) : void {
    if(boardState.activeCells.has(nextCell) && (count === 2 || count === 3)) {
        nextAliveCells.add(nextCell);
    };
};

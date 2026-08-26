import type { Coords, PlacementCell } from "../types.js";
import type { GridState } from "../interfaces.js"

const INVALID_DIMENSION = "Value provided must be a positive Integer";
const INVALID_INDEX = "Value provided must be a non-negative Integer";


export function decode(num: number, col: number): Coords {
    isValidIndex(num);
    isValidDimension(col);

    const x = () => num % col;
    const y = () => Math.floor(num / col);

    return generateCoords(x, y);
};

export function encode(coord: Coords, col: number): number {
    isValidIndex(coord.x);
    isValidIndex(coord.y);
    isValidDimension(col);

    return coord.y * col + coord.x;
};


export function resolvePatternPlacement(patternState: GridState, location: number, boardCol: number, boardRow: number) : PlacementCell[] {
    const center = getCenterCoordinate(patternState.columns, patternState.rows);
    const boardLocation = decode(location, boardCol);
    const result: PlacementCell[] = [];

    for(let i = 0; i < patternState.maxSize; i++) {
        const offset = decodeFromCenter(i, patternState.columns, center);
        const target = getOffsetToApply(boardLocation, offset);
        if(isOutOfBounds(target.x, boardCol, target.y, boardRow)) {
            continue;
        };

        result.push({index: encode(target, boardCol), alive: patternState.has(i)})
    };
    return result;
};






































/*
    Private Helpers
*/

function isOutOfBounds(x: number, col: number, y: number, row: number) : boolean{
    return x >= col || x < 0 || y >= row || y < 0;
}

function decodeFromCenter(location: number, col: number, center: Coords) : Coords {
    const coord = decode(location, col); 
    return generateOffsetCoords(coord, center);
};

function getCenterCoordinate(column: number, row: number) : Coords {
    
    return generateCoords(
        () => Math.floor(column/2),
        () => Math.floor(row/2)
    );
};

function getOffsetToApply(boardLocation: Coords, nextCoord: Coords) : Coords {
    return generateCoords(
        () => boardLocation.x + nextCoord.x,
        () => boardLocation.y + nextCoord.y
    );
};





function generateOffsetCoords(location: Coords, center: Coords) : Coords {
   return generateCoords(
        () => location.x - center.x,
        () => location.y - center.y
   );
};

function generateCoords(xGenerator: () => number, yGenerator: () => number): Coords {
    return {
        x: xGenerator(),
        y: yGenerator()
    };
}

function isValidIndex(num: number): void {
    if (!Number.isInteger(num) || num < 0) {
        throw new Error(INVALID_INDEX);
    };
};

function isValidDimension(num: number): void {
    if (!Number.isInteger(num) || num <= 0) {
        throw new Error(INVALID_DIMENSION);
    };
};








import type { Coords } from "../types.js";

const INVALID_DIMENSION = "Value provided must be a positive Integer";
const INVALID_INDEX = "Value provided must be a non-negative Integer";

export function decode(num: number, col: number): Coords {
    isValidIndex(num);
    isValidDimension(col);

    return generateCoords(num, col);
};

export function encode(coord: Coords, col: number): number {
    isValidIndex(coord.x);
    isValidIndex(coord.y);
    isValidDimension(col);

    return coord.y * col + coord.x;
};

/*
    Private Helpers
*/

function generateCoords(num: number, col: number): Coords {
    return {
        x: generateX(num, col),
        y: generateY(num, col),
    };
};

function generateX(num: number, col: number): number {
    return num % col;
};

function generateY(num: number, col: number): number {
    return Math.floor(num / col);
};

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









const DEADCELL: string = `▢`;
const ALIVECELL: string = `■`;
const TRANSITION_DEAD_TO_ALIVE: string = `▣`;
const TRANSITION_ALIVE_TO_DEAD: string = `X`;
const WELCOME: string = "Welcome to Conway's Game of life ";
const PRESS_ENTER: string = "Press enter to continue..."
const ASK_TO_SET_ALIVE: string = "Please enter the cell you wish to set alive... Example `(0,0)`:  "

let WHITESPACE = ``;
let LEGEND: string = ``;
let DIVIDER: string = ``;
let SIZE: number = 0;

let DISPLAYBOARDARRAY: string[][] = [];


const STARTUP_MESSAGE = getWhiteSpace() + WELCOME + "\n\n" + PRESS_ENTER;



export function getWhiteSpace() : string {
    if(WHITESPACE !== ``) {
        return WHITESPACE;
    }
    return generateWhiteSpace();
}

export function getStartup() {
    return STARTUP_MESSAGE;
}

export function getSize(dimension: string) {
    return `Please enter the ${dimension} size. (1 to 10)`
};

export function getDeadCell() {
    return DEADCELL;
}

export function getAliveCell() {
    return ALIVECELL;
}

export function getLegend(): string {
    if(LEGEND !== "") {
        return LEGEND;
    };
    //IF legend doesn't already exist, generate it
    return generateLegend();
};

export function generateLocation(x: number, y:number) {
    return `(${x},${y}), `
};

export function getDisplayBoard() {

}
export function getBoardStatus(): string {
    if(DISPLAYBOARDARRAY.length == 0) {
        generateBoardStatus();
    }
    
    /*I MUST ALWAYS GENERATE A NEW DISPlAY TO ENSURE ITS UPDATED*/
    return generateDisplay();

}

export function getDivider(): string {
    if(DIVIDER !== ``) {
        return DIVIDER
    }
    return setDivider();
}

export function setSize(size: number) {
    SIZE = size;
}

export function askUserToSetAlive() {
    return ASK_TO_SET_ALIVE;

}


// HELPERS FUNCTIONS

function setDivider(): string {
    for(let x = 0; x < SIZE *7; x++) {
        DIVIDER += "-";
    }
    return DIVIDER;
}

/*
    EFFECT: Generates a string to display to console
*/
function generateDisplay() : string {
    let result = "";
    for(let y = 0; y < SIZE; y++) {
        let xline = "";
        for(let x = 0; x < SIZE; x++) {
            xline += DISPLAYBOARDARRAY[y]![x] + " ";
        }
        result += xline + "\n";
    }
    return result;
}
/*
    EFFECT: Generates the 2D array filled with Dead cells
*/
function generateBoardStatus(): string[][] {
    for(let y = 0; y < SIZE; y++) {
        let row: string[] = [];
        for(let x = 0; x < SIZE; x++) {
            row.push(getDeadCell());
        }
        DISPLAYBOARDARRAY.push(row);
    }
    return DISPLAYBOARDARRAY;
}

/*
    EFFECT: Generates Legend to display if and only if it doesn't already exist
*/
function generateLegend(): string {
    for(let y = 0; y < SIZE; y++) {
        let xline = "";
        for(let x = 0; x < SIZE; x++) {
            xline += generateLocation(x, y);
        };
        LEGEND += xline;
        LEGEND += "\n";
    };
    return LEGEND;
}

/*
    EFFECT: Generate Whitespace to display if and only if it hasn't been generated yet
*/
function generateWhiteSpace(): string {
    for(let x = 0; x < 20; x++) {
            WHITESPACE += "\n"
        }
    return WHITESPACE;
}
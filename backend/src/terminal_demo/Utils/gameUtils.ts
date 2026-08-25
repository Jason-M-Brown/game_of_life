import * as consoleDisplay from "../display.js";
import {print, waitForKey, waitForBoardSize, getUserCords, askChangeState} from "./consoleUtils.js";
import {parseKey, generateNextState} from "../../core/rules/gameRules.js";
import type {GameBoard} from "../../core/types.js"

let SIZE: number;

export async function gameStart(): Promise<number> {
    print(consoleDisplay.getStartup());
    await waitForKey("");
    clearTerminalScreen();
    let size:number = await waitForBoardSize("Please enter the board size, 1-9: ")
    clearTerminalScreen();
    consoleDisplay.setSize(size);
    SIZE = size;
    return size;
}

export function displayBoard(): void {
    console.log(getLegend());
    console.log(getDivider());
    console.log(getCellDisplay());
}

export async function askUserToSetAlive(): Promise<Set<string>> {
    let aliveStates = new Set<string>();
    do{
        //Ask if the user would like to change the state of a cell
        if(!await askChangeState(consoleDisplay.askChangeState())) {
            break;
        }

        const {x, y} = await grabUserCords(aliveStates);
        clearTerminalScreen();
        updateTerminalWindow(x, y);
        displayBoard();
        

    } while (true);

    return aliveStates;
};


export async function runGenerations(board: GameBoard, limit: number): Promise<void> {
    let x = limit;
    clearTerminalScreen();
    do{
        const updatedBoard: Set<string> = generateNextState(board);
        board.board = updatedBoard;
        await updateTerminalDisplay(board, x);

        x--;
    } while (x > -1);
    print("Thanks for checking out the terminal Demo. :) \n");
    print(`If you want to check the unbounded grid and are fine with the terminal not displaying intended outputs,
then swap the return statement on the following functions in consoleUtils: \n
    getUserCords \n
    waitForBoardSize \n`)
}



/* HELPERS */

async function updateTerminalDisplay(nextBoard: GameBoard, generation: number): Promise<void> {
    consoleDisplay.resetDisplayArray();
    for(const cell of nextBoard.board) {
        const {x, y} = parseKey(cell);
        consoleDisplay.updateDisplayBoard(x, y);
    }
    print(consoleDisplay.getWhiteSpace());
    print(getCellDisplay());
    print(`Generations Left: ${generation}`);
    await new Promise(resolve => setTimeout(resolve, 150));

}

function clearTerminalScreen(): void {
    print(consoleDisplay.getWhiteSpace());
}


function updateAliveState(aliveState: Set<string>, cords: string) :void {
    if(aliveState.has(cords)) {
        aliveState.delete(cords);
        return;
    }
    aliveState.add(cords);
};

async function grabUserCords(aliveStates: Set<string>) : Promise<{x: number, y:number}> {
    const cords: string = await getUserCords(consoleDisplay.askUserToSetAlive(), SIZE);
    updateAliveState(aliveStates, cords);
    return parseKey(cords)
}

function updateTerminalWindow(x: number, y: number): void {
    consoleDisplay.updateDisplayBoard(x, y);
}

function getLegend(): string{
    return consoleDisplay.getLegend();
}


function getCellDisplay() : string {
    return consoleDisplay.getBoardStatus();
}

function getDivider() : string {
    return consoleDisplay.getDivider();
}

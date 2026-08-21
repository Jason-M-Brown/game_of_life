import * as consoleDisplay from "../display.js";
import {print, waitForKey, waitForBoardSize, getUserCords, askChangeState} from "./consoleUtils.js";
import {parseKey, generateNextState} from "./boardUtils.js";
import type {GameBoard} from "../Interfaces/interface_board.js"


let BoardWithCords: string = "";
let SIZE: number = 1;

export async function gameStart(): Promise<number> {
    print(consoleDisplay.getStartup());
    await waitForKey("");
    print(consoleDisplay.getWhiteSpace());
    const size = await waitForBoardSize("Please enter the board size, 1-9: ")
    print(consoleDisplay.getWhiteSpace());
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
        updateTerminalWindow(x, y);
        displayBoard();
        

    } while (true);

    return aliveStates;
};


export async function runGenerations(board: GameBoard, limit: number): Promise<void> {
    do {
        //TO DO:
        print(consoleDisplay.getWhiteSpace());
        generateNextState(board)
        limit--; 
    } while (limit > 0);
}



/* HELPERS */

function updateALiveState(aliveState: Set<string>, cords: string) :void {
    if(aliveState.has(cords)) {
        aliveState.delete(cords);
        return;
    }
    aliveState.add(cords);
};

async function grabUserCords(aliveStates: Set<string>) : Promise<{x: number, y:number}> {
    const cords: string = await getUserCords(consoleDisplay.askUserToSetAlive(), SIZE);
    updateALiveState(aliveStates, cords);
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

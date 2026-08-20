import * as consoleDisplay from "../display.js";
import {print, waitForKey, waitForBoardSize, getUserCords} from "./consoleUtils.js";


let BoardWithCords: string = "";
let SIZE: number = 1;

export async function gameStart(): Promise<number> {
    print(consoleDisplay.getStartup());
    await waitForKey("");
    print(consoleDisplay.getWhiteSpace());
    const size = await waitForBoardSize("Please enter the board size, 1-10 (area of board): ")
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

export async function askUserToSetAlive(): Promise<void> {
    do{
        //Ask If the user would like to change the state of any cell
        //IF YES -> getUserCords();
        //Set BoardSet
        //Update Board Display
        //Ask question again
    } while (true);
    //await getUserCords(consoleDisplay.askUserToSetAlive())
};



/* HELPERS */

function getLegend(): string{
    return consoleDisplay.getLegend();
}


function getCellDisplay() : string {
    return consoleDisplay.getBoardStatus();
}

function getDivider() : string {
    return consoleDisplay.getDivider();
}

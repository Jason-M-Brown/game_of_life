import * as statement from "../printStatements.js";
import {print, waitForKey, waitForBoardSize} from "../Utils/utils_Console.js";

export async function gameStart() {
    print(statement.getStartup());
    await waitForKey("");
    print(statement.getWhiteSpace());
    const size = await waitForBoardSize("Enter a number between 1-10: ")
    print(size);
}
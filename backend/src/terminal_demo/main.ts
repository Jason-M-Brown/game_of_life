import * as gameUtils from "./Utils/gameUtils.js"
import type {GameBoard} from "./Interfaces/interface_board.js"

//import * as gameUtils from "./utils_Game.js";

const size: number = await gameUtils.gameStart();

let board : GameBoard = {
    width: size,
    height: size,
    board: new Set<string>()
}

gameUtils.displayBoard();
board.board = await gameUtils.askUserToSetAlive();
await gameUtils.runGenerations(board, 20);

process.exit(1);


import * as gameUtils from "./Utils/gameUtils.js"
import type {GameBoard} from "./Interfaces/interface_board.js"

//import * as gameUtils from "./utils_Game.js";

const size: number = await gameUtils.gameStart();

let generations :number = 20;
let board : GameBoard = {
    width: size,
    height: size,
    board: new Set<string>()
}

gameUtils.displayBoard();
await gameUtils.askUserToSetAlive();
//set board, then start generating game of life

process.exit(1);
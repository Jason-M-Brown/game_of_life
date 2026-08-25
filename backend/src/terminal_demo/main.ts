import * as gameUtils from "./Utils/gameUtils.js"
import type {GameBoard} from "../core/types.js"

//import * as gameUtils from "./utils_Game.js";

const size: number = await gameUtils.gameStart();
const GENERATION_LIMIT: number = 65;

let board : GameBoard = {
    width: size,
    height: size,
    board: new Set<string>()
}

gameUtils.displayBoard();
board.board = await gameUtils.askUserToSetAlive();
await gameUtils.runGenerations(board, GENERATION_LIMIT);

process.exit(1);


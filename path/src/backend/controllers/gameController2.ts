import type { Request, Response } from "express";

import { Board } from "../../core/models/Board.js";
import { Pattern } from "../../core/models/Patterns.js"

let board = new Board(20, 20);
let tickInterval: NodeJS.Timeout | null = null;

export async function getGame(req: Request, res: Response) : Promise<void> {

}
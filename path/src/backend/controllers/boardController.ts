import type { Request, Response } from "express";

import { Board } from "../../core/models/Board.js";
import { Pattern } from "../../core/models/Patterns.js"

let board = new Board(20, 20);
let tickInterval: NodeJS.Timeout | null = null;

interface nextGenerationRequestBody {
    liveCells: number[],
    width: number,
    height: number
}

export async function nextGeneration(req: Request, res: Response) : Promise<void> {
    const {liveCells, width, height} = req.body as nextGenerationRequestBody;
    const board = new Board(width, height);
    board.updateGridCells(new Set(liveCells));
    board.generateNextState();
    const nextState = board.getGrid();
    res.json({ liveCells: [...nextState] });
}
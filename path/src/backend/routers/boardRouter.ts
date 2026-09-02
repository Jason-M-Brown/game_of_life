import { Router } from "express";
import * as boardController from "../controllers/boardController.js";

const router = Router();

//router.get("/", gameController.getGame);
//router.post("/play", gameController.startGame);
router.post("/next", boardController.nextGeneration);
//router.post("/pause", gameController.pauseGame);
//router.post("/cell", gameController.updateCell);
//router.post("/reset", gameController.resetGame);

export default router;
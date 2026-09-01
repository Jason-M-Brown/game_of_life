import { Router } from "express";
import * as gameController from "../controllers/gameController.js";

const router = Router();

router.get("/", gameController.getGame);
router.post("/start", gameController.startGame);
router.post("/next", gameController.nextGeneration);
router.post("/pause", gameController.pauseGame);
router.post("/cell", gameController.updateCell);
router.post("/reset", gameController.resetGame);

export default router;
import { Router } from "express";
import * as patternController from "../controllers/patternController.js";

const router = Router();

router.get("/", patternController.getAllPatterns);
router.post("/:id", patternController.getPattern);
router.post("/:id", patternController.savePattern);
router.delete("/:id", patternController.deletePattern);


export default router;


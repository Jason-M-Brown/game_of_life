import express from "express";
import cors from "cors";
import * as boardUtils from "../core/utils/boardUtils.js"
import gameRouter from "./routers/gameRouter.js";
import patternRouter from "./routers/patternRouter.js"


const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

app.use("/game", gameRouter);
app.use("/game/patterns", patternRouter);

app.get("/health", (req, res) => {
  res.json({status: "ok"});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/health`);
});

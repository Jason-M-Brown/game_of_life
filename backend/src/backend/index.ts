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



//Gets the current state of the game
app.get("/game", () => {

});

//Starts generating the next states
app.post("/game/start", () => {

});

//Advance state by one generation
app.post("/game/next", () => {

});

//Pause generations
app.post("/game/pause", () => {

});

//Place current pattern at this specific cell
app.post("/game/cell", () => {

});

//Reset the current game
app.post("/game/reset", () => {

});

///

//Get a list of available patterns
app.get("/game/patterns", () => {

});

//Get a specific pattern
app.get("/game/patterns/:id", () => {

});

//Save a new custom pattern
app.post("/game/patterns/:id", () => {

});

//Delete a saved custom pattern
app.delete("/game/patterns/:id", () => {

});

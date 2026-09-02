import express from "express";
import cors from "cors";
import gameRouter from "./routers/boardRouter.js";
//import patternRouter from "./routers/patternRouter.js"


const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

app.use("/api/board", gameRouter);
//app.use("/api/patterns", patternRouter);

app.get("/health", (req, res) => {
  res.json({status: "ok"});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/health`);
});

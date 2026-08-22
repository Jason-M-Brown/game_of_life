import express from "express";
import cors from "cors";
import * as boardUtils from "../core/utils/boardUtils.js"

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/health", (req, res) => {
  res.json({status: "ok"});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
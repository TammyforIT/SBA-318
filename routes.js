import express from "express";
import db from "./db.js";

const router = express.Router();

// GET all draws (with optional filtering)
router.get("/", (req, res) => {
  let result = db;

  if (req.query.game) {
    result = result.filter(
      d => d.game.toLowerCase() === req.query.game.toLowerCase()
    );
  }

  res.json(result);
});

// GET one draw
router.get("/:id", (req, res) => {
  const draw = db.find(d => d.id == req.params.id);
  if (!draw) return res.status(404).json({ error: "Not found" });
  res.json(draw);
});

export default router;

import express from "express";
import db from "./db.js";

const router = express.Router();

// GET all draws
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
  const draw = db.find(d => d.id === req.params.id);
  if (!draw) return res.status(404).json({ error: "Not found" });
  res.json(draw);
});

// CREATE draw
router.post("/", (req, res) => {
  const newDraw = {
    id: String(Date.now()),
    ...req.body
  };
  db.push(newDraw);
  res.status(201).json(newDraw);
});

// UPDATE draw
router.put("/:id", (req, res) => {
  const index = db.findIndex(d => d.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  db[index] = { ...db[index], ...req.body };
  res.json(db[index]);
});

// DELETE draw
router.delete("/:id", (req, res) => {
  const index = db.findIndex(d => d.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  const deleted = db.splice(index, 1);
  res.json(deleted[0]);
});

export default router;

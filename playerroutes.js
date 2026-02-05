import express from "express";
import players from "./playersDB.js";

const router = express.Router();

// GET all players
router.get("/", (req, res) => {
  res.json(players);
});

// GET one player
router.get("/:id", (req, res) => {
  const p = players.find(pl => pl.id === req.params.id);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
});

// CREATE player
router.post("/", (req, res) => {
  const newPlayer = {
    id: String(Date.now()),
    ...req.body
  };
  players.push(newPlayer);
  res.status(201).json(newPlayer);
});

// UPDATE player
router.put("/:id", (req, res) => {
  const index = players.findIndex(pl => pl.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  players[index] = { ...players[index], ...req.body };
  res.json(players[index]);
});

// DELETE player
router.delete("/:id", (req, res) => {
  const index = players.findIndex(pl => pl.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  const deleted = players.splice(index, 1);
  res.json(deleted[0]);
});

export default router;

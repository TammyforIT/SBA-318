import express from "express";
import tickets from "./ticketsDB.js";

const router = express.Router();

// GET all tickets
router.get("/", (req, res) => {
  res.json(tickets);
});

// GET one ticket
router.get("/:id", (req, res) => {
  const t = tickets.find(ti => ti.id === req.params.id);
  if (!t) return res.status(404).json({ error: "Not found" });
  res.json(t);
});

// CREATE ticket
router.post("/", (req, res) => {
  const newTicket = {
    id: String(Date.now()),
    ...req.body
  };
  tickets.push(newTicket);
  res.status(201).json(newTicket);
});

// UPDATE ticket
router.put("/:id", (req, res) => {
  const index = tickets.findIndex(ti => ti.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  tickets[index] = { ...tickets[index], ...req.body };
  res.json(tickets[index]);
});

// DELETE ticket
router.delete("/:id", (req, res) => {
  const index = tickets.findIndex(ti => ti.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  const deleted = tickets.splice(index, 1);
  res.json(deleted[0]);
});

export default router;

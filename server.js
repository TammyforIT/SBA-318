import express from "express";
import fs from "fs";
import { logReq, globalErr } from "./middlewares.js";

import drawRoutes from "./routes.js";
import playerRoutes from "./playersRoutes.js";
import ticketRoutes from "./ticketsRoutes.js";

import db from "./db.js";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logReq);

// Custom HTML engine
app.engine("html", function (filePath, options, cb) {
  fs.readFile(filePath, (err, content) => {
    if (err) return cb(err);

    let list = "";
    for (let draw of db) {
      list += `<li>${draw.game} — ${draw.date} — ${draw.numbers}</li>`;
    }

    let rendered = content.toString().replace("#list#", list);
    return cb(null, rendered);
  });
});

app.set("views", "./");
app.set("view engine", "html");

// ROUTES
app.use("/draws", drawRoutes);
app.use("/players", playerRoutes);
app.use("/tickets", ticketRoutes);

// GLOBAL ERROR HANDLER
app.use(globalErr);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

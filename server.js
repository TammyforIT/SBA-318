// Imports
import express from "express";
import fs from "fs";
import { logReq, globalErr } from "./middlewares.js";
import routes from "./routes.js";
import db from "./db.js";

// Setup
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logReq);

// Custom View Engine
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

app.set("views", "./");        // your HTML is in the root
app.set("view engine", "html");

// Static files (css.css)
app.use(express.static("./"));

// Routes
app.get("/home", (req, res) => {
  res.render("the");           // because your file is the.html
});

app.use("/api/lottery", routes);

// Error Handler
app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});


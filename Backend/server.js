const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../Frontend")));

const filePath = path.join(__dirname, "tasks.txt");

app.post("/add-task", (req, res) => {
  const task = req.body;
  const line = `Task: ${task.name}\nDescription: ${task.description}\nDeadline: ${task.deadline}\n\n`;

  fs.appendFile(filePath, line, (err) => {
    if (err) {
      console.error("Failed to save task:", err);
      return res.status(500).send("Server Error");
    }
    res.status(200).send("Task Saved");
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

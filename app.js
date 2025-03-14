import express from "express";
import movies from "./movies.js";

const app = express();
app.use(express.json());

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= movies.length) {
    return res.status(404).json({ message: "Movies not found" });
  }
  return res.status(200).json(movies[id]);
});

app.post("/movies", (req, res) => {
  const { title, director, date, oscar } = req.body;
  if (!title || !director || !date || !oscar) {
    return res.status(400).json({ message: "Missing data" });
  }
  const newMovie = { title, director, date, oscar };
  movies.push(newMovie);
  res.status(200).json(newMovie);
});

app.put("/movies/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= movies.length) {
    return res.status(404).json({ message: "Movies not found" });
  }
  const { title, director, date, oscar } = req.body;
  if (!title || !director || !date || !oscar) {
    return res.status(400).json({ message: "Missing data" });
  }
  movies[id] = { title, director, date, oscar };
  res.status(200).json(movies[id]);
});

app.delete("/movies/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= movies.length) {
    return res.status(404).json({ message: "Movies not found" });
  }
  movies.splice(id, 1);
  return res.status(200).json({ message: "Delete successful" });
});

app.listen(3003, () => {
  console.log("Server runs");
});

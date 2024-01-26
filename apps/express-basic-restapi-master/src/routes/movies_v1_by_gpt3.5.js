import { express } from "../../../start";
const Router=express.Router;
import movies from "../sample.json" assert { type: "json" };

const router = new Router();

router.get("/", (req, res) => {
  res.json(movies);
});
router.get("/:id", (req, res) => {
    const { id } = req.params;
  
    const movie = movies.find(movie => movie.id === id);
  
    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }
  
    res.json(movie);
  });
router.post("/", (req, res) => {
  const id = movies.length + 1;
  const { title, director, year, rating } = req.body;

  if (id && title && director && year && rating) {
    const newMovie = { ...req.body, id };
    movies.push(newMovie);
    res.json(movies);
  } else {
    res.status(400).json({ error: "Missing required fields." });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, director, year, rating } = req.body;
  if (title && director && year && rating) {
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if (movieIndex !== -1) {
      movies[movieIndex] = { ...movies[movieIndex], title, director, year, rating };
      res.json(movies);
    } else {
      res.status(404).json({ error: "Movie not found." });
    }
  } else {
    res.status(400).json({ error: "Missing required fields." });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id == id);
  if (movieIndex !== -1) {
    movies.splice(movieIndex, 1);
    res.json(movies);
  } else {
    res.status(404).json({ error: "Movie not found." });
  }
});

export default router
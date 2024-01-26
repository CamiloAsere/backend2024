import { express } from "../../start/app.js";

import movies from "./sample.json" assert { type: "json" };
const Router=express.Router;
const moviesRouter = new Router();

moviesRouter.get("/", (req, res) => {
  res.json(movies);
});

moviesRouter.post("/", (req, res) => {
  const { title, director, year, rating } = req.body;
  
  if (!title || !director || !year || !rating) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  
  const id = movies.length + 1;
  const newMovie = { ...req.body, id };
  movies.push(newMovie);

  res.status(201).json(newMovie);
});
moviesRouter.get("/:id", (req, res) => {
    const { id } = req.params;
  
    const movie = movies.find(movie => movie.id === id);
  
    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }
  
    res.json(movie);
  });
moviesRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, director, year, rating } = req.body;

  if (!title && !director && !year && !rating) {
    return res.status(400).json({ error: "At least one field must be updated." });
  }
  
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex < 0) {
    return res.status(404).json({ error: "Movie not found." });
  }

  const updatedMovie = { ...movies[movieIndex], title, director, year, rating };
  movies[movieIndex] = updatedMovie;

  res.json(updatedMovie);
});

moviesRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex < 0) {
    return res.status(404).json({ error: "Movie not found." });
  }

  movies.splice(movieIndex, 1);

  res.sendStatus(204);
});

export default moviesRouter;

/*
He eliminado la importación de la librería underscore, ya que no se utiliza en el código.
En el método post, he simplificado la validación de campos requeridos y he devuelto 
solo la película creada en lugar de todas las películas.
En el método put, he cambiado la iteración con _.each por findIndex para buscar
 la película a actualizar. También he agregado validaciones adicionales para detectar 
 si ningún campo fue actualizado o si la película no existe.
En el método delete, he cambiado _.each por findIndex para buscar la película a eliminar
 y he devuelto un estado 204 en lugar de todas las películas.


*/
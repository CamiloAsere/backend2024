/*
import express from "express";
import Fetch from "./apps/fetch.js";

const data=Fetch(2)
const {luke,starship,planet,film}=data
console.log("luke",luke)

const app = express();
const PORT = 4000; 
/*
export const luke =await api.people(1)
export const myplanet=await api.planets(1)
export const starship=await api.starships(1)
export const film=await api.films(2)
*//*
app.get("/", (req, res, next) => {
  res.status(200).send(`<h1>Hello world! Im ${luke.name}</h1>
  <p>from ${planet.name} and Iam leading on the spaceship ${!starship.name ? starship.detail:starship.name}.Also ${film.title} is a great film </p>`);
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo por: http://localhost:${PORT}/`);
});



*/

import express from "express";
import Fetch from "./apps/fetch.js";
const app = express();
const PORT = 4000; 

app.get("/", async (req, res, next) => {
  try {
    const { luke, planet, starship, film } = await Fetch(1);
    //const { luke, planet, starship, film } = data[0];
    res.status(200).send(`<h1>Hello world! Im ${luke}</h1>
  <p>from ${planet} and Iam leading on the spaceship ${!starship.name ? starship.detail:starship.name}.Also ${film} is a great film </p>`);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error("Something went wrong on fetching data from the API - Here goes the error: ", error);
  res.status(500).send("Sorry, something went wrong.");
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo por: http://localhost:${PORT}/`);
});


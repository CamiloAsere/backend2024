
import { port } from "../../main.js";
import { Author } from "../../mongoose/models/Author.js";
import { DataPlan } from "../../mongoose/models/DataPlan.js";
import { Question } from "../../mongoose/models/Panel.js";
import { User } from "../../mongoose/models/User.js";
/*
import { completion } from "../openai/openai_config.js";
const completionResult = await completion("haz una macro en excel");
const sent = completionResult.data.choices[0].message.content; */
// Definir una familia de estrategias para manejar las solicitudes a la ruta '/routeA'
export const handleRequest = (strategies, currentStrategy) => (req, res) => {
  strategies[currentStrategy.value](req, res);
};
export const handleChangeStrategy = (strategies, currentStrategy) => (req, res) => {
  const { strategy } = req.params;
  if (strategies[strategy] && strategy !== currentStrategy.value) {
    currentStrategy.value = strategy;
    res.send(`Estrategia cambiada a ${strategy}`);
  } else if (strategy === currentStrategy.value) {
    res.send(`Estrategia ya es ${strategy}`);
  } else {
    res.status(400).send('Estrategia no válida');
  }
}; 
// Estrategia para manejar solicitudes a /routeA con la estrategia A1
export const StrategyA1 = (req, res) => {
  try {
    res.status(200).send(`
      <div><h1>This is a testing route </h1>
      <pre>+\n++ \n+++ \n++++ \n+++++ \n++++++ \n+++++++ \n++++++++ </pre>
      <pre>1: <a href=http://localhost:${port}/routeA >http://localhost:${port}/routeA </a></pre> \n
      <pre>2: <a href=http://localhost:${port}/routeB>http://localhost:${port}/routeB </a></pre> \n
      <pre>3: <a href=http://localhost:${port}/change-strategy-x/:strategy >http://localhost:${port}/change-strategy-x/:strategy</a></pre> \n
      <pre>4: <a href=http://localhost:${port}/api/movies >http://localhost:${port}/api/movies</a></pre> \n
      <pre>5: <a href=http://localhost:${port}/api/users >http://localhost:${port}/api/users</a></pre>
      </div>`);
  } catch (error) {
    res.status(500).json({ error: 'Error al manejar la solicitud con la estrategia A1' });
  }
};

// Estrategia para manejar solicitudes a /routeA con la estrategia A2
export const StrategyA2 = (req, res) => {
  res.send('Manejando la solicitud a /routeA con la estrategia A2');
  console.log("La estrategia es:A2")
};

// Estrategia para manejar solicitudes a /routeB con la estrategia B1
export const StrategyB1 = (req, res) => {
  try {
    res.status(200).json({OPEN_AI:!sent?"nohubonada":sent} );

  } catch (error) {
    res.status(500).json({ error: 'Error al manejar la solicitud con la estrategia B1' });
  }
};

// Estrategia para manejar solicitudes a /routeB con la estrategia B2
export const StrategyB2 = (req, res) => {
  res.send('Manejando la solicitud a /routeB con la estrategia B2');

  async function deleteAllAuthors() {
    try {
      await Author.deleteMany({});
      await Question.deleteMany({});
      await User.deleteMany({});
      await DataPlan.deleteMany({});
      console.log('Todos los documentos de la colección Author,Question,User y DataPlan han sido eliminados');
    } catch (err) {
      console.log(err);
    }
  }
  
  deleteAllAuthors();
};
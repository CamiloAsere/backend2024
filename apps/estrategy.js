import express from 'express';
import { hClimb } from './bing/index.js';

const app = express();
const port = 8080;
const esB=(req, res)=>{
   //res.send("hello")
   res.status(200).json({
    success: true,
    data: "placeholder",
    message: "no-image",
  });
 console.log("1 2 3 probando")
}
// Definir diferentes estrategias para manejar una solicitud
export const strategies = {
  strategyA: hClimb,
  strategyB: esB
  
};

// Definir una función para seleccionar la estrategia adecuada en tiempo de ejecución
export const selectStrategy = req => {
  // Implemente aquí la lógica para seleccionar la estrategia adecuada
  // En este ejemplo, siempre se selecciona la estrategia A
  return 'strategyA';
};

app.get('/', (req, res) => {
  // Seleccionar la estrategia adecuada en tiempo de ejecución
  const strategy = selectStrategy(req);

  // Utilizar la estrategia seleccionada para manejar la solicitud
  strategies[strategy](req, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
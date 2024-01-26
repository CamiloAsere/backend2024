const strategiesC = {
    strategyC1: (req, res) => {
      try {
        res.status(200).json(sent)
       /* 
       res.status(200).send(`
       <h1>OpenAI text response </h1> 
      <p> ${sent===0? `<pre>loading data...</pre>` : sent}</p>`)
     */
      console.log("OpenAI route")
    } catch (error) {
       res.send({error:"zzz error"})
      console.log("route with error",error)
      }
    },
    strategyC2: (req, res) => {
      res.send('Manejando la solicitud a /routeB con la estrategia B2');
    },
  };
  
  // Definir una variable para almacenar la estrategia actual para la ruta '/routeB'
  let currentStrategyB = 'strategyC1';
  
  // Definir una ruta '/routeB' que utiliza la estrategia actual para manejar las solicitudes
  app.get('/routeC', (req, res) => {
    strategiesC[currentStrategyB](req, res);
  });
  
  // Definir una ruta para cambiar la estrategia actual para la ruta '/routeB'
  app.get('/change-strategy-c/:strategy', (req, res) => {
    const { strategy } = req.params;
    if (strategiesC[strategy]) {
      currentStrategyB = strategy;
      res.send(`Estrategia para /routeB cambiada a ${strategy}`);
    } else {
      res.status(400).send('Estrategia no válida');
    }
  });
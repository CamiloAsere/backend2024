// routes.js
import strategiesRouter from '../routes/st/strategyRoutes.js';
import moviesRouter from '../routes/movies/movies_v2_by_gpt3.5.js';
import usersRouter from '../routes/movies/users.js';
//import openaiRouter from '../routes/openai/openai_router.js';
import panelRouter from '../routes/panel/index.js';
import userPlanDataRouter from '../mongoose/router/userPlanDataRouter.js';
export const configureRoutes = (app) => {
  // Configure routes
  //app.use(openaiRouter)
  app.use(strategiesRouter);
  app.use('/api/movies', moviesRouter);
  app.use('/api/users', usersRouter);
  app.use(panelRouter)
  app.use(userPlanDataRouter)
  // Add a catch-all route to handle invalid routes
  app.get('/*', (req, res) => {
    res.status(404).send(`
    <link rel="stylesheet" href="/css/error404.css">
    <div class="container">
      <h1>404 Error</h1>
      <p>Sorry, this route does not exist.</p>
      <a href="/routeA">Volver a la pagina de inicio</a>
    </div>
  `);
  })
};
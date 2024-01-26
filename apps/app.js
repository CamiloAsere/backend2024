import express from 'express';
import router from '../mongoose/router/router.js';
import errorMiddleware from '../mongoose/controllers/errorMiddleware.js';
const port =4000
const app = express();

app.use(router);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
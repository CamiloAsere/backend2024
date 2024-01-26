// index.js
import productsRouter from './productsRouter.js';
import testRouter from './testRouter.js';
import usersPlanRouter from './usersPlanRouter.js';
// Importa los demás routers aquí

export {
    productsRouter,
    usersPlanRouter,
    testRouter,
    // Exporta los demás routers aquí
};

/*
// server.js
import express from 'express';
import { productsRouter, adminRouter, reservationsRouter } from './routers/index.js';

const app = express();

app.use('/products', productsRouter);
app.use('/admin', adminRouter);
app.use('/reservations', reservationsRouter);
// Usa los demás routers aquí

// Inicia el servidor
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
*/
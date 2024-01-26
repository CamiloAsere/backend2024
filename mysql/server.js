// server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';
import seedDB from './db/addData.js'; 
import seedDatabase from './db/seeds.js'; // Importar la función seedDatabase
import db from './db/db.js';
import User from './db/models/User.js';
import Product from './db/models/Product.js';
import Reservation from './db/models/Reservation.js';
import DataPlan from './db/models/DataPlan.js';
import { productsRouter, testRouter, usersPlanRouter } from './routes/index.js';
import cookieParser from 'cookie-parser';
const app = express();
// Definir las relaciones
User.hasMany(Reservation);
Product.hasMany(Reservation);
Reservation.belongsTo(User);
Reservation.belongsTo(Product);

User.hasOne(DataPlan);
DataPlan.belongsTo(User);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config()
const port =process.env.APP_PORT 

// Habilitar el manejo de cookies
app.use(cookieParser());


// Configurar CORS
app.use(cors());

// Configurar archivos públicos
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // para poder parsear el cuerpo de las solicitudes POST
app.use(express.json());

//Rutas de testeo
app.use(testRouter);

// Usar las rutas de los productos y reservaciones
app.use(productsRouter);

//Rutas de mi la app de gesionar cuentas de internet y usuarios
app.use(usersPlanRouter);
app.use("/holamundo",(req, res, next) => {
  res.send('123 probando');
});
// Middleware para manejar los errores 404
app.use((req, res, next) => {
    res.status(404).send(`
    <link rel="stylesheet" href="/css/error404.css">
    <div class="container">
      <h1>404 Error</h1>
      <p>Sorry, this route does not exist.</p>
      <a href="/index">Volver a la pagina de inicio</a>
    </div>
  `);
  })
// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Ocurrió un error en el servidor.' });
});

app.listen(port, async () => {
  console.log('El servidor está corriendo en el puerto' ,port);
  try {
    await db.sequelize.authenticate();
    // Sincronizar todos los modelos con la base de datos
    await db.sequelize.sync();
    // Llamar a la función seedDatabase después de sincronizar los modelos
    await seedDatabase();
    await seedDB();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
  
});

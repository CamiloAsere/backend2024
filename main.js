// index.js
import { StartApp, app, config } from './start/app.js';
import { configureMiddleware } from './start/middleware.js';
import { configureRoutes } from './start/routes.js';
import { DB } from './mongoose/db/index.js';
import { DatabaseSeeder } from './mongoose/data input/seeddataBase.js';
const init = new StartApp();
const db = new DB();
const seeder = new DatabaseSeeder();
export const port = process.env.OPENAI_PORT || 4000;
config()
// Conectar a la base de datos
await db.connect()
//await seeder.seedDatabase();
/////
// Configure middleware
configureMiddleware(app);

// Configure routes
configureRoutes(app);

// Start the application
init.start(port);
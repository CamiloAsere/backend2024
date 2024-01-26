// db.js
import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sequelize = new Sequelize('test1', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  // Deshabilitar el logging de consultas SQL en la consola
  logging: false
});

// Creamos un objeto vacío para almacenar los modelos
const db = {};

async function loadModels() {
    // Leemos los archivos del directorio models
    const files = fs.readdirSync(path.join(__dirname, '/models'))
      .filter(file => file.endsWith('.js')); // Filtramos solo los archivos con extensión .js
  
    for (let file of files) {
        console.log(`Importing model from file: ${file}`);
      // Importamos el modelo y lo guardamos en el objeto db
      const model = await import(`file://${path.join(__dirname, '/models/', file)}`);
     //console.log(model); // Añade esta línea para depurar
      if (model.default) {
        db[model.default.name] = model.default;
      } else {
        console.log(`No default export in file: ${file}`);
      }
      
    }
  
    // Asociamos los modelos entre sí si tienen alguna relación
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
  }

loadModels();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

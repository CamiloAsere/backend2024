//const uri = 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority';
import mongoose from 'mongoose';
/*
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

*/
// Definir la URL y nombre de la base de datos a la que nos vamos a conectar
const DB_URL = 'mongodb+srv://<usuario>:<contraseña>@<url>/test?retryWrites=true&w=majority';
const DB_NAME = 'test';

// Utilizar mongoose para conectarse a la base de datos
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('Conectado a la base de datos');
}).catch((error) => {
  console.error(error);
});


// Definir el esquema utilizando mongoose
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  edad: Number,
});

// Crear un modelo utilizando el esquema previamente creado
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Insertar un documento o registro en la base de datos
const nuevoUsuario = new Usuario({
  nombre: 'Juan',
  email: 'juan@mail.com',
  edad: 30,
});

nuevoUsuario.save().then(() => {
  console.log('Usuario creado');
}).catch((error) => {
  console.error(error);
});

/*
import mongoose from 'mongoose';
Conecte Mongoose a su base de datos de MongoDB utilizando la cadena de conexión proporcionada por Railway:
const connectionString = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
*/
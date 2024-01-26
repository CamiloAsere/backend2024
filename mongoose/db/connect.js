import mongoose from 'mongoose';
import { config } from 'dotenv';
import printInColor from '../../routes/st/color.js';
config()
const uri =process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mydb';
//console.log("MONGODB_URI: ",uri)
export class DB {
  constructor() {
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10; // Aumenta a 10 intentos de reconexión
    this.reconnectTimeout = 1000;
    this.connect();
  }

  async connect() {
    try {
      await mongoose.connect(uri); // Añade opciones para evitar advertencias de depreciación
      this.reconnectAttempts = 0
    } catch (err) {
      console.error('Error al conectarse a la base de datos: ', err);
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.connect();
          this.reconnectAttempts++;
          this.reconnectTimeout *= 2;
        }, this.reconnectTimeout);
      } else {
        console.error('La reconexión a la base de datos falló después de los intentos máximos');
      }
    }
    mongoose.connection.on('connected', () => {
      console.log(printInColor('Conexion a la base de datos ','green')+ printInColor('exitosa!','yellow'));
    });
    mongoose.connection.on('disconnected', () => {
      console.log('Base de datos '+ printInColor('desconectada','red'));
    });

    mongoose.connection.on('error', (err) => {
      console.error('Error en la base de datos:', err);
    });

    mongoose.connection.on('reconnectFailed', () => {
      console.error('La reconexión a la base de datos falló');
    });
  }
}

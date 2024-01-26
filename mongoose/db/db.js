import { config } from 'dotenv';
import mongoose from 'mongoose';
config();
const uri = process.env.MONGODB_URI|| 'mongodb://127.0.0.1:27017/mydb';

export class DB {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      await mongoose.connect(uri);
      console.log('Conexion a la base de datos exitosa!');
    } catch (err) {
      console.error('WTF! Error al conectarse a la base de datos: ', err);
    }

    mongoose.connection.on('disconnected', () => {
      console.log('Database disconnected');
      this._connect();
    });

    mongoose.connection.on('error', (err) => {
      console.error('Database error:', err);
    });

    mongoose.connection.on('reconnectFailed', () => {
      console.error('Database reconnection failed');
    });
  }
}
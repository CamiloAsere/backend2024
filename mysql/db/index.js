//index.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('test1', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  // Deshabilitar el logging de consultas SQL en la consola
  logging: false
});

export default sequelize;

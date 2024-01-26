// models/DataPlan.js
import { DataTypes } from 'sequelize';
import { defineModel } from '../../controllers/defineModels.js';
const DataPlan = defineModel('DataPlan', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  quota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isInt: true,
      min: 1,
    },
  },
  dataUsed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isInt: true,
      min: 0,
      // Añade esta validación personalizada
      lessThanOrEqualToQuota(value) {
        if (this.quota < value) {
          throw new Error('La cuota usada no puede exceder la cuota total');
        }
      },
    },
  },
});

export default DataPlan; 

/*
// Definimos la relación entre User y DataPlan
User.hasMany(DataPlan);
DataPlan.belongsTo(User);
*/


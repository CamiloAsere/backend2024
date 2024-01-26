// Product.js
import { DataTypes } from 'sequelize';
import { defineModel } from '../../controllers/defineModels.js';

const Product = defineModel('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  description:{
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl:{
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Product;

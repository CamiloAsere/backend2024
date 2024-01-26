//defineModels.js
import db from "../db/db.js";

export function defineModel(name, attributes) {
    const model = db.sequelize.define(name, attributes, {
      // Deshabilitar la creación de columnas createdAt y updatedAt
      timestamps: false
    });
  
    return model;
  }
//DataPlanModel.js
// Importar el módulo mongoose para trabajar con MongoDB
import mongoose from 'mongoose';

// Definir una función de validación para el campo quota
const validateQuota = (quota) => {
  // Comprobar si la cuota es un número positivo
  if (quota <= 0) {
    throw new Error('Invalid quota');
  }
};

// Definir el esquema del modelo de DataPlan
const DataPlanSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Nombre del plan de datos
  quota: { type: Number, required: true }, // Cuota de datos del plan
  });

// Definir una propiedad toJSON en el esquema
DataPlanSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id; // Cambiar el nombre del campo _id por id
    delete ret._id; // Eliminar el campo _id
    delete ret.__v; // Eliminar el campo __v
    return ret; // Devolver el objeto modificado
  }
});

// Definir un método pre en el esquema
DataPlanSchema.pre('save', function (next) {
  if (this.isNew) { // Si el documento es nuevo
    try {
      validateQuota(this.quota); // Validar el campo quota
      next(); // Continuar con el guardado
    } catch (err) {
      next(err); // Abortar el guardado y manejar el error
    }
  } else {
    next(); // Continuar con el guardado
  }
});

// Crear el modelo de DataPlan a partir del esquema
export const DataPlan = mongoose.model('DataPlan', DataPlanSchema);

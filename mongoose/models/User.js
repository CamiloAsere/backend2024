//UserModel.js
// Importar el módulo mongoose para trabajar con MongoDB
import mongoose from 'mongoose';

// Definir una función de validación para el campo email
const validateEmail = (email) => {
  // Usar una expresión regular para comprobar si el email tiene un formato válido
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email');
  }
};

// Definir el esquema del modelo de Usuario
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nombre del usuario
  email: { type: String, required: true, unique: true }, // Correo electrónico del usuario
  username: { type: String, required: true, unique: true }, // Nombre de usuario
  dataPlan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DataPlan' }], // Planes de datos asignados al usuario
  role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Rol del usuario
  userType: { type: String, enum: ['worker', 'student', 'teacher'], required: true } // Tipo de usuario
});

// Definir una propiedad toJSON en el esquema
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id; // Cambiar el nombre del campo _id por id
    delete ret._id; // Eliminar el campo _id
    delete ret.__v; // Eliminar el campo __v
    return ret; // Devolver el objeto modificado
  }
});

// Definir un método pre en el esquema
UserSchema.pre('save', function (next) {
  if (this.isNew) { // Si el documento es nuevo
    try {
      validateEmail(this.email); // Validar el campo email
      next(); // Continuar con el guardado
    } catch (err) {
      next(err); // Abortar el guardado y manejar el error
    }
  } else {
    next(); // Continuar con el guardado
  }
});

// Crear el modelo de Usuario a partir del esquema
export const User = mongoose.model('User', UserSchema);

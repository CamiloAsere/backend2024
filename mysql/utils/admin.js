// admin.js
import { MySignal } from './Signal.js';

// Crear una nueva instancia de MySignal
const errorMessageSignal = new MySignal({ errorMessage: '' });

// Suscribirse al cambio de 'errorMessage'
errorMessageSignal.subscribe('errorMessage', (newValue) => {
  const errorMessageElement = document.getElementById('error-message');
  errorMessageElement.textContent = newValue;
});
window.errorMessageSignal = errorMessageSignal
// Funciones para agregar, actualizar y eliminar usuarios
async function addUser(user) {
  // Lógica para agregar un usuario...
  errorMessageSignal.errorMessage = 'Usuario agregado exitosamente';
}

async function updateUser(user) {
  // Lógica para actualizar un usuario...
  errorMessageSignal.errorMessage = 'Usuario actualizado exitosamente';
}

async function deleteUser(userId) {
  // Lógica para eliminar un usuario...
  errorMessageSignal.errorMessage = 'Usuario eliminado exitosamente';
}

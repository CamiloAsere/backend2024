import { MySignal } from './Signal.js';
import {fetchData} from './utils.js'

// Crear una nueva instancia de MySignal
const errorMessageSignal = new MySignal({ errorMessage: '' });
const errorMessageElement = document.getElementById('error-message');

// Suscribirse al cambio de 'errorMessage'
errorMessageSignal.subscribe('errorMessage', (newValue) => {
  errorMessageElement.textContent = newValue;
});

// Función para manejar errores
export function handleError(errorCode) {
  switch (errorCode) {
    case 'NETWORK_ERROR':
      errorMessageSignal.errorMessage = 'Ocurrió un error de red al realizar la reservación';
      break;
    case 'SERVER_ERROR':
      errorMessageSignal.errorMessage = 'El servidor encontró un error al realizar la reservación';
      break;
    default:
      errorMessageSignal.errorMessage = 'Ocurrió un error al realizar la reservación';
  }
}

async function reserveProduct(productId) {
  const admin = {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com'
  };

  if (!admin.id || !productId ) {
    errorMessageSignal.errorMessage = 'Faltan datos necesarios para realizar la reservación';
    return;
  }

  const data = {
    userId: admin.id,
    productId: productId,
    date: new Date().toISOString()
  };

  // Indicar al usuario que la solicitud está en progreso
  errorMessageSignal.errorMessage = 'Reservando producto...';

  try {
    const response = await fetchData('/admin/reservations', 'POST', data);
    
    if (response.error) {
      handleError(response.error.code);
    } else {
      // Limpia el mensaje de error cuando la solicitud tiene éxito
      errorMessageSignal.errorMessage = 'Reservación exitosa';
      // Recargar la página
      location.reload();
    }
  } catch (error,response) {
    errorMessageSignal.errorMessage = `Ocurrió un error al realizar la reservación:`;
    console.log("error msg",response.message)
  }
}

// Exponer la función al objeto global window
window.reserveProduct = reserveProduct;

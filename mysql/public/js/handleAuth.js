import { MySignal } from "./Signal.js";

// Crear un objeto de estado para rastrear si el usuario está autenticado
const authState = new MySignal({ isAuthenticated: false });
export function handleAuth() {
    const authButton = document.getElementById('authButton');
    if (authButton.innerText === 'Iniciar sesión') {
      // Si el texto del botón es "Iniciar sesión", redirigir al usuario a la página de inicio de sesión
      window.location.href = '/login';
    } else {
      // Si el texto del botón es "Cerrar sesión", enviar una solicitud POST a la ruta de cierre de sesión
      fetch('/logout', {
        method: 'POST',
        credentials: 'include', // Incluir las cookies en la solicitud
      })
      .then(response => {
        if (response.ok) {
          // Si la respuesta es exitosa, redirigir al usuario a la página de inicio de sesión
          window.location.href = '/login';
          // Actualizar el estado de autenticación
          authState.set('isAuthenticated', false);
        } else {
          console.error('Error al cerrar la sesión:', response);
        }
      })
      .catch(error => {
        console.error('Error al cerrar la sesión:', error);
      });
    }
  }
  authState.subscribe('isAuthenticated', (isAuthenticated) => {
    const authButton = document.getElementById('authButton');
    if (isAuthenticated) {
      authButton.innerText = 'Cerrar sesión';
    } else {
      authButton.innerText = 'Iniciar sesión';
    }
  });
  window.handleAuth = handleAuth;
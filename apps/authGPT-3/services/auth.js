/*
Ahora, crearemos la función para enviar la información de inicio 
de sesión al servidor utilizando Axios. 
Crea un archivo llamado auth.js dentro de la carpeta services. 
Dentro de ese archivo, escribe el siguiente código:
*/
import axios from 'axios';

export const login = async (email, password) => {
  try {
    const res = await axios.post('/api/login', { email, password });
    return res;
  } catch (err) {
    throw new Error(err);
  }
};


/*
Ahora, crearemos la función para enviar la información de registro 
al servidor utilizando Axios. Añade el siguiente código al 
archivo auth.js dentro de la carpeta services:
*/

export const signup = async (name, email, password) => {
    try {
      const res = await axios.post('/api/signup', { name, email, password });
      return res;
    } catch (err) {
      throw new Error(err);
    }
};
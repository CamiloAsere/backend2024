// utils.js

export async function fetchData(url, method, data) {
  console.log('Datos enviados al servidor en fetchData:', data); // Agrega esta línea
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Error al realizar la solicitud');
  }

  return await response.json();
}

/*
import axios from 'axios'
export async function fetchData(url, method, data) {
  try {
    const response = await axios({
      url: url,
      method: method,
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Ocurrió un error:', error);
    throw error;
  }
}
*/


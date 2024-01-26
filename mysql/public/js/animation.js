document.addEventListener('DOMContentLoaded', (event) => {
  const PRODUCTS_URL = 'http://localhost:5000/products';
  // Mostrar la animación de carga
  document.getElementById('loading').style.display = 'block';

  fetch(PRODUCTS_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      return response.text();
    })
    .then(html => {
      // Ocultar la animación de carga y mostrar los productos
      document.getElementById('loading').style.display = 'none';
      document.getElementById('products-section').innerHTML = html;
    })
    .catch(error => {
      console.error('Ocurrió un error:', error);
      // Ocultar la animación de carga y mostrar un mensaje de error
      document.getElementById('loading').style.display = 'none';
      document.getElementById('products-section').innerHTML = '<p>Ocurrió un error al obtener los productos.</p>';
    });
});

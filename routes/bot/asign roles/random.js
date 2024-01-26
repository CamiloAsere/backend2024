export function getRandomElements(arr, n) {
    // Crear una copia del arreglo original para evitar modificarlo
    const arrCopy = [...arr];
    // Crear un arreglo para almacenar los elementos seleccionados
    const selectedElements = [];
    // Seleccionar n elementos aleatorios del arreglo
    for (let i = 0; i < n; i++) {
      // Calcular un índice aleatorio para seleccionar un elemento del arreglo
      const randomIndex = Math.floor(Math.random() * arrCopy.length);
      // Agregar el elemento seleccionado al arreglo de elementos seleccionados
      selectedElements.push(arrCopy[randomIndex]);
      // Eliminar el elemento seleccionado del arreglo para evitar repetirlo
      arrCopy.splice(randomIndex, 1);
    }
    return selectedElements;
  }
  

  export function getRoleByPercentage(roles, percentages) {
    // Crear una copia del arreglo original para evitar modificarlo
    const rolesCopy = [...roles];
    // Iterar sobre cada rol en el arreglo de roles
    for (let i = 0; i < rolesCopy.length; i++) {
      // Obtener el rol y el porcentaje de aparición del rol actual
      const role = rolesCopy[i];
      const percentage = percentages[role];
      // Si el número aleatorio es menor o igual al porcentaje de aparición, devolver el rol y eliminarlo del arreglo original
      if (Math.random() <= percentage) {
        roles.splice(roles.indexOf(role), 1);
        return role;
      }
    }
    // Si ningún rol fue seleccionado, devolver null
    return null;
  }
  
  
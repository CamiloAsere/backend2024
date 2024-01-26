export class MySignal {
    // Constructor de la clase
    constructor(obj) {
      // Inicializa el estado y los suscriptores
      this._value = {...obj};
      this._subscribers = {};

      // Define getters y setters para cada propiedad del estado
      for (const key of Object.keys(obj)) {
        Object.defineProperty(this, key, {
          get: () => this._value[key],
          set: (newValue) => {
            this._value[key] = newValue;
            // Cuando se actualiza una propiedad, se notifica a todos los suscriptores
            (this._subscribers[key] || []).forEach(fn => fn(newValue));
          },
        });
      }
    }
  
    // Método para suscribir una función a una propiedad del estado
    subscribe(key, fn) {
        // Verifica que la propiedad exista
        if (!this._value.hasOwnProperty(key)) {
            throw new Error(`La clave "${key}" no existe en el objeto.`);
        }
        // Si no hay suscriptores para esta propiedad, inicializa un nuevo Set
        if (!this._subscribers[key]) {
            this._subscribers[key] = new Set();
        }
        // Agrega la función al Set de suscriptores
        this._subscribers[key].add(fn);
        // Devuelve una función que permite desuscribirse
        return () => {
            if (!this._subscribers[key]) {
                return;
            }
            this._subscribers[key].delete(fn);
        };
    }

    // Método para desuscribir una función de una propiedad del estado
    unsubscribe(key, fn) {
        // Verifica que la propiedad exista
        if (!this._value.hasOwnProperty(key)) {
            throw new Error(`La clave "${key}" no existe en el objeto.`);
        }
        // Si no hay suscriptores para esta propiedad, no hace nada
        if (!this._subscribers[key]) {
            return;
        }
        // Elimina la función del Set de suscriptores
        this._subscribers[key].delete(fn);
    }

 
// Método para obtener el valor actual de una propiedad del estado
get(key) {

    // Verifica que la propiedad exista
    if (!this._value.hasOwnProperty(key)) {
        throw new Error(`La clave "${key}" no existe en el objeto.`);
    }
    // Devuelve el valor de la propiedad
    return this._value[key];
}

   // Método para establecer el valor de una propiedad del estado sin invocar a los observadores
   set(key, value) {
    // Verifica que la propiedad exista
    if (!this._value.hasOwnProperty(key)) {
        throw new Error(`La clave "${key}" no existe en el objeto.`);
    }
    // Actualiza el valor de la propiedad
    this._value[key] = value; 
} 

}

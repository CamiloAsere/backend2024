//Signal2.js
export class Signal {
    constructor(obj) {
      this._value = {...obj};
      this._subscribers = {};

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
  
  // Este método permite suscribir una función a una propiedad del estado
  // Recibe el nombre de la propiedad y la función a suscribir
  // Devuelve una función que permite desuscribirse de la propiedad
    subscribe(key, fn) {
        if (!this._value.hasOwnProperty(key)) {
           throw new Error(`La clave "${key}" no existe en el objeto.`);
        }
        // Si no hay suscriptores para esta propiedad, inicializa un nuevo Set
        if (!this._subscribers[key]) {
            this._subscribers[key] = [];
        }
        // Agrega la función al arrray de suscriptores
        this._subscribers[key].push(fn);
        // Devuelve una función que permite desuscribirse
        return () => {
            if (!this._subscribers[key]) {
                return;
            }
            this._subscribers[key] = this._subscribers[key].filter(f => f !== fn);
        };
    }

    // Este método permite desuscribir una función de una propiedad del estado
    // Recibe el nombre de la propiedad y la función a desuscribir
    unsubscribe(key, fn) {
      
      if (!this._value.hasOwnProperty(key)) {
        throw new Error(`La clave "${key}" no existe en el objeto.`);
      }
      // Si no hay suscriptores para esta propiedad, no hace nada
      if (!this._subscribers[key]) {
        return;
      }
      // Elimina la función del array de suscriptores
      this._subscribers[key] = this._subscribers[key].filter(f => f !== fn);
    }

    // Este método permite obtener el valor actual de una propiedad del estado
    // Recibe el nombre de la propiedad
    // Devuelve el valor de la propiedad
    get(key) {
      // Verifica que la propiedad exista
      if (!this._value.hasOwnProperty(key)) {
        throw new Error(`La clave "${key}" no existe en el objeto.`);
      }
      // Devuelve el valor de la propiedad
      return this._value[key];
    }

     // Este método permite establecer el valor de una propiedad del estado sin invocar a los observadores
     // Recibe el nombre de la propiedad y el nuevo valor
    set(key, value) {
      if (!this._value.hasOwnProperty(key)) {
        throw new Error(`La clave "${key}" no existe en el objeto.`);
      }
      // Actualiza el valor de la propiedad
      this._value[key] = value;
    }
    
    
}
    /*
    subscribe(key, fn) {
      if (!this._subscribers[key]) {
        this._subscribers[key] = [];
      }
      this._subscribers[key].push(fn);
      return () => this._subscribers[key] = this._subscribers[key].filter(f => f !== fn);
    }
    */


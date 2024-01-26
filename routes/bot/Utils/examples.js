//1 Para crear un signal que represente el tiempo restante para unirse a la partida, podrías hacer lo siguiente:
// Importar la clase Signal desde el archivo Signal.js
import { Signal } from "./Signal.js";

// Crear una nueva instancia de la clase Signal, pasándole el valor inicial de 120000 milisegundos
const joinTimeRemaining = new Signal({ value: 120000 });

// Acceder al valor del signal usando el getter
console.log(joinTimeRemaining.value); // Output: 120000

// Modificar el valor del signal usando el setter, incrementándolo en 30000 milisegundos
joinTimeRemaining.value = 30000; // Output: Signal updated: value = 150000

// Actualizar el estado del signal usando el método update, pasándole un objeto con el valor nuevo de 0 milisegundos
joinTimeRemaining.update({ value: 0 });
console.log(joinTimeRemaining.value); // Output: 0

//2 Para crear un signal que represente si la partida ha comenzado o no, podrías hacer lo siguiente:

// Importar la clase Signal desde el archivo Signal.js
import { Signal } from "./Signal.js";

// Crear una nueva instancia de la clase Signal, pasándole el valor inicial de false
const gameStarted = new Signal({ value: false });

// Acceder al valor del signal usando el getter
console.log(gameStarted.value); // Output: false

// Modificar el valor del signal usando el setter, cambiándolo a true
gameStarted.value = true; // Output: Signal updated: value = true

// Actualizar el estado del signal usando el método update, pasándole un objeto con el valor nuevo de false
gameStarted.update({ value: false });
console.log(gameStarted.value); // Output: false
 
//3 Para crear un signal que represente el número de jugadores que se han unido a la partida, podrías hacer lo siguiente:
// Importar la clase Signal desde el archivo Signal.js
import { Signal } from "./Signal.js";

// Crear una nueva instancia de la clase Signal, pasándole el valor inicial de 0
const playerCount = new Signal({ value: 0 });

// Acceder al valor del signal usando el getter
console.log(playerCount.value); // Output: 0

// Modificar el valor del signal usando el setter, incrementándolo en 1
playerCount.value = 1; // Output: Signal updated: value = 1

// Actualizar el estado del signal usando el método update, pasándole un objeto con el valor nuevo de 5
playerCount.update({ value: 5 });
console.log(playerCount.value); // Output: 5

//4 Para crear un signal que represente el contador que se activa para medir el tiempo de cada fase del juego, podrías hacer lo siguiente:
// Importar la clase Signal desde el archivo Signal.js
import { Signal } from "./Signal.js";

// Crear una nueva instancia de la clase Signal, pasándole el valor inicial de null
const phaseTimer = new Signal({ value: null });

// Acceder al valor del signal usando el getter
console.log(phaseTimer.value); // Output: null

// Modificar el valor del signal usando el setter, asignándole el resultado de la función setInterval
phaseTimer.value = setInterval(() => {
  // Lógica para ejecutar el contador y cambiar de fase
  // ...
}, 1000); // Output: Signal updated: value = [object Object]

// Actualizar el estado del signal usando el método update, pasándole un objeto con el valor nuevo de null
phaseTimer.update({ value: null });
console.log(phaseTimer.value); // Output: null

//5 Para crear un signal que represente el rol que le ha sido asignado a cada jugador, podrías hacer lo siguiente:
// Importar la clase Signal desde el archivo Signal.js
import { Signal } from "./Signal.js";

// Crear una nueva instancia de la clase Signal, pasándole el valor inicial de null
const playerRole = new Signal({ value: null });

// Acceder al valor del signal usando el getter
console.log(playerRole.value); // Output: null

// Modificar el valor del signal usando el setter, asignándole el resultado de la función verifyAndAssignRoles
playerRole.value = verifyAndAssignRoles(bot, chatId); // Output: Signal updated: value = "aldeano"

// Actualizar el estado del signal usando el método update, pasándole un objeto con el valor nuevo de "lobo"
playerRole.update({ value: "lobo" });
console.log(playerRole.value); // Output: lobo

//6 Para crear un signal que represente el número de votos que ha recibido cada jugador para ser linchado, podrías hacer lo siguiente:
// Importar la clase Signal desde el archivo Signal.js
import { Signal } from "./Signal.js";

// Crear una nueva instancia de la clase Signal, pasándole el valor inicial de 0
const playerVotes = new Signal({ value: 0 });

// Acceder al valor del signal usando el getter
console.log(playerVotes.value); // Output: 0

// Modificar el valor del signal usando el setter, incrementándolo en 1 cada vez que un jugador vote por él
playerVotes.value = 1; // Output: Signal updated: value = 1
playerVotes.value = 1; // Output: Signal updated: value = 2
playerVotes.value = 1; // Output: Signal updated: value = 3

// Actualizar el estado del signal usando el método update, pasándole un objeto con el valor nuevo de 0 al final de cada fase de votación
playerVotes.update({ value: 0 });
console.log(playerVotes.value); // Output: 0







//Signal2.js
export class Signal {
  constructor(initialState) {
    this._state = {...initialState};
    this._observers = {};

    for (const property of Object.keys(initialState)) {
      Object.defineProperty(this, property, {
        get: () => this._state[property],
        set: (newValue) => {
          this._state[property] = newValue;
          (this._observers[property] || []).forEach(callback => callback(newValue));
        },
      });
    }
  }

  // Este método permite suscribir una función a una propiedad del estado
  // Recibe el nombre de la propiedad y la función a suscribir
  // Devuelve una función que permite desuscribirse de la propiedad
  observe(property, callback) {
      if (!this._state.hasOwnProperty(property)) {
          throw new Error(`Property "${property}" does not exist.`);
      }
      if (!this._observers[property]) {
          this._observers[property] = [];
      }
      this._observers[property].push(callback);
      return () => {
          if (!this._observers[property]) {
              return;
          }
          this._observers[property] = this._observers[property].filter(f => f !== callback);
      };
  }

  // Este método permite desuscribir una función de una propiedad del estado
  // Recibe el nombre de la propiedad y la función a desuscribir
  unobserve(property, callback) {
    if (!this._state.hasOwnProperty(property)) {
      throw new Error(`Property "${property}" does not exist.`);
    }
    if (!this._observers[property]) {
      return;
    }
    this._observers[property] = this._observers[property].filter(f => f !== callback);
  }

  // Este método permite obtener el valor actual de una propiedad del estado
  // Recibe el nombre de la propiedad
  // Devuelve el valor de la propiedad
  getState(property) {
    if (!this._state.hasOwnProperty(property)) {
      throw new Error(`Property "${property}" does not exist.`);
    }
    return this._state[property];
  }

  // Este método permite establecer el valor de una propiedad del estado sin invocar a los observadores
  // Recibe el nombre de la propiedad y el nuevo valor
  setState(property, value) {
    if (!this._state.hasOwnProperty(property)) {
      throw new Error(`Property "${property}" does not exist.`);
    }
    this._state[property] = value;
  }
}







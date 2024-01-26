// startGameCycle.js
import { Signal } from './Utils/SIgnal2.js';
import { GamePhase, DayPhase, DuskPhase, NightPhase } from './gamePhasesA.js';
import { verifyAndAssignRoles } from './set role/combined.js';

// Crear una clase Game que represente el estado del juego
export class Game {
  constructor(chatId) {
    this.players = []; // Lista de los jugadores del juego
    // Crear un objeto signal que represente las fases del juego
    this.phases = new Signal({
      current: 0, // Fase actual del juego (0: noche, 1: día, 2: tarde)
      list: [new NightPhase(this), new DayPhase(this), new DuskPhase(this)], // Lista de las fases del juego
    });
    console.log('Phases:', this.phases.list.map(phase => phase.constructor.name));
    this.gameCreated = false; // Indica si el juego ha sido creado
    this.gameStarted = false; // Indica si el juego ha sido iniciado
    this.leaderIsAlive = true; // Indica si el líder está vivo

    // Suscribir una función que se ejecute cuando la fase actual del juego cambie
    this.phases.observe("current", (newCurrent) => {
      // Obtener la fase actual del juego usando el método get
      const phase = this.phases.get("list")[newCurrent];
      console.log(`Starting phase: ${phase.constructor.name}`);
      phase.startPhase(chatId);
    });
  }
// Definir un método para pasar a la siguiente fase del juego
   nextPhase(chatId) {
   try {
    // Usar el método set para incrementar la fase actual del juego e invocar a los observadores
    this.phases.current = (this.phases.current + 1) % this.phases.list.length;
  } catch (error) {
    // Manejar el error aquí
    console.error(error);
    // Notificar al grupo que ocurrió un error y se pasó a la siguiente etapa
    bot.telegram.sendMessage(chatId, `Ocurrió un error: ${error.message}. Se pasó a la siguiente etapa.`);
  }
}

  // Definir un método para iniciar el ciclo del juego
  startGameCycle(bot, ctx) {
    // Obtener el estado del juego para el grupo actual
    const gameState = getGameState(ctx.chat.id);
    // Verificar si el juego ha sido creado y iniciado
    if (gameState.getGameCreated() && gameState.getGameStarted()) {
      console.log('Starting game cycle');
      // Verificar y asignar los roles a los jugadores
      verifyAndAssignRoles(bot,ctx.chat.id);
      // Pasar a la siguiente fase del juego
      this.nextPhase(ctx.chat.id);
    }
  }

  // Definir un método para reiniciar el estado del juego
  resetGame() {
    this.players = [];
    this.gameStarted = false;
    this.gameCreated = false;
    this.leaderIsAlive = true;
    console.log("players list: ",this.players)
  }

  // Definir un método para actualizar el estado de los jugadores vivos en función del resultado de la votación
  updatePlayersAlive(lynchedPlayer) {
    lynchedPlayer.isAlive = false;
    // Implementar lógica para actualizar el estado del juego en función del resultado de la votación
    // ...
  }

  // Definir un método para establecer el valor de la propiedad gameCreated
  setGameCreated(gameCreated) {
    this.gameCreated = gameCreated;
  }

  // Definir un método para obtener el valor de la propiedad gameCreated
  getGameCreated() {
    return this.gameCreated;
  }

  // Definir un método para establecer el valor de la propiedad gameStarted
  setGameStarted(gameStarted) {
    this.gameStarted = gameStarted;
  }

  // Definir un método para obtener el valor de la propiedad gameStarted
  getGameStarted() {
    return this.gameStarted;
  }

  // Definir un método para establecer el valor de la propiedad players
  setPlayersFromStart(players) {
    this.players = players;
  }

  // Definir un método para obtener el valor de la propiedad players
  getPlayersFromStart() {
    return this.players;
  }

  // Definir un método para terminar la fase de noche
  endNight() {
    const leaderPlayer = this.players.find(
      (player) => player.role === "leader" && player.isAlive
    );
    if (leaderPlayer) {
      leaderPlayer.endNight();
    }
  }
}

// Crear un objeto para almacenar el estado del juego para cada grupo
const gameStates = {};

// Definir una función para obtener el estado del juego para un grupo en particular
export function getGameState(chatId) {
  // Si no existe un estado del juego para este grupo, crear uno nuevo
  if (!gameStates[chatId]) {
    gameStates[chatId] = new Game();
  }
  return gameStates[chatId];
}

// Definir una función para obtener la lista de jugadores para un grupo en particular
export function getPlayers(chatId) {
  const gameState = getGameState(chatId);
  return gameState.players;
}

// Exportar el objeto game para usarlo en otros archivos
export const game = new Game();

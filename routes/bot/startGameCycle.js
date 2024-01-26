// startGameCycle.js
import { GamePhase, DayPhase, DuskPhase, NightPhase } from './gamePhases.js';

import { verifyAndAssignRoles } from './set role/combined.js';

export class Game {
  constructor() {
    this.players = [];
    this.phases = [new NightPhase(this), new DayPhase(this), new DuskPhase(this)];
    console.log('Phases:', this.phases.map(phase => phase.constructor.name));
    this.currentPhase = -1;
    this.gameCreated = false;
    this.gameStarted = false;
    this.leaderIsAlive = true;
  }

  nextPhase(chatId) {
    this.currentPhase = (this.currentPhase + 1) % this.phases.length;
    const phase = this.phases[this.currentPhase];
    console.log(`Starting phase: ${phase.constructor.name}`);
    phase.startPhase(chatId);
  }

  startGameCycle(bot, chatId) {
    // Pasar la instancia del RoleBalancer como un parámetro a la función verifyRoleBalance
    // Verificar si el balance de roles es válido
    //const roleBalance = verifyRoleBalance(this.players.length);

    const gameState = getGameState(chatId);
    if (gameState.getGameCreated() && gameState.getGameStarted()) {
      console.log('Starting game cycle');
      verifyAndAssignRoles(bot,chatId);
      this.nextPhase(chatId);
    }
  }

  resetGame() {
    this.players = [];
    this.gameStarted = false;
    this.gameCreated = false;
    this.leaderIsAlive = true;
    console.log("players list: ",this.players)
  }
  // Método para actualizar el estado del juego en función del resultado de la votación
  updatePlayersAlive(lynchedPlayer) {
    lynchedPlayer.isAlive = false;
    // Implementar lógica para actualizar el estado del juego en función del resultado de la votación
    // ...
  }
  setGameCreated(gameCreated) {
    this.gameCreated = gameCreated;
  }

  getGameCreated() {
    return this.gameCreated;
  }
  setGameStarted(gameStarted) {
    this.gameStarted = gameStarted;
  }
  getGameStarted() {
    return this.gameStarted;
  }
  setPlayersFromStart(players) {
    this.players = players;
  }
  getPlayersFromStart() {
    return this.players;
  }
  // ...

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
export function getPlayers(chatId) {
  const gameState = getGameState(chatId);
  return gameState.players;
}
//const players = getPlayers(chatId);
/*
export function getPlayers(chatId) {
  const gameState = getGameState(chatId);
  return gameState.players;
}*/

export const game = new Game();

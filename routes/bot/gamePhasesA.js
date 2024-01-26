// gamePhases.js
import { bot } from "./bot.js";
import { endNightPhase, startDayPhase, startDuskPhase, startNightPhase } from "./gameLogic.js";
const NIGHT_PHASE_DURATION = 90000;
const DAY_PHASE_DURATION = 60000;
const DUSK_PHASE_DURATION = 60000;

// Crear una clase GamePhase que represente una fase del juego
class GamePhase {
  constructor(gameState) {
    // Usar el objeto signal que representa el estado del juego en lugar del objeto game
    this.gameState = gameState;
  }

  // Definir un método para iniciar la fase del juego
  startPhase(chatId) {
    try {
      // Usar el método set para incrementar la fase actual del juego e invocar a los observadores
      this.gameState.phase = (this.gameState.phase + 1) % this.gameState.phases.length;
    } catch (error) {
      // Manejar el error aquí
      console.error(error);
      // Notificar al grupo que ocurrió un error y se pasó a la siguiente etapa
      bot.telegram.sendMessage(chatId, `Ocurrió un error: ${error.message}. Se pasó a la siguiente etapa.`);
    }
  }
}

// Crear una subclase DayPhase que represente la fase de día
class DayPhase extends GamePhase {
  start() {
    console.log('Starting day phase');
    startDayPhase(bot)
    // No es necesario llamar a las funciones correspondientes para la fase de día, ya que se hace en la función observadora
    setTimeout(() => this.gameState.nextPhase(), DAY_PHASE_DURATION);
  }
}

// Crear una subclase DuskPhase que represente la fase del atardecer
class DuskPhase extends GamePhase {
  start() {
    console.log('Starting dusk phase');
    startDuskPhase(bot);
    // No es necesario llamar a las funciones correspondientes para la fase del atardecer, ya que se hace en la función observadora
    setTimeout(() => this.gameState.nextPhase(), DUSK_PHASE_DURATION);
  }
}

// Crear una subclase NightPhase que represente la fase de noche
class NightPhase extends GamePhase {
  start() {
    console.log('Starting night phase');
    startNightPhase(bot);
    // No es necesario llamar a las funciones correspondientes para la fase de noche, ya que se hace en la función observadora
    setTimeout(() => {
      endNightPhase();
      this.gameState.nextPhase();
    }, NIGHT_PHASE_DURATION);
  }
}

// Exportar las clases de las fases del juego para usarlas en otros archivos
export { GamePhase, DayPhase, DuskPhase, NightPhase };

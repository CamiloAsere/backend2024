// gamePhases.js
import { MySignal } from "./Utils/Signal.js";
import { bot } from "./bot.js";
import { sendMsg } from "./game commands/botCmd.js";
import { endNightPhase, startDayPhase, startDuskPhase, startNightPhase } from "./gameLogic.js";
const NIGHT_PHASE_DURATION = 90000;
const DAY_PHASE_DURATION = 60000;
const DUSK_PHASE_DURATION = 60000;
class GamePhase {
  constructor(game) {
    this.game = game;
    this.signal = new MySignal({ dayCount: 0, nightCount: 0 });
  }

  startPhase(chatId) {
    this.signal.count += 1; // Incrementa el conteo aquí
    try {
      this.start(chatId);
    } catch (error) {
      console.error(error);
      bot.telegram.sendMessage(chatId, `Ocurrió un error: ${error.message}. Se pasó a la siguiente etapa.`);
    }
  }

  start() {
    // Implementar en subclases
  }
}

class DayPhase extends GamePhase {
  start(chatId) {
    console.log('Starting day phase');
    this.signal.dayCount += 1;
    sendMsg(chatId, `🌄 Día <b>${this.signal.dayCount}</b>`);
    startDayPhase(bot,chatId);
    setTimeout(() => this.game.nextPhase(), DAY_PHASE_DURATION);
  }
}

class DuskPhase extends GamePhase {
  start(chatId) {
    console.log('Starting dusk phase');
    startDuskPhase(bot,chatId);
    setTimeout(() => this.game.nextPhase(), DUSK_PHASE_DURATION);
  }
}
class NightPhase extends GamePhase {
  start(chatId) {
    console.log('Starting night phase');
    this.signal.nightCount += 1;
    sendMsg(chatId, `🌃 Noche <b>${this.signal.nightCount}</b>`);
    startNightPhase(bot,chatId);
    setTimeout(() => {
      endNightPhase();
      this.game.nextPhase();
    }, NIGHT_PHASE_DURATION);
  }
}

export { GamePhase, DayPhase, DuskPhase, NightPhase };

import { Signal } from "../Utils/SIgnal2.js";
import { game, getGameState } from "../startGameCycle.js";
//el tiempo para unirse hay q resetearlo al iniciar la partida ,y al dar force
export class Timer {
  constructor(duration) {
    this._state = new Signal({
        time: duration, // Duración inicial del temporizador en segundos
        interval: null,
        startTime: null,
        duration: duration,
        isRunning: false, // Estado del temporizador
        timeout: null,
        players: [],
        joinTimer: null,
        joinStartTime: null,
        joinTimeRemaining: duration * 1000, // Tiempo para unirse a la partida en milisegundos
    });
}

start(bot, chatId) {
  if (!this._state.isRunning) {
      this._state.startTime = Date.now();
      this._state.isRunning = true;
      const timeRemainingInSeconds = this._state.joinTimeRemaining / 1000;
      bot.telegram.sendMessage(chatId, `⏳ Tienen ${timeRemainingInSeconds} segundos para unirse a la partida.`);
      this._state.joinTimer = setInterval(() => {
          const elapsedTime = Date.now() - this._state.startTime;
          console.log('elapsedTime: ',elapsedTime)
          this._state.joinTimeRemaining = Math.max(0, this._state.joinTimeRemaining - elapsedTime);
          console.log('joinTimeRemaining: ',this._state.joinTimeRemaining)
      }, 1000);

      // Suscribir una función que se ejecute cuando el tiempo para unirse llegue a 15 segundos o menos
      this._state.subscribe("joinTimeRemaining", (newTime) => {
        if (newTime <= 15000) {
          bot.telegram.sendMessage(chatId, `⚠️ *¡Quedan ${newTime / 1000} segundos!*`);
        }
      });

      // Suscribir una función que se ejecute cuando el tiempo para unirse llegue a 0
      this._state.subscribe("joinTimeRemaining", (newTime) => {
        if (newTime === 0) {
          clearInterval(this._state.joinTimer);
          this.resetJoinTimer();
          const gameState = getGameState(chatId);
          game.setPlayersFromStart([])//esta linea deberia borrarse cuando se establezca el contexto de la linea de codigo siguiente
          gameState.resetGame();
          bot.telegram.sendMessage(chatId, `❌ Se ha agotado el tiempo para unirse. La partida ha sido *cancelada*`, {parse_mode: "Markdown"});
        }
      });
  }
}
getTimeElapsed() {
      if (this._state.startTime === null) {
          return 0;
      }
      return Date.now() - this._state.startTime;
  }
 setTime(newTime) {
      this._state.time = newTime;
  }

  setDuration(newTime) {
      this._state.duration = newTime;
  }
  agregarTiempo(tiempo) {
  if (this._state.startTime === null) {
      return;
  }
  this._state.joinTimeRemaining += tiempo * 1000; // Aumentar el tiempo restante en 'tiempo' segundos
  this._state.startTime -= tiempo * 1000; // Ajustar el tiempo de inicio al tiempo añadido
}
  forceInit() {
    // Cancelar la partida manualmente con el comando "forceinit"
    this.resetJoinTimer();
  
  }
resetJoinTimer() {
    clearInterval(this._state.joinTimer);
    this._state.joinTimer = null;
    this._state.joinStartTime = null;
    this._state.joinTimeRemaining = this._state.duration * 1000;
}

detenerTemporizador() {
  clearTimeout(this._state.timeout);
  clearInterval(this._state.interval); // Borrar el intervalo
  this._state.startTime = null;
  this._state.isRunning = false; // Cambiar el estado del temporizador
}

  getTimeRemaining() {
      return Math.max(0, this._state.duration - this.getTimeElapsed());
  }

  crearPartida(bot, chatId) {
    bot.telegram.sendMessage(chatId,`🕰 *Temporizador iniciado* para ${this._state.duration} segundos`);
      this._state.interval = setInterval(() => {
          this.setTime(this._state.time - 1);
      }, 1000);

      // Suscribir una función que se ejecute cuando el tiempo del temporizador cambie
      this._state.subscribe("time", (newTime) => {
        bot.telegram.sendMessage(chatId,`⏳ *${newTime}* segundos restantes`);
      });

      // Suscribir una función que se ejecute cuando el tiempo del temporizador llegue a 0
      this._state.subscribe("time", (newTime) => {
        if (newTime === 0) {
          this.detenerTemporizador()
          if (this.condicionesIniciarJuego()) {
            bot.telegram.sendMessage(chatId,'🎮 *¡Comienza el juego!*');
            this.iniciarJuego();
          } else {
            bot.telegram.sendMessage(chatId,'❌ *Partida cancelada*');
          }
        }
      });
  }

  addPlayer(bot,chatId) {
    let jugadorUnidoSatisfactoriamente = false;
    // Aquí deberías poner el código para añadir un jugador a la partida
    // y asignar el valor true o false a la variable según el resultado
    // Tiempo adicional cuando se une un jugador, en segundos
    const EXTRA_TIME_WHEN_PLAYER_JOINS = 30;

    if (jugadorUnidoSatisfactoriamente) {
      this.agregarTiempo(EXTRA_TIME_WHEN_PLAYER_JOINS); // Aumentar el tiempo en 10 segundos
      bot.telegram.sendMessage(chatId, `🔥 *Tiempo aumentado* en 10 segundos. Tiempo restante: ${this._state.joinTimeRemaining / 1000} segundos`);
    } else {
      bot.telegram.sendMessage(chatId, `❌ No se ha podido unir al jugador. Inténtalo de nuevo.`);
    }
}

condicionesIniciarJuego() {
    return this._state.players.length >= 5; // El juego comienza si hay al menos 5 jugadores
}

startGame() {
    // Código para iniciar el juego de Werewolf
    // ...
    this.resetJoinTimer();
}
}

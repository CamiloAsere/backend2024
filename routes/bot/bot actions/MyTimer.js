import { game, getGameState } from "../startGameCycle.js";
import { Signal } from "../Utils/signalExample.js"; // Importar la clase Signal desde el archivo Signal.js

export class MyTimer {
  constructor() {
    /*
    // Asignar el bot y el chatId a propiedades internas de la clase
    this.bot = bot;
    this.chatId = chatId;
    */
    // Crear los signals que usas en tu clase, usando la clase Signal
    this.joinTimer = new Signal({ value: null });
    this.joinStartTime = new Signal({ value: null });
    this.joinTimeRemaining = new Signal({ value: 120000 }); // 2 minutos en milisegundos
    this.gameStarted = new Signal({ value: false });
    this.gameCreated = new Signal({ value: false });
    // ...
  }
  // ...
  startJoinTimer(bot, chatId) {
    const timeRemainingInSeconds = this.joinTimeRemaining.value / 1000;
    // Enviar un mensaje a través de Telegram informando que quedan 2 minutos para unirse a la partida
    bot.telegram.sendMessage(
      chatId,
      `⏳ Quedan ${timeRemainingInSeconds} segundos para unirse a la partida.`
    );

    // Guardar la hora de inicio del contador
    this.joinStartTime.value = new Date().getTime();
    // Activar el contador
    this.joinTimer.value = setInterval(() => {
      // Calcular el tiempo transcurrido desde la hora de inicio del contador
      const elapsedTime = new Date().getTime() - this.joinStartTime.value;
      // Reducir el tiempo restante en función del tiempo transcurrido
      this.joinTimeRemaining.value = Math.max(0, 120000 - elapsedTime);

      if (this.joinTimeRemaining.value === 15000) {
        console.log("quedan 30 segundos");
        // Si quedan 10 segundos para que se acabe el tiempo para unirse, enviar un mensaje
        bot.telegram.sendMessage(
          chatId,
          `La partida está a punto de comenzar.`
        );
      }

      if (this.joinTimeRemaining.value <= 0) {
        const gameState = getGameState(chatId);
        // Si se agota el tiempo restante para unirse, cancelar la partida automáticamente
        clearInterval(this.joinTimer.value);
        this.resetJoinTimer();
        game.setPlayersFromStart([]);
        gameState.resetGame();
       bot.telegram.sendMessage(
          this.chatId,
          `❌ Se ha agotado el tiempo para unirse. La partida ha sido *cancelada*`,
          { parse_mode: "Markdown" }
        );
      }
    }, 1000);
  }
  // ...

  resetJoinTimer() {
    // Restablecer el contador y cualquier estado relacionado con él a su estado inicial
    // Usar el método update de la clase Signal para actualizar el estado de los signals con un objeto
    this.joinTimer.update({ value: null });
    this.joinStartTime.update({ value: null });
    this.joinTimeRemaining.update({ value: 120000 });
  }

  addPlayer(bot, chatId) {
    //this.players.push(player);
    console.log("remaining time before ", this.joinTimeRemaining.value);
    // Por cada jugador que se una a la partida, aumentar el tiempo restante para unirse en 10 segundos
    this.joinTimeRemaining.value += 30000;
    // Enviar un mensaje a través de Telegram informando cuánto tiempo queda para unirse
    const timeRemainingInSeconds = Math.round(this.joinTimeRemaining.value / 1000);
    bot.telegram.sendMessage(
      chatId,
      `🔥 *Tiempo aumentado* en 30 segundos. Tiempo restante: ${timeRemainingInSeconds} segundos`,
      { parse_mode: "Markdown" }
    );
    console.log("remaining time after", this.joinTimeRemaining.value);
  }

  forceInit() {
    // Cancelar la partida manualmente con el comando "forceinit"
    this.resetJoinTimer();
  }

  startGame() {
    // Una vez que la partida haya comenzado, restablecer el contador y cualquier estado relacionado con él a su estado inicial
    this.resetJoinTimer();
  }
}

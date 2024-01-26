import { game, getGameState } from "../startGameCycle.js";

export class MyTimer {
    constructor() {
      this.joinTimer = null;
      this.joinStartTime = null;
      this.joinTimeRemaining = 120000; // 2 minutos en milisegundos
     
    }
  // ...
  startJoinTimer(bot, chatId) {
    const timeRemainingInSeconds = this.joinTimeRemaining / 1000;
    // Enviar un mensaje a través de Telegram informando que quedan 2 minutos para unirse a la partida
    bot.telegram.sendMessage(chatId, `⏳ Quedan ${timeRemainingInSeconds} segundos para unirse a la partida.`);

   // Guardar la hora de inicio del contador
   this.joinStartTime = new Date().getTime();
    // Activar el contador
    this.joinTimer = setInterval(() => {
        // Calcular el tiempo transcurrido desde la hora de inicio del contador
        const elapsedTime = new Date().getTime() - this.joinStartTime;
      // Reducir el tiempo restante en función del tiempo transcurrido
      this.joinTimeRemaining = Math.max(0, 120000 - elapsedTime);
    
    
     
    if (this.joinTimeRemaining === 15000) {
        console.log("quedan 30 segundos")
        // Si quedan 10 segundos para que se acabe el tiempo para unirse, enviar un mensaje
        bot.telegram.sendMessage(chatId, `La partida está a punto de comenzar.`);
      }
    
      if (this.joinTimeRemaining <= 0) {
        const gameState=getGameState(chatId)
        // Si se agota el tiempo restante para unirse, cancelar la partida automáticamente
        clearInterval(this.joinTimer);
        this.resetJoinTimer();
        game.setPlayersFromStart([])//esta linea deberia borrarse 
        gameState.resetGame();
        bot.telegram.sendMessage(chatId, `❌ Se ha agotado el tiempo para unirse. La partida ha sido *cancelada*`,{parse_mode:"Markdown"});
    }
    }, 1000);
  }
        // ...
      
      
    resetJoinTimer() {
      // Restablecer el contador y cualquier estado relacionado con él a su estado inicial
      clearInterval(this.joinTimer);
      this.joinTimer = null;
      this.joinStartTime = null;
      this.joinTimeRemaining = 120000;
    }
  
    addPlayer( bot,chatId ) {
      //this.players.push(player);
      console.log("remaining time before ", this.joinTimeRemaining)
      // Por cada jugador que se una a la partida, aumentar el tiempo restante para unirse en 10 segundos
      this.joinTimeRemaining += 30000;
        // Enviar un mensaje a través de Telegram informando cuánto tiempo queda para unirse
    const timeRemainingInSeconds = Math.round(this.joinTimeRemaining / 1000);
    bot.telegram.sendMessage(chatId,`🔥 *Tiempo aumentado* en 30 segundos. Tiempo restante: ${timeRemainingInSeconds} segundos`,{parse_mode:"Markdown"});
    console.log("remaining time after", this.joinTimeRemaining)
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
  
let state = {
    joinTimer: null,
    joinStartTime: null,
    joinTimeRemaining: 120000 // 2 minutos en milisegundos
  };
  
  function startJoinTimer(state, bot, chatId) {
    const timeRemainingInSeconds = state.joinTimeRemaining / 1000;
    // Enviar un mensaje a través de Telegram informando que quedan 2 minutos para unirse a la partida
    bot.telegram.sendMessage(chatId, `⏳ Quedan ${timeRemainingInSeconds} segundos para unirse a la partida.`);
  
    // Guardar la hora de inicio del contador
    state.joinStartTime = new Date().getTime();
    // Activar el contador
    state.joinTimer = setInterval(() => {
      // Calcular el tiempo transcurrido desde la hora de inicio del contador
      const elapsedTime = new Date().getTime() - state.joinStartTime;
      // Reducir el tiempo restante en función del tiempo transcurrido
      state.joinTimeRemaining = Math.max(0, 120000 - elapsedTime);
  
      if (state.joinTimeRemaining === 15000) {
        console.log("quedan 10 segundos")
        // Si quedan 10 segundos para que se acabe el tiempo para unirse, enviar un mensaje
        bot.telegram.sendMessage(chatId, `La partida está a punto de comenzar.`);
      }
  
      if (state.joinTimeRemaining <= 0) {
        // Si se agota el tiempo restante para unirse, cancelar la partida automáticamente
        clearInterval(state.joinTimer);
        state = resetJoinTimer(state);
        bot.telegram.sendMessage(chatId, `❌ Se ha agotado el tiempo para unirse. La partida ha sido *cancelada*`,{parse_mode:"Markdown"});
      }
    }, 1000);
  
    return state;
  }
  
  function resetJoinTimer(state) {
    // Restablecer el contador y cualquier estado relacionado con él a su estado inicial
    clearInterval(state.joinTimer);
    
    return {
      ...state,
      joinTimer: null,
      joinStartTime: null,
      joinTimeRemaining: 120000
    };
  }
  
  function addPlayer(state, bot, chatId) {
   // players.push(player);
  
   console.log("remaining time before ", state.joinTimeRemaining)
   // Por cada jugador que se una a la partida, aumentar el tiempo restante para unirse en 10 segundos
   state.joinTimeRemaining += 10000;
     // Enviar un mensaje a través de Telegram informando cuánto tiempo queda para unirse
   const timeRemainingInSeconds = Math.round(state.joinTimeRemaining / 1000);
   bot.telegram.sendMessage(chatId,`🔥 *Tiempo aumentado* en 10 segundos. Tiempo restante: ${timeRemainingInSeconds} segundos`,{parse_mode:"Markdown"});
   console.log("remaining time after", state.joinTimeRemaining)
  
   return state;
  }
  
  function forceInit(state) {
    // Cancelar la partida manualmente con el comando "forceinit"
    
    return resetJoinTimer(state);
  }
  
  function startGame(state) {
    // Una vez que la partida haya comenzado, restablecer el contador y cualquier estado relacionado con él a su estado inicial
    
    return resetJoinTimer(state);
  }
  
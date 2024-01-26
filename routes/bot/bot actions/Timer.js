
import printInColor from "../../st/color.js";
import { MySignal } from "../Utils/Signal.js";
import { MIN_PLAYERS } from "../game.js";
import { createJoinButton } from "../gameLogic.js";
import { game, getGameState } from "../startGameCycle.js";
import { actions } from "../game commands/botCmd.js";
import { START_GAME_MESSAGE } from "../Utils/phasesTexts.js";
//el tiempo para unirse hay q resetearlo al iniciar la partida ,y al dar force
export class Timer {
  constructor(duration) {
    this._state = new MySignal({
        time: duration, // Duración inicial del temporizador en segundos
        interval: null,
        startTime: null,
        duration: duration,
        isRunning: false, // Estado del temporizador
        timeout: null,
        joinTimer: null,
        joinStartTime: null,
        joinTimeRemaining: null, // Tiempo para unirse a la partida en milisegundos
        messageSent: false, // Indica si el mensaje ya se ha enviado
        lastStrategy:null
    });
}

 start(bot, chatId) {
  const gameState = getGameState(chatId);
  const chatID={chat:{id:chatId}}
  let PLAYERS=game.players
  //let PLAYERS=gameState.players
  //let PLAYERS=playersState.set("current",game.players)
  console.log("players ",PLAYERS,' ',chatID.chat.id,' ',PLAYERS.length)
  if (this._state.isRunning) {
    // Si el temporizador ya está en ejecución, detenerlo antes de iniciar uno nuevo
    this.stop();
  }

  this._state.startTime = Date.now();
  this._state.isRunning = true;

  try {
    const timeRemainingInSeconds = this._state.time;
    bot.telegram.sendMessage(chatId, `⏳ Tienen ${timeRemainingInSeconds} segundos para unirse a la partida.`);
  } catch (error) {
    console.error(`Error al enviar mensaje: ${error}`);
    bot.telegram.sendMessage(chatId, `Ocurrió un errror al iniciar el Timer: \n${error}`);
  }

  this._state.joinTimer = setInterval(() => {
    this.handleTimeStrategy(chatId, bot);
    this.updateJoinTimeRemaining();
    console.log(printInColor('elapsedTime: ','red' ) , this.getTimeElapsed()) 
    console.log(printInColor('joinTimeRemaining: ','green' ) , this.getTimeRemaining())
    if (this._state.joinTimeRemaining <= 0) {
      this.stop();
      this.resetJoinTimer();
      if (PLAYERS.length >= MIN_PLAYERS) {
        gameState.setGameStarted(true);
        bot.telegram.sendMessage(chatId,START_GAME_MESSAGE);
        gameState.startGameCycle(bot,chatId)
      } else {
        game.setPlayersFromStart([])//esta linea deberia borrarse cuando se establezca el contexto de la linea de codigo siguiente
        gameState.resetGame();
        bot.telegram.sendMessage(chatId, `❌ Se ha agotado el tiempo para unirse. La partida ha sido *cancelada*`, {parse_mode: "Markdown"}); 
      }
      
    }
  }, 1000);
}

 stop() {
  clearInterval(this._state.joinTimer);
  this._state.isRunning = false;
}

 updateJoinTimeRemaining() {
  const elapsedTime = this.getTimeElapsed();
  this._state.joinTimeRemaining = Math.max(0, this._state.time*1000 - elapsedTime);
}
 getTimeElapsed() {
      if (this._state.startTime === null) {
          return 0;
      }
      return Date.now() - this._state.startTime;
  }
 getTimeRemaining() {
    return Math.max(0, this._state.time*1000 - this.getTimeElapsed());
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
  this._state.time += tiempo; // Cambia esta línea // Aumentar el tiempo restante en 'tiempo' segundos
}
startGame() {
  // Código para iniciar el juego de Werewolf
  // ...
  this.resetJoinTimer();
}
  forceInit() {
    // Cancelar la partida manualmente con el comando "forceinit"
    this.resetJoinTimer();
  
  }
 resetJoinTimer() {
  clearInterval(this._state.joinTimer);
  this._state = new MySignal({
    time: this._state.duration, // Duración inicial del temporizador en segundos
    interval: null,
    startTime: null,
    isRunning: false, // Estado del temporizador
    timeout: null,
    joinTimer: null,
    joinStartTime: null,
    joinTimeRemaining: null, // Tiempo para unirse a la partida en milisegundos
    messageSent: false, // Indica si el mensaje ya se ha enviado
    lastStrategy: null
  });
} 
 addPlayer(bot,chatId) {
    let jugadorUnidoSatisfactoriamente = true;
    // Aquí deberías poner el código para añadir un jugador a la partida
    // y asignar el valor true o false a la variable según el resultado
    // Tiempo adicional cuando se une un jugador, en segundos
    const EXTRA_TIME_WHEN_PLAYER_JOINS = 30;

    if (jugadorUnidoSatisfactoriamente) {
      this.agregarTiempo(EXTRA_TIME_WHEN_PLAYER_JOINS); // Aumentar el tiempo en 10 segundos
      //const remains=Math.floor(this._state.joinTimeRemaining/1000)
      const remains=this.getTimeRemaining()
      bot.telegram.sendMessage(chatId, `🔥 *Tiempo aumentado* en ${EXTRA_TIME_WHEN_PLAYER_JOINS} segundos. Tiempo restante: ${Math.floor(remains/1000)} segundos`, {parse_mode: "Markdown"});
    } else {
      bot.telegram.sendMessage(chatId, `❌ No se ha podido unir al jugador. Inténtalo de nuevo.`, {parse_mode: "Markdown"});
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
  
  handleTimeStrategy(chatId, bot) {
    const remains=this.getTimeRemaining()
    // Define different strategies based on time
    const strategies = {
        120000: (state, chatId, bot) => {
        sendMessage(state, chatId, bot,`Quedan aproximadamente ${Math.floor(remains/1000)} segundos para comenzar`);
        },
        90000: (state, chatId, bot) => {
            sendMessage(state, chatId, bot, '👀 < 90 segundos para comenzar la partida.');
        },
        60000: (state, chatId, bot) => {
            sendMessage(state, chatId, bot, 'Queda menos de 1 min para comenzar la partida.');
        },
        30000: (state, chatId, bot) => {
          sendMessage(state, chatId, bot, 'Ultimos 30 segundos para unirse a la partida.');
        },
        10000: (state, chatId, bot) => {
            sendMessage(state, chatId, bot, 'La partida está a punto de comenzar.');
        },
        // Add more strategies as needed for other times
    };

    const joinTimeRemaining = this._state.joinTimeRemaining; // Get the remaining time
    // Detect the strategy based on the remaining time
    const strategyTimes = Object.keys(strategies)
        .map(Number)
        .sort((a, b) => b - a); // Sort from highest to lowest

    for (let i = 0; i < strategyTimes.length; i++) {
        const currentStrategyTime = strategyTimes[i];
        const nextStrategyTime = strategyTimes[i + 1] || 0;
        if (joinTimeRemaining <= currentStrategyTime && joinTimeRemaining > nextStrategyTime) {
            if (this._state.lastStrategy !== currentStrategyTime) {
              strategies[currentStrategyTime ] ( this . _state , chatId , bot ) ;
                this._state.lastStrategy = currentStrategyTime; // Save the last executed strategy
            }
            break;
        }
    }


  }

}
const joinButton = createJoinButton('Unirse', { type: 'joinme' });
export function sendMessage(state, chatId, bot, message) {
  if (!state.messageSent) {
      try {
          bot.telegram.sendMessage(chatId,message,{
             reply_markup: joinButton,
        });
          state.messageSent = true;
          state.messageSent = false;
          /*
          // Reset the flag after a delay
          setTimeout(() => {
              state.messageSent = false;
          },1000); // Adjust the delay as needed
          */
      } catch (error) {
          console.error(`Error al enviar mensaje: ${error}`);
      }
  }
}

 /*
for (const strategyTime of Object.keys(strategies).sort((a, b) => a - b)) {
    if (joinTimeRemaining <= strategyTime) {
      strategies[strategyTime](this._state, chatId, bot);
      break; // Una vez que se encuentra la estrategia adecuada, se detiene el bucle
    }
  }
 */

 

  /*
  //#1ra version
  agregarTiempo(tiempo) {
      if (this._state.startTime === null) {
          return;
      }
      this._state.joinTimeRemaining+= tiempo ;
  }
  //#2da aversion
  agregarTiempo(tiempo) {
    if (this._state.startTime === null) {
        return;
    }
   this._state.time += tiempo ; // Cambia esta línea
}
*/
/*


start(bot, chatId) {
  if (!this._state.isRunning) {
      this._state.startTime = Date.now();
      this._state.isRunning = true;
      const timeRemainingInSeconds =(this._state.time ) 
      try {
        bot.telegram.sendMessage(chatId, `⏳ Tienen ${timeRemainingInSeconds} segundos para unirse a la partida.`);
      } catch (error) {
        bot.telegram.sendMessage(chatId, `Ocurrió un errror al iniciar el Timer: \n${error}`);
        console.error(`Error al enviar mensaje: ${error}`);
      }
      // Resto del código...
      this._state.joinTimer = setInterval(() => {
        //const elapsedTime = Date.now() - this._state.startTime;
        const elapsedTime=this.getTimeElapsed();
        console.log('elapsedTime: ',elapsedTime)
        //this._state.joinTimeRemaining = Math.max(0, this._state.time*1000 - elapsedTime);
        //console.log('joinTimeRemaining: ',this._state.joinTimeRemaining)
        this._state.joinTimeRemaining = this.getTimeRemaining();
        console.log('joinTimeRemaining: ', this._state.joinTimeRemaining)

       this.handleTimeStrategy(chatId,bot)
        ////

        ////
       if (this._state.joinTimeRemaining <= 0) {
            clearInterval(this._state.joinTimer);
            this.resetJoinTimer();
            const gameState = getGameState(chatId);
            game.setPlayersFromStart([])//esta linea deberia borrarse cuando se establezca el contexto de la linea de codigo siguiente
            gameState.resetGame();
            bot.telegram.sendMessage(chatId, `❌ Se ha agotado el tiempo para unirse. La partida ha sido *cancelada*`, {parse_mode: "Markdown"});
        }
      }, 1000);
    }
  }

*/



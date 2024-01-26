//botCommands.js

import { aboutRoles } from '../bot actions/aboutRole.js';
//import { MyTimer } from '../bot actions/iTimer.js';
import { Timer} from '../bot actions/Timer.js';
import { roleList, roleListCommand} from '../bot actions/rolesLi.js';
import { bot } from '../bot.js';
import { playerListMessageId,MIN_PLAYERS } from '../game.js';
import { Asd, Testcommands,addOneRole,createJoinButton,sendInitialPlayerList, sendPlayersList } from '../gameLogic.js';
import { Player } from '../roles/Player.js';
import { game, getGameState } from '../startGameCycle.js';
import signalColor from '../Utils/signalExample.js';
import { Markup} from 'telegraf';
//import { nothing } from '../more/abstractfactoryRoles.js';
import { getMe } from '../Utils/highlightPlayer.js';
import { MessageSender } from '../Utils/messageSender.js';
import { listaDeJugadores } from '../Utils/PlayersList2.js';
import { START_GAME_MESSAGE } from '../Utils/phasesTexts.js';
const REPLY_DELETE_DELAY = 20000;
const START_GAME_GIF='https://media.giphy.com/media/l2YStLzXIt0zUCS76/giphy.gif'
export function sendMsg(chatId,message) {
  try {
    bot.telegram.sendMessage(chatId,message,{parse_mode:'HTML'})
  } catch (error) {
    console(error.message)
  }
  
}
export function deleteMessageAfter(ctx, message, delay) {
    setTimeout(() => {
    ctx.deleteMessage(message.message_id);
    }, delay);
   }
export function replyAndDeleteAfter(ctx, messageText, delay) {
       ctx.reply(messageText).then((message) => {
         deleteMessageAfter(ctx, message, delay);
       });
   }
   function isGroupChat(ctx) {
   return ctx.chat.type === 'group' || ctx.chat.type === 'supergroup';
}
async function isAdmin(ctx) {
    // Obtener la lista de administradores del grupo
    const admins = await ctx.getChatAdministrators();
    // Verificar si el usuario que envió el mensaje es un administrador del grupo
    return admins.some(admin => admin.user.id === ctx.from.id);
  }
  
async function handleAdminCommand(ctx, callback) {
    if (await isAdmin(ctx)) {
      // Si el usuario es un administrador del grupo, ejecutar la lógica del comando
      callback(ctx);
    } else {
      // Si el usuario no es un administrador del grupo, enviar un mensaje indicando que no tiene permisos para usar el comando
      ctx.reply('Lo siento, solo los administradores del grupo pueden usar este comando.');
    }
  }
function handleChatActions(ctx, callback) {
    if (isGroupChat(ctx)) {
        callback(ctx);
    } else {
        ctx.reply('Este comando solo está disponible en grupos.');
    }
}
function handleForceInitCommand(ctx) {
    handleChatActions(ctx, async (ctx) => {
      handleAdminCommand(ctx, (ctx) => {
        // Ejecutar la lógica del comando
        actions.handleGroupChat(ctx);
      });
    });
  }
function handleJoinMeCommand(ctx) {
  console.log("ejecutando handleJoinMeCommand")
  // Agregue aquí la lógica para manejar el comando joinme
  const gameState = getGameState(ctx.chat.id);
  if (gameState.getGameCreated()) {
    const player = game.players.find(player => player.id === ctx.from.id);
    if (player) {
      actions.replyAndDelete(ctx,`Lo siento ${ctx.from.first_name}, ya te has unido al juego.`)
    } else {
      // Crear una nueva instancia de la clase Player
      const newPlayer = new Player(ctx.from.first_name, ctx.from.id, null, gameState);
      game.players.push(newPlayer);
      actions.replyAndDelete(ctx,`Bienvenido al juego, ${newPlayer.name}!`)
      atimer.addPlayer(bot,ctx.chat.id)
      sendInitialPlayerList(ctx.chat.id);
     
    }
  } else {
    actions.replyAndDelete(ctx,'No hay ninguna partida creada en este grupo. Usa el comando /initgame para crear una nueva partida.')
  }
}

export const actions = {
    replyAndDelete: (ctx, message) => {
        replyAndDeleteAfter(ctx, message, REPLY_DELETE_DELAY);
    },
    handleGroupChat: (ctx) => {
        const gameState = getGameState(ctx.chat.id);
        if (gameState.getGameCreated()) {
            actions.gameCreated(ctx);
        } else {
            actions.replyAndDelete(ctx,"No hay ninguna partida creada en este grupo.\n Usa el comando /initgame para crear una nueva partida.")
        }
    },
    gameCreated: (ctx) => {
        const gameState = getGameState(ctx.chat.id);
        if (!gameState.getGameStarted()) {
            actions.gameNotStarted(ctx);
        } else {
            actions.replyAndDelete(ctx,`El juego ya ha comenzado.`)
        }
    },
    gameNotStarted: (ctx) => {
      
        if (game.players.length < MIN_PLAYERS) {
          actions.replyAndDelete(
            ctx,
            `Lo siento, se necesitan al menos ${MIN_PLAYERS} jugadores para comenzar el juego. La partida ha sido cancelada.`
          );
          
        // Obtener el estado del juego para este grupo
        const gameState = getGameState(ctx.chat.id);
        // Llamar al método resetGame para restablecer el estado del juego
        //game.resetGame()
        game.setPlayersFromStart([])
        gameState.resetGame();
        atimer.resetJoinTimer();
        } else {
          atimer.resetJoinTimer()
          const gameState = getGameState(ctx.chat.id);
          gameState.setGameStarted(true);
          actions.replyAndDelete(
            ctx,
            START_GAME_MESSAGE
          );
         atimer.startGame()
         gameState.startGameCycle(bot,ctx.chat.id)
        }
      }
    };
    
    function leaveGame(ctx) {
        const gameState = getGameState(ctx.chat.id);
        if (!gameState.getGameCreated()) {
          ctx.reply(`No hay ninguna partida creada en este grupo, ${ctx.from.first_name}.`);
          return;
        }
        if (gameState.getGameStarted()) {
          ctx.reply(`No puedes salir de una partida que ya ha comenzado, ${ctx.from.first_name}.`);
          return;
        }
        //const players = getPlayers(ctx.chat.id);
        const playerIndex = game.players.findIndex(player => player.id === ctx.from.id);
        if (playerIndex === -1) {
          ctx.reply(`No estás en la partida, ${ctx.from.first_name}.`);
          return;
        }
        game.players.splice(playerIndex, 1);
        ctx.reply(`Has salido de la partida, ${ctx.from.first_name}.`);
        sendInitialPlayerList(ctx.chat.id); // Llamada a sendInitialPlayerList 
      }

const atimer=new Timer(120)
export function initBotCommands(bot) {
bot.command('listensignal',(ctx)=>{
  signalColor();
  
})
 bot.command('initgame', (ctx) => {

 // código para manejar el comando /initgame
 if (isGroupChat(ctx)) {
    /////////
    const gameState = getGameState(ctx.chat.id);
    if (!gameState.getGameCreated()) {
      gameState.setGameCreated(true);
      bot.telegram.sendAnimation(
        ctx.chat.id,
        START_GAME_GIF,
        {
        caption: `🎮 ¡Se ha iniciado un nuevo juego por el jugador ${(ctx.from.first_name ? ctx.from.first_name : 'user '+ctx.from.id)}!\nTienes 2 minutos para unirte y ser devorado(a)!\nUsa el comando /joinme para unirte a la partida.`,
        
    }).then(() => {
      playerListMessageId.value = null;
      sendInitialPlayerList(ctx.chat.id); 
      atimer.start(bot,ctx.chat.id)
      
})
} else {
      ctx.reply('Ya hay una partida en curso en este grupo. Usa el comando /joinme para unirte a la partida.');
}

    ////////
  } else {
    ctx.reply('Este comando solo está disponible en grupos.');
  }
 });

 bot.command('joinme', (ctx) => {
    handleChatActions(ctx, handleJoinMeCommand);
});

//aboutRoles(bot) //quitado para evitar robos de ideas ,hasta el dia de probar el bot

bot.command('forceinit', handleForceInitCommand);

// Agrega más comandos aquí
bot.start((ctx) => {
    if (ctx.chat.type === 'private') {
      const firstName = ctx.from.first_name;
      const message = `👋 ¡Hola ${firstName}! Bienvenido al bot de Hombre Lobo.Tienes diez minutos para unirte y ser devorado(a)! 🐺\n\nPara crear una nueva partida en un grupo, usa el comando /initgame. Para unirte a una partida existente en un grupo, usa el comando /joinme. ¿Estás listo para jugar? 🎲`;
      ctx.reply(message);
    }
  });

  let lastUsed = null;
  const PLAYERS_COUNTDOWN=60000
bot.command('players', (ctx) => {
    handleChatActions(ctx, (ctx) => {
      const gameState = getGameState(ctx.chat.id);
      if (gameState.getGameCreated()) {
        const now = Date.now();
        if (lastUsed && now - lastUsed <  PLAYERS_COUNTDOWN) {
          // El comando se usó hace menos de 60 segundos
          // Enviar un mensaje al usuario indicando que debe esperar
          ctx.reply(`Debe esperar ${ PLAYERS_COUNTDOWN/1000} segundos antes de volver a usar el comando /players.`);
        } else {
          // El comando no se ha usado en los últimos 60 segundos
          // Actualizar la hora del último uso y ejecutar el comando
          lastUsed = now;
          sendPlayersList(ctx.chat.id);
        }
      } else {
        actions.replyAndDelete(ctx,'No hay ninguna partida creada en este grupo. Usa el comando /initgame para crear una nueva partida.');
      }
    });
  });

// Crear un Proxy para manejar los permisos de los usuarios
const adminCommandChecker = new Proxy(bot, {
  get(target, prop) {
    if (prop === 'command') {
      return function(command, callback) {
        // Crear una nueva función de devolución de llamada que verifica los permisos del usuario
        const newCallback = async (ctx) => {
          // Verificar si el usuario es un administrador del grupo
          if (await isAdmin(ctx)) {
            // Si el usuario tiene permisos, ejecutar la acción
            callback(ctx);
          } else {
            // Si el usuario no es un administrador del grupo, enviar un mensaje indicando que no tiene permisos para usar el comando
            ctx.reply('Lo siento, solo los administradores del grupo pueden usar este comando.');
          }
        };
        // Llamar al método original con el nuevo callback
        return target[prop].apply(this, [command, (ctx) => handleChatActions(ctx, newCallback)]);
      };
    } else {
      return target[prop];
    }
  }
});

// Utilizar el Proxy en lugar del objeto original
adminCommandChecker.command('extendt', (ctx) => {
  const text = ctx.message.text;
  const timeToAdd = parseInt(text.split(' ')[1]);

  if (!isNaN(timeToAdd)) {
    atimer.agregarTiempo(timeToAdd);
    ctx.reply(`Se ha añadido ${timeToAdd} segundos al temporizador.`);
  } else {
    ctx.reply('Por favor, proporciona un número válido de segundos para añadir al temporizador.');
  }
});


 /*
  bot.command('extendt', (ctx) => {
    //deberia ser usado solo mientras se unen los jugadores a la partida
    const text = ctx.message.text;
    const timeToAdd = parseInt(text.split(' ')[1]);
  
    if (!isNaN(timeToAdd)) {
      atimer.agregarTiempo(timeToAdd);
      ctx.reply(`Se ha añadido ${timeToAdd} segundos al temporizador.`);
    } else {
      ctx.reply('Por favor, proporciona un número válido de segundos para añadir al temporizador.');
    }
  }); 
  */
   

  //bot.command('rolelist',roleListCommand);
  roleList(bot);
  

  /******/
  bot.action('joinme', (ctx) => {
    handleJoinMeCommand(ctx);
    /*
  const data=ctx.callbackQuery.data
  console.log('callbackQuery.data ',data)
  */
    // Comprobar si el botón ya ha sido presionado
    if (ctx.callbackQuery.message.reply_markup.inline_keyboard[0][0].text !== 'Unido ✅') {
      // Cambiar el texto del botón después de que el usuario lo presione
      const newJoinButton = createJoinButton('Unido ✅', { type: 'joined' });
      ctx.editMessageReplyMarkup(newJoinButton);
    }
  });

  // Utilizar el Proxy en lugar del objeto original
  adminCommandChecker.command('exit', (ctx) => {
    leaveGame(ctx);
  })
  /*
  bot.command('exit', (ctx) => {
      if (isGroupChat(ctx)) {
        leaveGame(ctx);
      } else {
        ctx.reply('Este comando solo está disponible en grupos.');
      }
  });
   */
  /******/
   
  bot.command("test", Testcommands)
  
  bot.command("add1",addOneRole)
   bot.command("spam", Asd)
 async function sendGif(ctx, gifPath) {
        try {
          await ctx.replyWithAnimation({ source: gifPath });
        } catch (error) {
          console.log(error);
        }
      }
      bot.command('sendgif', (ctx) => {
        const gifPath = '../assets/tenor.gif';
        sendGif(ctx, gifPath);
      });
     

      bot.command('move', (ctx) => {
      
        ctx.reply('Presiona el botón para ver los puntos moverse.', Markup.inlineKeyboard([
          Markup.button.callback('Presiona aquí','move' )
        ]));
      });
      
      bot.action('move', (ctx) => {
        ctx.editMessageText('Moviendo los puntos: .');
      
        setTimeout(() => {
          ctx.editMessageText('Moviendo los puntos: ..');
        }, 1000);
      
        setTimeout(() => {
          ctx.editMessageText('Moviendo los puntos: ...');
        }, 2000);
      });


}

 /*
   bot.command('list',(ctx) => { 
    const message=listaDeJugadores(game) 
    const href=getMe(ctx)
    const sendit=new MessageSender(bot, ctx.chat.id)
    sendit.sendMessage(message)
    ctx.reply(ctx.from.id,href)
  }) 
  */





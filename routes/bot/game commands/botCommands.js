//botCommands.js
import { gameStarted, players, MIN_PLAYERS, resetGame , playerListMessageId, roles} from '../game.js';
import { Asd, Testcommands,sendInitialPlayerList, sendPlayersList } from '../gameLogic.js';
import { assignRolesAndSendMessages } from '../set role/asignRoles.js';
import { verifyRoleBalance } from '../set role/verifyRoleBalance.js';
import { game } from '../startGameCycle.js';
const REPLY_DELETE_DELAY = 20000;
let gameCreated=false

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


export function initBotCommands(bot) {

 bot.command('initgame', (ctx) => {
 // código para manejar el comando /initgame
 if (isGroupChat(ctx)) {
    if (!gameCreated) {
      gameCreated = true;
      ctx.reply(`Se ha creado una nueva partida por ${ctx.from.first_name}. Usa el comando /joinme para unirte a la partida.`);
      playerListMessageId.value = null;
      sendInitialPlayerList(ctx.chat.id);
    } else {
      ctx.reply('Ya hay una partida en curso en este grupo. Usa el comando /joinme para unirte a la partida.');
    }
  } else {
    ctx.reply('Este comando solo está disponible en grupos.');
  }
 });

  bot.command('joinme', (ctx) => {
    handleChatActions(ctx, (ctx) => {
      // Agregue aquí la lógica para manejar el comando joinme
      if (gameCreated) {
        const player = players.find(player => player.id === ctx.from.id);
        if (player) {
            actions.replyAndDelete(ctx,`Lo siento ${ctx.from.first_name}, ya te has unido al juego.`)
        } else {
          const newPlayer = {
            id: ctx.from.id,
            name: ctx.from.first_name,
            role: null
          };
          players.push(newPlayer);
          actions.replyAndDelete(ctx,`Bienvenido al juego, ${newPlayer.name}!`)
         
          sendInitialPlayerList(ctx.chat.id);
        }
      } else {
        actions.replyAndDelete(ctx,'No hay ninguna partida creada en este grupo. Usa el comando /initgame para crear una nueva partida.')
       }
    });
  });
 const actions = {
    replyAndDelete: (ctx, message) => {
        replyAndDeleteAfter(ctx, message, REPLY_DELETE_DELAY);
    },
    handleGroupChat: (ctx) => {
        if (gameCreated) {
            actions.gameCreated(ctx);
        } else {
            actions.replyAndDelete(ctx,'No hay ninguna partida creada en este grupo. Usa el comando /initgame para crear una nueva partida.')
        }
    },
    gameCreated: (ctx) => {
        if (!gameStarted) {
            actions.gameNotStarted(ctx);
        } else {
            actions.replyAndDelete(ctx,`El juego ya ha comenzado.`)
        }
    },
    gameNotStarted: (ctx) => {
        // Verificar si el balance de roles es válido
        const roleBalance = verifyRoleBalance(players.length);
        // Si el balance de roles es inválido, notificar al usuario y proporcionar opciones para corregirlo
        if (!roleBalance.valid) {
        ctx.reply(roleBalance.message);
        ctx.reply(`Opciones: ${roleBalance.options.join(', ')}`);
        return;
        } else if (players.length < MIN_PLAYERS) {
          actions.replyAndDelete(
            ctx,
            `Lo siento, se necesitan al menos ${MIN_PLAYERS} jugadores para comenzar el juego. La partida ha sido cancelada.`
          );
          gameCreated = false;
          resetGame();
        } else {
          gameStarted = true;
          actions.replyAndDelete(
            ctx,
            'Bienvenidos al juego de Hombre Lobo. La historia comienza en un pequeño pueblo donde los aldeanos viven en paz. Pero una noche, un grupo de lobos llega al pueblo y comienza a matar a los aldeanos. Los aldeanos deben descubrir quiénes son los lobos y matarlos antes de que sea demasiado tarde. ¿Están listos para jugar?'
          );
          assignRolesAndSendMessages(bot);
          game.startGameCycle();
        }
      }
    };

function handleChatActions(ctx, callback) {
    if (isGroupChat(ctx)) {
        callback(ctx);
    } else {
        ctx.reply('Este comando solo está disponible en grupos.');
    }
}

function handleForceInitCommand(ctx) {
  handleChatActions(ctx, (ctx) => {
      actions.handleGroupChat(ctx);
  });
}

bot.command('forceinit', handleForceInitCommand);
// Agrega más comandos aquí
bot.start((ctx) => {
    if (ctx.chat.type === 'private') {
      const firstName = ctx.from.first_name;
      const message = `👋 ¡Hola ${firstName}! Bienvenido al bot de Hombre Lobo. 🐺\n\nPara crear una nueva partida en un grupo, usa el comando /initgame. Para unirte a una partida existente en un grupo, usa el comando /joinme. ¿Estás listo para jugar? 🎲`;
      ctx.reply(message);
    }
  });
   
function leaveGame(ctx) {
    if (!gameCreated) {
      ctx.reply(`No hay ninguna partida creada en este grupo, ${ctx.from.first_name}.`);
      return;
    }
    if (gameStarted) {
      ctx.reply(`No puedes salir de una partida que ya ha comenzado, ${ctx.from.first_name}.`);
      return;
    }
    const playerIndex = players.findIndex(player => player.id === ctx.from.id);
    if (playerIndex === -1) {
      ctx.reply(`No estás en la partida, ${ctx.from.first_name}.`);
      return;
    }
    players.splice(playerIndex, 1);
    ctx.reply(`Has salido de la partida, ${ctx.from.first_name}.`);
    sendInitialPlayerList(ctx.chat.id); // Llamada a sendInitialPlayerList 
  }
  
  bot.command('salir', (ctx) => {
    if (isGroupChat(ctx)) {
      leaveGame(ctx);
    } else {
      ctx.reply('Este comando solo está disponible en grupos.');
    }
  });
 
  bot.command('rolelist', (ctx) => {
    const roleCommands = roles.map(role => `/about ${role.name}`);
    const message = `Lista de roles:\n${roleCommands.join('\n')}`;
    bot.telegram.sendMessage(ctx.from.id, message);
    if (ctx.chat.type !== 'private') {
      ctx.reply('Te he enviado la lista de roles por privado.');
    }
  });
  bot.command("test", Testcommands) 
   bot.command("spam", Asd) 
   let lastUsed = null;
      const PLAYERS_COUNTDOWN=60000
      bot.command('players', (ctx) => {
        handleChatActions(ctx, (ctx) => {
          if (gameCreated) {
            const now = Date.now();
            if (lastUsed && now - lastUsed <  PLAYERS_COUNTDOWN) {
              // El comando se usó hace menos de 60 segundos
              // Enviar un mensaje al usuario indicando que debe esperar
              ctx.reply(`Debe esperar ${ PLAYERS_COUNTDOWN/1000} segundos antes de volver a usar el comando players.`);
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
      
    }   
      /*
   bot.command('endplay', (ctx) => {
       if (gameStarted) {
       resetGame();
       ctx.reply('El juego ha sido detenido.');
       } else {
       ctx.reply('El juego aún no ha comenzado.');
       }
      })
*/
/*
 bot.command('forceinit', (ctx) => {
    if (isGroupChat(ctx)) {
      if (gameCreated) {
        if (!gameStarted) {
          if (players.length < MIN_PLAYERS) {
            replyAndDeleteAfter(ctx,`Lo siento, se necesitan al menos ${MIN_PLAYERS} jugadores para comenzar el juego. La partida ha sido cancelada.`,REPLY_DELETE_DELAY)
            gameCreated=false
            resetGame();
          } else {
            gameStarted = true;
            assignRoles();
            game.startGameCycle();
            ctx.reply('Bienvenidos al juego de Hombre Lobo. La historia comienza en un pequeño pueblo donde los aldeanos viven en paz. Pero una noche, un grupo de lobos llega al pueblo y comienza a matar a los aldeanos. Los aldeanos deben descubrir quiénes son los lobos y matarlos antes de que sea demasiado tarde. ¿Están listos para jugar?').then((message) => {
              deleteMessageAfter(ctx, message, 60000);
            });
          }
        } else {
        replyAndDeleteAfter(ctx,`El juego ya ha comenzado.`,REPLY_DELETE_DELAY)
        }
      } else {
        replyAndDeleteAfter(ctx,'No hay ninguna partida creada en este grupo. Usa el comando /initgame para crear una nueva partida.',REPLY_DELETE_DELAY)
      }
    } else {
      ctx.reply('Este comando solo está disponible en grupos.');
    }
  });
*/

/*
  bot.command('salir', (ctx) => {
    if (isGroupChat(ctx)) {
      if (gameCreated) {
        if (!gameStarted) {
          const playerIndex = players.findIndex(player => player.id === ctx.from.id);
          if (playerIndex !== -1) {
            players.splice(playerIndex, 1);
            ctx.reply(`Has salido de la partida, ${ctx.from.first_name}.`);
            updatePlayerListMessage(ctx.chat.id);
          } else {
            ctx.reply(`No estás en la partida, ${ctx.from.first_name}.`);
          }
        } else {
          ctx.reply(`No puedes salir de una partida que ya ha comenzado, ${ctx.from.first_name}.`);
        }
      } else {
        ctx.reply(`No hay ninguna partida creada en este grupo, ${ctx.from.first_name}.`);
      }
    } else {
      ctx.reply('Este comando solo está disponible en grupos.');
    }
  });
*/ 


/*
bot.command('forceinit', (ctx) => {
    if (isGroupChat(ctx)) {
        actions.handleGroupChat(ctx);
    } else {
        ctx.reply('Este comando solo está disponible en grupos.');
    }
});
*/
/*
function joinGame(ctx) {
    if (isGroupChat(ctx)) {
      if (gameCreated) {
        const player = players.find(player => player.id === ctx.from.id);
        if (player) {
        replyAndDeleteAfter(ctx,`Lo siento ${ctx.from.first_name}, ya te has unido al juego.`,REPLY_DELETE_DELAY)
        } else {
          const newPlayer = {
            id: ctx.from.id,
            name: ctx.from.first_name,
            role: null
          };
          players.push(newPlayer);
         replyAndDeleteAfter(ctx,`Bienvenido al juego, ${newPlayer.name}!`,REPLY_DELETE_DELAY)
         
         sendPlayerList(ctx.chat.id);
        }
      } else {
         replyAndDeleteAfter(ctx,'No hay ninguna partida creada en este grupo. Usa el comando /initgame para crear una nueva partida.',REPLY_DELETE_DELAY)
       }
    } else {
      ctx.reply('Este comando solo está disponible en grupos.');
    }
  }
  */
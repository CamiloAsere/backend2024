//botCommands.js
import { Timer } from '../bot actions/Timer.js';
import { aboutRoles } from '../bot actions/aboutRole.js';
import { roleList} from '../bot actions/rolesLi.js';
import { bot } from '../bot.js';
import { playerListMessageId,MIN_PLAYERS } from '../game.js';
import { Asd, Testcommands,addOneRole,sendInitialPlayerList, sendPlayersList } from '../gameLogic.js';
import { Player } from '../roles/Player.js';
import { verifyRoleBalance } from '../set role/verifyRoleBalance.js';
import { game, getGameState } from '../startGameCycle.js';
const timer=new Timer
const REPLY_DELETE_DELAY = 20000;
const START_GAME_GIF='https://media.giphy.com/media/l2YStLzXIt0zUCS76/giphy.gif'
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
   /* 
function handleJoinMeCommand(ctx) {
    // Agregue aquí la lógica para manejar el comando joinme
    const gameState = getGameState(ctx.chat.id);
    if (gameState.getGameCreated()) {
        const player = game.players.find(player => player.id === ctx.from.id);
        if (player) {
            actions.replyAndDelete(ctx,`Lo siento ${ctx.from.first_name}, ya te has unido al juego.`)
        } else {
            const newPlayer = {
                id: ctx.from.id,
                name: ctx.from.first_name,
                role: null
            };
           game.players.push(newPlayer);
            actions.replyAndDelete(ctx,`Bienvenido al juego, ${newPlayer.name}!`)
            
            sendInitialPlayerList(ctx.chat.id);
        
        }
    } else {
        actions.replyAndDelete(ctx,'No hay ninguna partida creada en este grupo. Usa el comando /initgame para crear una nueva partida.')
    }
}*/
function handleJoinMeCommand(ctx) {
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
      
      sendInitialPlayerList(ctx.chat.id);
     
    }
  } else {
    actions.replyAndDelete(ctx,'No hay ninguna partida creada en este grupo. Usa el comando /initgame para crear una nueva partida.')
  }
}

const actions = {
    replyAndDelete: (ctx, message) => {
        replyAndDeleteAfter(ctx, message, REPLY_DELETE_DELAY);
    },
    handleGroupChat: (ctx) => {
        const gameState = getGameState(ctx.chat.id);
        if (gameState.getGameCreated()) {
            actions.gameCreated(ctx);
        } else {
            actions.replyAndDelete(ctx,'No hay ninguna partida creada en este grupo. Usa el comando /initgame para crear una nueva partida.')
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
        } else {
          const gameState = getGameState(ctx.chat.id);
          gameState.setGameStarted(true);

          actions.replyAndDelete(
            ctx,
            'Bienvenidos al juego de Hombre Lobo. La historia comienza en un pequeño pueblo donde los aldeanos viven en paz. Pero una noche, un grupo de lobos llega al pueblo y comienza a matar a los aldeanos. Los aldeanos deben descubrir quiénes son los lobos y matarlos antes de que sea demasiado tarde. ¿Están listos para jugar?'
          );
          /*
          assignRolesAndSendMessages(bot);
          game.startGameCycle();
          */
          //game.startGameCycle(bot,ctx)
         gameState.startGameCycle(bot,ctx)
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
        const playerIndex = game.players.findIndex(player => player.id === ctx.from.id);
        if (playerIndex === -1) {
          ctx.reply(`No estás en la partida, ${ctx.from.first_name}.`);
          return;
        }
        game.players.splice(playerIndex, 1);
        ctx.reply(`Has salido de la partida, ${ctx.from.first_name}.`);
        sendInitialPlayerList(ctx.chat.id); // Llamada a sendInitialPlayerList 
      }

      
export function initBotCommands(bot) {

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
        caption: `🎮 ¡Se ha iniciado un nuevo juego por el jugador ${(ctx.from.first_name ? ctx.from.first_name : ctx.from.id)}!\nTienes diez minutos para unirte y ser devorado(a)!\nUsa el comando /joinme para unirte a la partida.`,
        
    }).then(() => {
      playerListMessageId.value = null;
      sendInitialPlayerList(ctx.chat.id);
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

aboutRoles(bot) 

bot.command('forceinit', handleForceInitCommand);

// Agrega más comandos aquí
bot.start((ctx) => {
    if (ctx.chat.type === 'private') {
      const firstName = ctx.from.first_name;
      const message = `👋 ¡Hola ${firstName}! Bienvenido al bot de Hombre Lobo.Tienes diez minutos para unirte y ser devorado(a)! 🐺\n\nPara crear una nueva partida en un grupo, usa el comando /initgame. Para unirte a una partida existente en un grupo, usa el comando /joinme. ¿Estás listo para jugar? 🎲`;
      ctx.reply(message);
    }
  });

bot.command('exit', (ctx) => {
    if (isGroupChat(ctx)) {
      leaveGame(ctx);
    } else {
      ctx.reply('Este comando solo está disponible en grupos.');
    }
  });
 
  //bot.command('rolelist',roleListCommand);
roleList(bot)

  bot.command("test", Testcommands) 

  bot.command("add1",addOneRole)
   bot.command("spam", Asd) 
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
     
}   

//bot.js//
import { Telegraf } from 'telegraf';
import { config } from 'dotenv';
import express from 'express';
import { initBotCommands } from './game commands/botCmd.js';
//import { initBotCommands } from './game commands/botCommands2.js';
//import { initBotCommands } from './game commands/botCommands3.js';


config();
export const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const app = express();
const port = process.env.PORT || 3000;
initBotCommands(bot);
bot.launch();
app.listen(port, () => {
 console.log(`Bot iniciado, server listening on port ${port}`);
});
/*
const REPLY_DELETE_DELAY = 60000;
let wolvesVoted = 0
const VOTING_TIME_LIMIT = 60000 // 60 segundos
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
console.log("tipo de gameCreated,",typeof(gameCreated))
bot.command('initgame', (ctx) => {
  if (isGroupChat(ctx)) {
    if (!gameCreated) {
      gameCreated = true;
      ctx.reply(`Se ha creado una nueva partida por ${ctx.from.first_name}. Usa el comando /unirse para unirte a la partida.`);
    } else {
      ctx.reply('Ya hay una partida en curso en este grupo. Usa el comando /unirse para unirte a la partida.');
    }
  } else {
    ctx.reply('Este comando solo está disponible en grupos.');
  }
});

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
      }
    } else {
       replyAndDeleteAfter(ctx,'No hay ninguna partida creada en este grupo. Usa el comando /initgame para crear una nueva partida.',REPLY_DELETE_DELAY)
     }
  } else {
    ctx.reply('Este comando solo está disponible en grupos.');
  }
}

bot.command('unirse', joinGame);

//bot.command('join', joinGame);
  
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
            startGameCycle();
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

bot.action(/^matar \d+$/, (ctx) => {
    const player = players.find(player => player.id === ctx.from.id)
    if (player && player.role === 'lobo') {
    const targetId = parseInt(ctx.match[0].split(' ')[1])
    const target = players.find(player => player.id === targetId)
    if (target) {
    player.action = 'matar'
    player.target = target
    wolvesVoted++
    ctx.answerCbQuery(`Has seleccionado a ${target.name} como tu objetivo.`)
    } else {
    ctx.answerCbQuery(`No se encontró al jugador seleccionado.`)
    }
    }
   })
   
   setTimeout(() => {
     if (wolvesVoted > 0) {
       countWolfVotes()
     }
   }, VOTING_TIME_LIMIT)
   
   bot.start((ctx) => {
    if (ctx.chat.type === 'private') {
      const firstName = ctx.from.first_name;
      const message = `👋 ¡Hola ${firstName}! Bienvenido al bot de Hombre Lobo. 🐺\n\nPara crear una nueva partida en un grupo, usa el comando /initgame. Para unirte a una partida existente en un grupo, usa el comando /unirse. ¿Estás listo para jugar? 🎲`;
      ctx.reply(message);
    }
  });
      
   bot.command('rolelist', (ctx) => {
    const roleCommands = roles.map(role => `/about ${role}`);
    const message = `Lista de roles:\n${roleCommands.join('\n')}`;
    bot.telegram.sendMessage(ctx.from.id, message);
    if (ctx.chat.type !== 'private') {
      ctx.reply('Te he enviado la lista de roles por privado.');
    }
  });
    
   bot.command("spam", Asd) 
   bot.command('endplay', (ctx) => {
       if (gameStarted) {
       resetGame();
       ctx.reply('El juego ha sido detenido.');
       } else {
       ctx.reply('El juego aún no ha comenzado.');
       }
      })
   
*/ 
//gameLogic.js
import { playerListMessageId, lastPlayerListMessage, lastPlayerListMessageId, GAME_CHAT_ID, wolvesAlive} from './game.js'
import { bot } from './bot.js'
import { Markup } from 'telegraf';
import { game, getGameState } from './startGameCycle.js';
import { roles } from './bot actions/roles.js';
import { Player } from './roles/Player.js';
import { sendLeaderOptions } from './bot actions/sendLeaderOptions.js';
import { notifyMasons } from './roles/mason/mason.js';
import { countWolfVotes } from './bot actions/countWolvesVote.js';
import { listaDeJugadores } from './Utils/PlayersList2.js';
import { MessageSender } from './Utils/messageSender.js';
import { RoleVerifier } from './Utils/verifyRoleOrMoveOn.js';
import { RolManager } from './Utils/roleManager.js';
import { DAY_PHASE_MESSAGE, NIGHT_PHASE_MESSAGE } from './Utils/phasesTexts.js';
const DAY_GIF_URL='https://media.giphy.com/media/F7zbPA5ZYuBchXRgc1/giphy.gif'
const DUSK_GIF_URL='https://media.giphy.com/media/3og0IMyCE2AfO84ZG0/giphy.gif'
const NIGHT_GIF_URL="https://media.giphy.com/media/RnMXpemm7RKaEfRmrb/giphy.gif"
export const PARTY_WEREWOLF_GIF='https://media.giphy.com/media/7hC8EMxqzygM/giphy.gif'
export function deleteMessageAfter(bot, chatId, messageId, delay) {
  setTimeout(() => {
      bot.telegram.deleteMessage(chatId, messageId);
  }, delay);
}

export function replyAndDeleteAfter(bot, chatId, messageText, delay) {
  bot.telegram.sendMessage(chatId, messageText).then((message) => {
      deleteMessageAfter(bot, chatId, message.message_id, delay);
  });
}
// Definimos la función totalWolvesOnGame
export function totalWolvesOnGame() {
  // Recalculamos el número total de lobos en el juego
  const newTotalWolves = game.players.filter(player => player.role === 'wolf' && player.isAlive).length;
  console.log('total ww:',newTotalWolves)
  wolvesAlive.set('totalWolves', newTotalWolves);
  wolvesAlive.set('wolvesVoted', 0);
  // ...
}
//
export function sendWolfOptions(chatId) {
  console.log('ejecutando sendWOlfOptions')
  game.players.forEach(player => {
      const { role, isAlive, actions } = player;
      //[{ text, callback_data: JSON.stringify(callbackData) }]
      if (role === 'wolf' && isAlive && actions?.attack) {
          const options = game.players
          .filter(p => p.id !== player.id && p.isAlive && p.role !== 'wolf') // Asegúrate de que el lobo no pueda atacar a otros lobos
          .map(p => Markup.button.callback(p.name, `attack ${p.id}`)); // Quitamos la palabra "matar" del botón
          options.push(Markup.button.callback('Omitir acción', 'skip')); // Añadimos un botón para omitir la acción
          if (options.length === 0) {
              console.log('No hay opciones disponibles para el jugador', player.id);
              return;
          }
          // Dividimos el array de opciones en subarrays de longitud 3
          const optionsInRows = [];
          for (let i = 0; i < options.length; i += 3) {
            optionsInRows.push(options.slice(i, i + 3));
          }
          const message = 'A quieres comerte?';
          enviarAcciones(player.id, optionsInRows, message );
          //bot.telegram.sendMessage(player.id, message, Markup.inlineKeyboard(optionsInRows));
       }
  });
}

export function endNightPhase() {
// Contar los votos de los lobos y actualizar el estado del juego
const wolfPlayer = game.players.find(
  (player) => player.role === "wolf" && player.isAlive
);

if (wolfPlayer) {
  countWolfVotes(game, roles, bot);
 // wolfPlayer.countWolfVotes(game, roles, bot);
}

game.endNight()
// En algún otro lugar de tu código, después de que el lobo haya hecho su elección...
  if (wolfPlayer.messageId) {
  bot.telegram.deleteMessage(wolfPlayer.id, wolfPlayer.messageId)
    .catch(error => console.error(`Error al eliminar mensaje: ${error}`));
}
 // Borrar los mensajes de acción
 // Vaciar el registro de mensajes de acción
 }

  function getAlivePlayersList(players) {
    let playerListMessage = '';
    playerListMessage = `™ <b>Jugadores vivos</b> 👁‍🗨\n🔗 <b>Total:</b> ${players.length}\n`;
    const playerNames = players.map((player, index) => `  ${index + 1}. ${player.name}`);
    playerListMessage += playerNames.join('\n');
    return playerListMessage;
  }
  
  //Ojo q game.players esta medio pirata porque esta devolviendo cosaa de mas
  
  export async function startDayPhase(bot, chatId) {
    console.log('chatID in startDayPhase: ',chatId)
    // Lógica para la fase de día
    const messageSender = new MessageSender(bot, chatId);
    const mensaje = listaDeJugadores(game);
    //const message=getAlivePlayersList(game.players)
    
    await bot.telegram.sendAnimation(GAME_CHAT_ID, DAY_GIF_URL, {caption:'Ya es de día...'});
    // Inicio del día
    await bot.telegram.sendMessage(GAME_CHAT_ID, DAY_PHASE_MESSAGE);
    // Mostrar lista de jugadores vivos
    messageSender.sendMessage(mensaje);
    //await bot.telegram.sendMessage(GAME_CHAT_ID, message, { parse_mode: 'HTML' });
    
}

 export function startDuskPhase(bot,chatId) {
// Enviar GIF con pie de foto
bot.telegram.sendAnimation(chatId, DUSK_GIF_URL, { caption: '¡Ha comenzado la tarde! Jugadores, ¡preparaos para linchar!' });
// ...
  /*
  Durante la fase del atardecer en un juego, los jugadores con acciones diurnas seleccionan sus acciones. 
  Al inicio de esta fase, se dan los resultados de las visiones diurnas y se informa sobre el resultado de las acciones de los jugadores. 
  Utilizando esta información, escribe un código que implemente la lógica para esta fase del juego.
  */
  sendVillagerOptions()
 }
 // Obtener la lista de jugadores


export async function startNightPhase(bot,chatId) {
  console.log('chatID in startNightPhase: ',chatId)
   bot.telegram.sendAnimation(chatId,  NIGHT_GIF_URL, {caption:'Cae la noche'})
   bot.telegram.sendMessage(chatId, NIGHT_PHASE_MESSAGE)
   const messageSender = new MessageSender(bot, chatId);
    const mensaje = listaDeJugadores(game);
    messageSender.sendMessage(mensaje)
  //sendInitialPlayerList(chatId)
  const gameState=getGameState(chatId)
  //let players=[]
  const players = gameState.players
  const wolves = Object.keys(players).filter(player => player.role === 'wolf');
  console.log('wolves players ',wolves)
  // Lógica para la fase de noche
  const roleVerifier = new RoleVerifier(players, roles);
  //Verificar un rol o continuar con la siguiente línea de código
  let lobo = 'wolf';
  // Inicio de la noche
  // Mostrar lista de jugadores
  
  // Crear una nueva instancia de RoleVerifier 
  roleVerifier.verifyRoleOrMoveOn(lobo, () => {
  console.log(`El rol ${lobo} existe`);
  totalWolvesOnGame()
  sendWolfOptions(chatId);
  });
  
const leaderPlayer = game.players.find(
    (player) => player.role === "leader" && player.isAlive
  );
  if (leaderPlayer) {
    sendLeaderOptions(leaderPlayer, bot);
  }
  notifyMasons(bot, game.players);
  sendSeerOptions();
  sendDruidOptions();
  // Finalizar fase de noche después de un tiempo determinado
 }
 
 // ...

 /**
 * Enviar opciones a los aldeanos para votar por quién linchar.
 */
export function sendVillagerOptions() {
  // Iterar sobre la lista de jugadores
  game.players.forEach(player => {
    // Verificar si el jugador está vivo
    if (player.isAlive) {
      // Crear un arreglo de opciones para el jugador
      let options = game.players
        .filter(p => p.id !== player.id && p.isAlive)
        .map(p => Markup.button.callback(p.name, `linchar ${p.id}`));
      // Agregar un botón de abstención al final del arreglo de opciones
      options.push(Markup.button.callback('Abstenerse', 'abstenerse'));
      
      // Dividir el arreglo de opciones en subarreglos de 3 elementos cada uno
      const chunkSize = 3;
      const rows = [];
      for (let i = 0; i < options.length; i += chunkSize) {
        rows.push(options.slice(i, i + chunkSize));
      }
      
      // Enviar las opciones al jugador
      const message = 'Elige a quién linchar:';
      bot.telegram.sendMessage(
        player.id,
        message,
        Markup.inlineKeyboard(rows),{ parse_mode: 'HTML' }
      );
    }
  });
}


export function sendSeerOptions() {
  const seer = game.players.find(player => player.role === 'seer');
  const role = roles['seer']();
  if (seer && role.actions?.vision ) {
    const options = game.players
      .filter(p => p.id !== seer.id)
      .map(p => Markup.button.callback(p.name, `ver ${p.id}`));
    const message='Elige a quién quieres ver:'
    bot.telegram.sendMessage(
      seer.id,
      message,
      Markup.inlineKeyboard(options)
    );
  }
}

export function sendDruidOptions() {
  const druid = game.players.find(player => player.role === 'druid')
  const role = roles['druid']();
  if(druid && role.actions.protect){
    const options = ['proteger', 'atacar']
    const message='Elige sobre quién quieres realizar la accion:'
    enviarAcciones(druid.id, options, message)
  }
}
function enviarAcciones(chatId, botones, mensaje = "Elige qué acción quieres realizar:") {
  bot.telegram.sendMessage(
    chatId,
    mensaje,
    Markup.inlineKeyboard(botones)
  );
}
//////////////////////////////
// Mensajes de error
const ERROR_ACCION_YA_SELECCIONADA = 'Ya has seleccionado una acción.';
const ERROR_JUGADOR_YA_SELECCIONADO = 'Ya has seleccionado un jugador.';
const ERROR_ACCION_OMITIDA = 'Has elegido omitir, no puedes realizar más acciones.';
const acciones = ['Atacar', 'Proteger','Omitir'];
const jugadores = ['Jugador 1', 'Jugador 2', 'Jugador 3'];
let accionSeleccionada;
let jugadorSeleccionado;
let accionOmitida = false;
// ...
function sendActions(chatId, acciones, mensaje = "Elige qué acción quieres realizar:") {
  try {
    bot.telegram.sendMessage(
      chatId,
      mensaje,
      Markup.inlineKeyboard(
        acciones.map(accion => Markup.button.callback(accion, `accion:${accion}`))
        //acciones.map(accion => Markup.button.callback(accion, JSON.stringify({accion})))
      )
    );
  } catch (error) {
    console.error(error);
  }
}
function seleccionarAccion(ctx) {
    if (!accionSeleccionada) {
        accionSeleccionada = ctx.match[1];
        ctx.replyWithMarkdown(`Has seleccionado: ${accionSeleccionada}`);
        console.log('accion seleccionada: ',accionSeleccionada)
        // Verifica si la acción seleccionada es 'Omitir'
        if (accionSeleccionada === 'Omitir') {
            accionOmitida = true;
        } else {
            enviarJugadores(ctx.chat.id);
        }
        ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    } else {
        ctx.answerCbQuery(ERROR_ACCION_YA_SELECCIONADA );
    }
}

function enviarJugadores(chatId) {
    // Verifica si la acción fue omitida
    if (accionOmitida) {
        bot.telegram.sendMessage(chatId, ERROR_ACCION_OMITIDA);
    } else {
        bot.telegram.sendMessage(
            chatId,
            "Elige un jugador:",
            Markup.inlineKeyboard(
                jugadores.map(jugador => Markup.button.callback(jugador, `jugador:${jugador}`))
            )
        ).then((sentMessage) => {
            setTimeout(() => {
                bot.telegram.deleteMessage(chatId, sentMessage.message_id);
                bot.telegram.sendMessage(chatId, 'Ups, se acabó el tiempo');
            }, 60000);
        });
    }
}

function seleccionarJugador(ctx) {
    // Verifica si la acción fue omitida
    if (accionOmitida) {
        ctx.answerCbQuery(ERROR_ACCION_OMITIDA);
    } else if (!jugadorSeleccionado) {
        jugadorSeleccionado = ctx.match[1];
        ctx.answerCbQuery(`Has seleccionado: ${jugadorSeleccionado}`);
        // Aquí puedes aplicar la acción seleccionada al jugador seleccionado
        ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    } else {
        ctx.answerCbQuery(ERROR_JUGADOR_YA_SELECCIONADO);
    }
}
//////////////////////////////
/*
sendActions(ctx.from.id,acciones);
bot.action(/accion:(.+)/, seleccionarAccion);
bot.action(/jugador:(.+)/, seleccionarJugador);

const actions = [
  { text: 'Accion 1', id: '1' },
  { text: 'Accion 2', id: '2' },
  { text: 'Accion 3', id: '3' },
];

*/
export function Asd(ctx) {
// Personaliza el mensaje aquí
const groupName = ctx.chat.title
const groupScore = ctx.chat.id;
const messageText = `
    *${groupName}*

    🎮 Group Score : ${groupScore}
    El juego está empezando, espera un segundo mientras asigno los roles y actualizo la base de datos.

    Cae la noche. Todo el mundo se dirige a su cama agotado después de un día tan intenso. Jugadores nocturnos, ¡tenéis 90 segundos para realizar vuestras acciones!
`;

/// Crea botones interactivos
const buttons = Markup.inlineKeyboard([
  Markup.button.callback('🌙 Empezar la noche','startNight'),
  Markup.button.callback('☀️ Empezar el día', 'startDay')
]);

// Envía el mensaje con botones interactivos y formato Markdown
  ctx.replyWithMarkdown(messageText, buttons);

sendActions(ctx.from.id,acciones);
// Maneja los botones interactivos
bot.action('startNight', (ctx) => ctx.answerCbQuery('¡La noche ha comenzado!'));
bot.action('startDay', (ctx) => ctx.answerCbQuery('¡El día ha comenzado!'));




bot.action(/accion:(.+)/, seleccionarAccion);

bot.action(/jugador:(.+)/, seleccionarJugador);
/*
//startNightPhase(bot,ctx.chat.id)
enviarAcciones(ctx.from.id,acciones);
bot.action(/accion:(.+)/, seleccionarAccion);
bot.action(/jugador:(.+)/, seleccionarJugador);
*/
}

/*
export function createJoinButton(text, callbackData) {
  return {
    inline_keyboard: [
      [{ text, callback_data: JSON.stringify(callbackData) }]
    ]
  };
}
*/

export function createJoinButton(text, callbackData) {
  let callback_data = '';
  if (typeof callbackData === 'object') {
    callback_data = JSON.stringify(callbackData);
  } else {
    console.error(`callbackData debe ser un objeto, pero se recibió ${typeof callbackData}`);
  }

  return {
    inline_keyboard: [
      [{ text, callback_data }]
    ]
  };
}


/*
bot.telegram.sendAnimation(
  ctx.chat.id,
  'https://media.giphy.com/media/SirUFDS5F83Go/giphy.gif',
  {
      caption:{message},
       reply_markup: joinButton,
  }
)
*/
const START_GAME_GIF='https://media.giphy.com/media/SirUFDS5F83Go/giphy.gif';

export function addOneRole(ctx){
const gameState = getGameState(ctx.chat.id);
const newPlayer=new Player('The Reckening',20, null,gameState )
game.players.push(newPlayer)
}
export function Testcommands(ctx) {
  const rolesIniciales = ['Rol1', 'Rol2', 'Rol3', 'Rol4', 'Rol5', 'Rol6', 'Rol7', 'Rol8'];
  console.log("rolesIniciales es de tipo ",typeof(rolesIniciales));
  const rolManager = new RolManager(rolesIniciales);
  const numeroJugadores = 5;
  const rolesDivididos = rolManager.asignarRoles(numeroJugadores);
  console.log("rolesDivididos ",rolesDivididos,' de tipo ',typeof(rolesDivididos));
  const players = [
    { name: 'Alice', role: "villager", id: 1 },
    { name: 'Bob', role: "traitor", id: 2 },
    { name: 'Charlie', role: "wolf", id: 3 },
    { name: 'BigMAc', role: "blacksmith", id: 4 },
  ];
  const gameState = getGameState(ctx.chat.id);
const player1=new Player('Alice', 1, null,gameState )
const player2=new Player("Bob", 2, null, gameState )
const player3=new Player('BigMac', 3, null,gameState )
const player4=new Player('Que vaya el Choco', 4, null ,gameState)
const player5=new Player('George', 5, null,gameState )
const player6=new Player('Caporal', 6, null,gameState )
const player7=new Player('Mordisquito', 7, null,gameState )

game.players.push(player1)
game.players.push(player2)
game.players.push(player3)
game.players.push(player4)
game.players.push(player5)
game.players.push(player6)
game.players.push(player7)
const role = roles['wolf']();
if (role.actions.attack) {
  console.log("yes")
}
else{
  console.log("no") 
}


const playerNames = game.players.map((player,index) => `${index + 1} • ${player.name} ${player.isAlive}  ${player.actions}\n`);
//bot.telegram.sendMessage(ctx.chat.id, 'test cmd list: \n' + playerNames)
/*
  players.forEach((player) => {
    const roleInfo = roles[player.role]();
    console.log(
      `%c${player.name} is a ${roleInfo.roleName}`,
      'font-size:18px; font-family:monospace; color:black; background-color:yellow;'
    );
    

    //bot.telegram.sendMessage(ctx.chat.id,`${player.name} is a ${roleInfo.roleName}`)

  });
  */
  const villagerMsg = players
    .filter(player => player.role === 'wolf')
    .map(player => `${player.name} es un ${player.role}`);
   // bot.telegram.sendMessage(ctx.chat.id,`${villagerMsg}`)
  //console.log(villagerNames); // Outputs ["Charlie"]
  
  const roleInfo = roles['blacksmith']();
  /*
  players.forEach(player => {
    if (player.role === 'blacksmith' && roleInfo.actions.spread) {
      //console.log(`actions ${roleInfo.actions.spread}`);
      bot.telegram.sendMessage(
        ctx.chat.id,
        `id: ${player.id} player ${player.name} ${roleInfo.roleName}`
      );
    }
  });
*/
}
/*

 bot.telegram.sendMessage(
    chatId,
    mensaje,
    Markup.inlineKeyboard(
      acciones.map(accion => Markup.button.callback(accion, `accion:${accion}`))
    )
  );

*/

function handleUpdateError(chatId, playerListMessage, error) {
  if (error.description === 'Bad Request: message to edit not found') {
    strategies.sendNewMessage(chatId, playerListMessage);
  } else {
    throw error;
  }
}

export const strategies = {
  sendNewMessage: (chatId, playerListMessage) => {
    bot.telegram.sendMessage(chatId, playerListMessage).then((message) => {
      playerListMessageId.value = message.message_id;
    });
  },
  updateExistingMessage: (chatId, playerListMessage) => {
      bot.telegram
        .editMessageText(chatId, playerListMessageId.value, null, playerListMessage)
        .catch((error) => handleUpdateError(chatId, playerListMessage, error));
    },
};
//se usa en el comand0 players
//Envia una lista y edita los mensajes de esa lista nueva
//pinea la lista y despinea la lista la anterior
export function sendPlayersList(chatId) {
  const playerListMessage = defaultPlayerListMessage();
  if (lastPlayerListMessageId.value) {
    bot.telegram.unpinChatMessage(chatId, lastPlayerListMessageId.value);
  }
  strategies.sendNewMessage(chatId, playerListMessage)
}
export function defaultPlayerListMessage() {
  let playerListMessage = '';
  playerListMessage = `Lista 🖇 #players : ${game.players.length} \n`;
  if (game.players.length === 0) {
    playerListMessage += 'No hay jugadores en la partida.';
  } else {
    const playerNames = game.players.map((player,index) => `${index + 1} • ${player.name}`);
    playerListMessage += playerNames.join('\n');
  }
  if (playerListMessage === lastPlayerListMessage.value) {
    // El contenido del mensaje no ha cambiado, no es necesario editarlo
    return;
  }
  return playerListMessage;
}

export function sendInitialPlayerList(chatId) {
  const playerListMessage = defaultPlayerListMessage();
  const strategy = playerListMessageId.value ? 'updateExistingMessage' : 'sendNewMessage';
  strategies[strategy](chatId, playerListMessage);
}

/*
export function sendPlayerList(chatId) {
 let playerListMessage = `#players :${game.players.length}   Lista de jugadores 👥 :\n`;
  if (game.players.length === 0) {
    playerListMessage += 'No hay jugadores en la partida.';
  } else {
    const playerNames = game.players.map((player,index) => `${index + 1} • ${player.name}`);
    playerListMessage += playerNames.join('\n');
  }
  if (playerListMessage === lastPlayerListMessage.value) {
    // El contenido del mensaje no ha cambiado, no es necesario editarlo
    return;
  }
  
  lastPlayerListMessage.value = playerListMessage;
  const strategy = playerListMessageId.value ? 'updateExistingMessage' : 'sendNewMessage';
  strategies[strategy](chatId, playerListMessage);
}
*/
/*
export function sendInitialPlayerList(chatId) {
  const playerListMessage = defaultPlayerListMessage();
  if (playerListMessageId.value) {
    // Si ya hay un mensaje de la lista de jugadores, editarlo en lugar de enviar uno nuevo
    bot.telegram.editMessageText(chatId, playerListMessageId.value, null, playerListMessage);
  } else {
    // Si no hay un mensaje de la lista de jugadores, enviar uno nuevo
    bot.telegram.sendMessage(chatId, playerListMessage).then((message) => {
      playerListMessageId.value = message.message_id;
    });
  }
}

*/
/*
//Envia una lista nueva pero Edita los mensajes de esa lista nueva.
//Es perefecto para el ciclo repitivo del juego
export function sendPlayersList(chatId) {
  const playerListMessage = defaultPlayerListMessage();
  strategies.sendNewMessage(chatId, playerListMessage);
}
*/




/*
//no envia la lista de jugadores
export function sendPlayerList(chatId) {
  let playerListMessage = '👥 Lista de jugadores:\n';
  if (game.players.length === 0) {
    playerListMessage += 'No hay jugadores en la partida.';
  } else {
    const playerNames = game.players.map((player,index) => `${index + 1} • ${player.name}`);
    playerListMessage += playerNames.join('\n');
  }
  if (playerListMessage === lastPlayerListMessage.value) {
    // El contenido del mensaje no ha cambiado, no es necesario editarlo
    return;
  }
  
  lastPlayerListMessage.value = playerListMessage;
  const strategy = playerListMessageId.value ? 'updateExistingMessage' : 'sendNewMessage';
  strategies[strategy](chatId, playerListMessage);
}
*/
/*

const strategies = {
  sendNewMessage: (chatId, playerListMessage) => {
    bot.telegram.sendMessage(chatId, playerListMessage).then((message) => {
      playerListMessageId = message.message_id;
    });
  },
  updateExistingMessage: (chatId, playerListMessage) => {
    bot.telegram.editMessageText(chatId, playerListMessageId, null, playerListMessage);
  },
};

*/
/*
export function totalWolvesOnGame() {
  // Recalcular el número total de lobos en el juego
  const newTotalWolves = game.players.filter(player => player.role === 'wolf' && player.isAlive).length;
  console.log('total w:',newTotalWolves)
  wolvesAlive.setTotalWolves(newTotalWolves);
  wolvesAlive.setWolvesVoted(0);
 
  // ...
}
*/

/*
export function sendWolfOptions() {
  console.log('sendWOlfOptions')
  game.players.forEach(player => {
    if (typeof player.role === 'string' && player.role === 'wolf' && player.isAlive && player.actions?.attack) {
      console.log('role && actions: ', player.role + player.actions);
      const options = game.players
        .filter(p => p.id !== player.id && p.isAlive)
        .map(p => Markup.button.callback(p.name, `matar ${p.id}`));
      if (options.length === 0) {
        console.log('No hay opciones disponibles para el jugador', player.id);
        return;
      }
      const message = 'Elige a tu objetivo:';
      bot.telegram.sendMessage(player.id, message, Markup.inlineKeyboard(options));
    }
  });
}
*/


/*
export function sendWolfOptions() {
  console.log('ejecutando sendWOlfOptions')
  game.players.forEach(player => {
      const { role, isAlive, actions } = player;
      if (role === 'wolf' && isAlive && actions?.attack) {
          const options = game.players
              .filter(p => p.id !== player.id && p.isAlive)
              .map(p => Markup.button.callback(p.name, `matar ${p.id}`));
          if (options.length === 0) {
              console.log('No hay opciones disponibles para el jugador', player.id);
              return;
          }
          const message = 'Elige a tu objetivo:';
          bot.telegram.sendMessage(player.id, message, Markup.inlineKeyboard(options))
          .then(sentMessage => {
              // Aquí puedes guardar el ID del mensaje para usarlo más tarde
              player.messageId = sentMessage.message_id;
          })
          .catch(error => console.error(`Error al enviar mensaje: ${error}`));
          
  }
});
}
*/


/*

////////////////////////////////
function seleccionarAccion(ctx) {
  if (!accionSeleccionada) {
    accionSeleccionada = ctx.match[1];
    ctx.answerCbQuery(`Has seleccionado: ${accionSeleccionada}`);
    console.log('accion seleccionada: ',accionSeleccionada)
    enviarJugadores(ctx.chat.id);
    ctx.editMessageReplyMarkup({ inline_keyboard: [] });
} else {
    ctx.answerCbQuery('Ya has seleccionado una acción.');
}
}

function enviarJugadores(chatId) {
  bot.telegram.sendMessage(
  chatId,
  "Elige un jugador:",
  Markup.inlineKeyboard(
  jugadores.map(jugador => Markup.button.callback(jugador, `jugador:${jugador}`))
  )
  ).then((sentMessage) => {
  setTimeout(() => {
  bot.telegram.deleteMessage(chatId, sentMessage.message_id);
  bot.telegram.sendMessage(chatId, 'Ups, se acabó el tiempo');
  }, 60000);
  });
 }
 

function seleccionarJugador(ctx) {
if (!jugadorSeleccionado) {
    jugadorSeleccionado = ctx.match[1];
    ctx.answerCbQuery(`Has seleccionado: ${jugadorSeleccionado}`);
    // Aquí puedes aplicar la acción seleccionada al jugador seleccionado
    ctx.editMessageReplyMarkup({ inline_keyboard: [] });
} else {
    ctx.answerCbQuery('Ya has seleccionado un jugador.');
}
}
*/
//gameLogic.js
import { playerListMessageId, lastPlayerListMessage, lastPlayerListMessageId,setTotalWolves, setWolvesVoted} from './game.js'
import { bot } from './bot.js'
import { Markup } from 'telegraf';
import { game } from './startGameCycle.js';
import { roles } from './bot actions/roles.js';
const DAY_GIF_URL='https://media.giphy.com/media/F7zbPA5ZYuBchXRgc1/giphy.gif'
const DUSK_GIF_URL='https://media.giphy.com/media/3og0IMyCE2AfO84ZG0/giphy.gif'
const NIGHT_GIF_URL="https://media.giphy.com/media/RnMXpemm7RKaEfRmrb/giphy.gif"
export const PARTY_WEREWOLF_GIF='https://media.giphy.com/media/7hC8EMxqzygM/giphy.gif'
export function totalWolvesOnGame() {
  // Recalcular el número total de lobos en el juego
  const newTotalWolves = game.players.filter(player => player.role === 'lobo' && player.alive).length;
  setTotalWolves(newTotalWolves);
  setWolvesVoted(0);
  // ...
}

export function countWolfVotes() {
  // Contar los votos de los lobos
  const votes = {}
  game.players.forEach(player => {
    const roleInfo = roles[player.role]();
    if (player.role === 'wolf' && roleInfo.actions.matar) {
      if (votes[player.target.id]) {
        votes[player.target.id]++
      } else {
        votes[player.target.id] = 1
      }
    }
  })

  // Encontrar al jugador con más votos
  let maxVotes = 0
  let target = null
  for (const playerId in votes) {
    if (votes[playerId] > maxVotes) {
      maxVotes = votes[playerId]
      target = game.players.find(player => player.id === parseInt(playerId))
    }
  }

  // Elegir al azar en caso de empate
  if (maxVotes > 0) {
    const tiedPlayers = game.players.filter(player => votes[player.id] === maxVotes)
    if (tiedPlayers.length > 1) {
      target = tiedPlayers[Math.floor(Math.random() * tiedPlayers.length)]
    }
  }

  // Realizar la acción de matar al objetivo
  if (target) {
    target.alive = false
    // Enviar un mensaje a todos los jugadores informando quién fue asesinado
    game.players.forEach(player => {
      bot.telegram.sendMessage(player.id, `${target.name} fue asesinado durante la noche.`)
    })
  }
}
//
export function sendWolfOptions() {
    game.players.forEach(player => {
      const roleInfo = roles[player.role]();
      const role = roles.find(role => role === player.role);
      if (player.role === 'lobo' && player.alive && role.hasAction) {
        const options = game.players.filter(p => p.id !== player.id && p.alive).map(p => Markup.button.callback(p.name, `matar ${p.id}`));
        const message='Elige a tu objetivo:'
        bot.telegram.sendMessage(player.id, message, Markup.inlineKeyboard(options));
        console.log('Opciones enviadas al lobo:', options); // Agregar console.log aquí
      }
    });
  }

export function endNightPhase() {
  // Contar los votos de los lobos y actualizar el estado del juego
  countWolfVotes();
   // Restablecer las acciones de los jugadores
   game.players.forEach(player => {
    player.actions = null;
    player.target = null;
  });
  
  // Borrar los mensajes de acción


  // Vaciar el registro de mensajes de acción
   
  }
export function startDayPhase() {
  // Lógica para la fase de día
  // Inicio del día
  bot.telegram.sendAnimation(GAME_CHAT_ID, DAY_GIF_URL, {caption:'Ya es de día...'})
  bot.telegram.sendMessage(GAME_CHAT_ID, `Ha amanecido en el pueblo. Es hora de discutir y votar para linchar a un sospechoso.`);
  sendVillagerOptions();
  // Mostrar lista de jugadores vivos
  const alivePlayers = players
  .filter(player => player.alive)
  .map(player => {
    const role = roles.find(role => role.name === player.role);
    return `${player.name} ${role.emoji}`;
  })
  .join(', ');
  
  bot.telegram.sendMessage(GAME_CHAT_ID, `Jugadores vivos: ${alivePlayers}`);
  //seleccionan la accion los jugadores que tienen accion de dia
// Llamar a las funciones correspondientes para la fase de día
    // ...
    game.players.map(player => {
      const role = roles.find(role => role.name === player.role);
      if (player.alive && role.type === 'diurno' && role.hasAction){
        // Enviar opciones a los jugadores con roles diurnos que tengan una acción disponible
        // ...
      }
    });
    // ...
  }
 export function startDuskPhase() {
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
 
 export function startNightPhase() {
  // Lógica para la fase de noche
  // Inicio de la noche
  bot.telegram.sendAnimation(GAME_CHAT_ID,  NIGHT_GIF_URL, {caption:'Ya es de noche'})
  bot.telegram.sendMessage(GAME_CHAT_ID, `Ha anochecido en el pueblo. Los lobos están eligiendo a su próxima víctima.`);
  // Mostrar lista de jugadores
  sendInitialPlayerList(ctx.chat.id)
  totalWolvesOnGame()
  sendWolfOptions();
  sendSeerOptions();
  sendWitchOptions();
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
    if (player.alive) {
      // Crear un arreglo de opciones para el jugador
      const options = players
        .filter(p => p.id !== player.id && p.alive)
        .map(p => Markup.button.callback(p.name, `linchar ${p.id}`));
      // Enviar las opciones al jugador
      //enviarAcciones(player.id, options, 'Elige a quién linchar:');
      const message='Elige a quién linchar:'
      bot.telegram.sendMessage(
        player.id,
       message,
        Markup.inlineKeyboard(options))
    }
  });
}


export function sendSeerOptions() {
  const seer = game.players.find(player => player.role === 'vidente');
  const role = roles.find(role => role.name === 'vidente');
  if (seer && role.hasAction) {
    const options = players
      .filter(p => p.id !== seer.id)
      .map(p => Markup.button.callback(p.name, `ver ${p.id}`));
    const message='Elige a quién quieres ver:'
    bot.telegram.sendMessage(
    seer.id,
     message,
      Markup.inlineKeyboard(options))
  }
}

export function sendWitchOptions() {
  const witch = game.players.find(player => player.role === 'bruja');
  const role = roles.find(role => role.name === 'bruja');
  if (witch && role.hasAction) {
    const options = ['curar', 'matar'];
    const message='Elige a quién quieres ver:'
    enviarAcciones( witch.id, options, message)
  }
}

export function sendDruidOptions() {
  const druid = game.players.find(player => player.role === 'druida')
  const role = roles.find(role => role.name === 'bruja');
  if(druid && role.hasAction){
    const options = ['proteger', 'atacar']
    const message='Elige a quién quieres ver:'
    enviarAcciones(druid.id, options, message)
    
  }
}

const acciones = ['Atacar', 'Proteger'];
const jugadores = ['Jugador 1', 'Jugador 2', 'Jugador 3'];
let accionSeleccionada;
let jugadorSeleccionado;
// ...
function enviarAcciones(chatId,acciones,mensaje = "Elige qué acción quieres realizar:") {
  bot.telegram.sendMessage(
    chatId,
    mensaje,
    Markup.inlineKeyboard(
      acciones.map(accion => Markup.button.callback(accion, `accion:${accion}`))
    )
  );
}
// ...
function seleccionarAccion(ctx) {
if (!accionSeleccionada) {
    accionSeleccionada = ctx.match[1];
    ctx.answerCbQuery(`Has seleccionado: ${accionSeleccionada}`);
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

export function Asd(ctx) {
enviarAcciones(ctx.from.id,acciones);
bot.action(/accion:(.+)/, seleccionarAccion);
bot.action(/jugador:(.+)/, seleccionarJugador);
}
export const joinButton = {
  inline_keyboard: [
      [{text: 'Unirse', callback_data: JSON.stringify({type: 'joinme'})}]
  ]
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

export function Testcommands(ctx) {
      const players = [
        { name: 'Alice', role: "villager", id: 1 },
        { name: 'Bob', role: "traitor", id: 2 },
        { name: 'Charlie', role: "wolf", id: 3 },
        { name: 'BigMAc', role: "blacksmith", id: 4 },
      ];
    
      players.forEach((player) => {
        const roleInfo = roles[player.role]();
        console.log(`${player.name} is a ${roleInfo.roleName}`);

        bot.telegram.sendMessage(ctx.chat.id,`${player.name} is a ${roleInfo.roleName}`)
 
      });
      const villagerMsg = players
        .filter(player => player.role === 'wolf')
        .map(player => `${player.name} es un ${player.role}`);
        bot.telegram.sendMessage(ctx.chat.id,`${villagerMsg}`)
      //console.log(villagerNames); // Outputs ["Charlie"]
      
      const roleInfo = roles['blacksmith']();
      
      players.forEach(player => {
        if (player.role === 'blacksmith' && roleInfo.actions.spread) {
          //console.log(`actions ${roleInfo.actions.spread}`);
          bot.telegram.sendMessage(
            ctx.chat.id,
            `id: ${player.id} player ${player.name} ${roleInfo.roleName}`
          );
        }
      });

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
  playerListMessage = `Lista 👥 #players :${game.players.length} \n`;
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
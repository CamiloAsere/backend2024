//lynch.js//
import { bot } from '../bot.js';
import { game } from '../startGameCycle.js';
/**
 * Manejador de acción para el comando "linchar".
 */
bot.action(/^lynch \d+$/, (ctx) => {
  console.log("recibido")
})
bot.action(/^linchar \d+$/, (ctx) => {
  // Buscar al jugador que envió el comando
  const player = game.players.find(player => player.id === ctx.from.id);
  // Verificar si el jugador está vivo
  if (player && player.isAlive) {
    // Verificar si el jugador ya ha votado o se ha abstenido
    if (!hasPlayerTakenAction(player)) {
      // Obtener el ID del jugador seleccionado
      const targetId = parseInt(ctx.match[0].split(' ')[1]);
      // Buscar al jugador seleccionado
      const target = game.players.find(player => player.id === targetId);
      // Verificar si el jugador seleccionado está vivo
      if (target && target.isAlive) {
        // Registrar el voto del jugador
        player.vote = target;
        // Enviar una respuesta al jugador
        ctx.answerCbQuery(`Has votado por linchar a ${target.name}.`);
        // Mostrar quién vota a quién
        bot.telegram.sendMessage(ctx.chat.id, `${player.name} ha votado por linchar a ${target.name}.`);
        // Verificar si todos los jugadores vivos han votado o se han abstenido
        if (
          game.players.filter(player => player.isAlive).every(player => player.vote || player.abstain)
        ) {
          // Mostrar el conteo de los linches
          showLynchCount(ctx);
          // Mostrar el resultado de la votación
          showLynchResult(ctx);
        }
      } else {
        // Enviar una respuesta al jugador indicando que no se encontró al jugador seleccionado
        ctx.answerCbQuery(`No se encontró al jugador seleccionado.`);
      }
    }
  }
});
  bot.action('abstenerse', (ctx) => {
    // Buscar al jugador que envió el comando
    const player = game.players.find(player => player.id === ctx.from.id);
    // Verificar si el jugador está vivo
    if (player && player.isAlive) {
      // Verificar si el jugador ya ha votado o se ha abstenido
        if (!hasPlayerTakenAction(player)) {
          // Registrar que el jugador se ha abstenido de votar
          player.abstain = true;
        // Enviar una respuesta al jugador
        ctx.answerCbQuery(`Has decidido abstenerse de votar.`);
        // Mostrar quién se ha abstenido de votar
        bot.telegram.sendMessage(ctx.chat.id, `${player.name} ha decidido abstenerse de votar.`);
        // Verificar si todos los jugadores vivos han votado o se han abstenido
        if (
          game.players.filter(player => player.isAlive).every(player => player.vote || player.abstain)
        ) {
          // Mostrar el conteo de los linches
          showLynchCount(ctx);
          // Mostrar el resultado de la votación
          showLynchResult(ctx);
        
      }
    }
  }
  });
/*
bot.action(/^linchar \d+$/, (ctx) => {
    // Buscar al jugador que envió el comando
    const player = game.players.find(player => player.id === ctx.from.id);//7
    // Verificar si el jugador está vivo
    if (player && player.isAlive) {
      // Obtener el ID del jugador seleccionado
      const targetId = parseInt(ctx.match[0].split(' ')[1]);
      // Buscar al jugador seleccionado
      const target = game.players.find(player => player.id === targetId);//6
      // Verificar si el jugador seleccionado está vivo
      if (target && target.isAlive) {
        // Registrar el voto del jugador
        player.vote = target;
        // Enviar una respuesta al jugador
        ctx.answerCbQuery(`Has votado por linchar a ${target.name}.`);
        // Mostrar quién vota a quién
        bot.telegram.sendMessage(ctx.chat.id, `${player.name} ha votado por linchar a ${target.name}.`);
        // Verificar si todos los jugadores vivos han votado o se han abstenido
        if (
          game.players.filter(player => player.isAlive).every(player => player.vote || player.abstain)//5
        ) {
          // Mostrar el conteo de los linches
          showLynchCount();
          // Mostrar el resultado de la votación
          showLynchResult();
        }
      } else {
        // Enviar una respuesta al jugador indicando que no se encontró al jugador seleccionado
        ctx.answerCbQuery(`No se encontró al jugador seleccionado.`);
      }
    }
  });
  */  
  /*
  bot.action('abstenerse', (ctx) => {
    // Buscar al jugador que envió el comando
    const player = game.players.find(player => player.id === ctx.from.id);//4
    // Verificar si el jugador está vivo
    if (player && player.isAlive) {
      // Registrar que el jugador se ha abstenido de votar
      player.abstain = true;
      // Enviar una respuesta al jugador
      ctx.answerCbQuery(`Has decidido abstenerse de votar.`);
      // Mostrar quién se ha abstenido de votar
      bot.telegram.sendMessage(ctx.chat.id, `${player.name} ha decidido abstenerse de votar.`);
      // Verificar si todos los jugadores vivos han votado o se han abstenido
      if (
        game.players.filter(player => player.isAlive).every(player => player.vote || player.abstain)//3
      ) {
        // Mostrar el conteo de los linches
        showLynchCount();
        // Mostrar el resultado de la votación
        showLynchResult();
      }
    }
  });
*/  


/**
 * Mostrar el conteo de los linches.
 */
function hasPlayerTakenAction(player) {
  // Verificar si el jugador ya ha votado o se ha abstenido
  if (player.vote || player.abstain) {
    // Enviar una respuesta al jugador indicando que ya ha tomado una acción
    ctx.answerCbQuery('Ya has tomado una acción y no puedes cambiarla.');
    return true;
  }
  return false;
}

function showLynchCount(ctx) {
  const votes = game.players.reduce((acc, player) => {//2
    if (player.vote) {
      acc[player.vote.name] = (acc[player.vote.name] || 0) + 1;
    }
    return acc;
  }, {});
  const voteMessage =
    'Conteo de los linches:\n' +
    Object.entries(votes)
      .map(([name, count]) => `${name}: ${count}`)
      .join('\n');
  bot.telegram.sendMessage(ctx.chat.id, voteMessage);
}

/**
 * Mostrar el resultado de la votación.
 */
function showLynchResult(ctx) {
  const [lynchedPlayerName] = Object.entries(votes).reduce(
    ([maxName, maxVotes], [name, count]) => {
      if (count > maxVotes) {
        return [name, count];
      }
      return [maxName, maxVotes];
    },
    ['', 0]
  );
  const lynchedPlayer = game.players.find(player => player.name === lynchedPlayerName);//1
  
  if (lynchedPlayer) {
    //lynchedPlayer.alive = false;
    game.updatePlayersAlive(lynchedPlayer);
    bot.telegram.sendMessage(ctx.chat.id, `Después de un día de incertidumbre y sospechas, los aldeanos finalmente tomaron una decisión. ${lynchedPlayer.name} fue acusado de ser un lobo y linchado por el pueblo. ${lynchedPlayer.name} era solo un ${lynchedPlayer.role}. Ahora el todos se preguntaban quién sería el próximo en caer.`);
  // Actualizar el estado del juego en función del resultado de la votación
 
  
  
} else {
    bot.telegram.sendMessage(ctx.chat.id, 'Nadie ha sido linchado.');
  }
}


/*


Resumen 1: Mejoras en el archivo `gameLogic.js`

En el archivo `gameLogic.js`, se realizaron las siguientes mejoras:

1. Se mejoró la función `sendVillagerOptions` para hacerla más legible y fácil de entender.
 Esta función envía opciones a los jugadores vivos para votar por quién linchar durante la fase de linchamiento.

2. Se agregó una nueva opción a la función `sendVillagerOptions` para permitir que los jugadores se abstengan de votar durante la fase de linchamiento. 
Esta opción se muestra junto con las opciones para votar por los demás jugadores y permite a los jugadores elegir si quieren votar o no.

3. Se actualizó el manejador de acción para el comando `linchar` para manejar la nueva opción que se agregó a la función `sendVillagerOptions`. 
Cuando un jugador elige abstenerse de votar, se registra esta información y se muestra un mensaje en el chat del juego indicando que el jugador ha decidido abstenerse de votar.


Resumen 2: Mejoras en el archivo `lynch.js`

En el archivo `lynch.js`, se realizaron las siguientes mejoras:

1. Se separó el manejador de acción para el comando `linchar` y sus funciones en un archivo aparte para mejorar la organización y modularidad del código.

2. Se mejoró el manejador de acción para el comando `linchar` y sus funciones para hacerlos más legibles y fáciles de entender. 
Este manejador de acción maneja las votaciones durante la fase de linchamiento y muestra quién vota a quién, el conteo de los linches y el resultado de la votación.

3. Se agregó una nueva opción al manejador de acción para el comando `linchar` para permitir que los jugadores se abstengan de votar durante la fase de linchamiento. 
Cuando un jugador elige abstenerse de votar, se registra esta información y se muestra un mensaje en el chat del juego indicando que el jugador ha decidido abstenerse de votar.


*/
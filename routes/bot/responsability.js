/*
Desarrolla una solución para reducir la cantidad de condicionales ‘if’ en la propiedad mencionada y mejorar su lógica. 
Asegúrate de que la solución propuesta siga funcionando correctamente y cumpla con los requisitos de la propiedad. 
Proporciona ejemplos y comentarios detallados para explicar cómo funciona tu solución y cómo mejora la lógica existente.
//...
Una forma de reducir la cantidad de condicionales if en el método gameNotStarted del objeto actions en el archivo botCommands.js y mejorar 
su lógica es utilizando el patrón de diseño “Chain of Responsibility”. Este patrón permite encadenar varios objetos que manejan una solicitud
y pasar la solicitud a lo largo de la cadena hasta que uno de los objetos la maneje.
En el caso del método gameNotStarted, se pueden crear varios objetos que manejen diferentes condiciones, como verificar si el balance de roles 
es válido, verificar si hay suficientes jugadores para comenzar el juego y verificar si el juego ya ha comenzado. Cada objeto tendría un 
método handle que verifica si su condición se cumple y, si es así, maneja la solicitud y devuelve true. 
Si la condición no se cumple, el objeto pasa la solicitud al siguiente objeto en la cadena y devuelve false.
*/
// Definir una clase abstracta CommandHandler


function hasPlayerTakenAction(player) {
  // Verificar si el jugador ya ha votado o se ha abstenido
  if (player.vote || player.abstain) {
    // Enviar una respuesta al jugador indicando que ya ha tomado una acción
    ctx.answerCbQuery('Ya has tomado una acción y no puedes cambiarla.');
    return true;
  }
  return false;
}

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
          showLynchCount();
          // Mostrar el resultado de la votación
          showLynchResult();
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
        showLynchCount();
        // Mostrar el resultado de la votación
        showLynchResult();
      }
    }
  }
});
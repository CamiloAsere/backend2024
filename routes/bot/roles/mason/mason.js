// mason.js
/*
// Después de asignar los roles a los jugadores
notifyMasons(bot, game.players);
*/
// En el archivo donde asignas los roles a los jugadores
/*
export function notifyMasons(bot, players) {
    players.forEach(player => {
      if (player.role === 'mason') {
        // Obtener la lista de nombres de los jugadores Mason (excluyendo el nombre del jugador actual)
        const masonNames = players.filter(p => p.role === 'mason' && p.id !== player.id).map(p => p.name);
  
        // Enviar notificación al jugador Mason
        if (masonNames.length > 0) {
          bot.telegram.sendMessage(player.id, `Eres un masón y tus compañeros masones en el juego son: ${masonNames.join(', ')}`);
        } else {
        }
        bot.telegram.sendMessage(player.id, 'Eres un masón ,un integrante mas de la aldea. De momento no tienes compañeros masones en el juego.');
      }
    });
  }
  */
  export async function notifyMasons(bot, players) {
    const masonPlayers = players.filter(p => p.role === 'mason');
    
    if (masonPlayers.length > 0) {
      for (const player of masonPlayers) {
        const masonNames = masonPlayers.filter(p => p.id !== player.id).map(p => p.name);
  
        try {
          if (masonNames.length > 0) {
            await bot.telegram.sendMessage(player.id, `Tus compañeros masones en el juego son: ${masonNames.join(', ')}`);
          } else {
            await bot.telegram.sendMessage(player.id, 'De momento no tienes compañeros masones en el juego.');
          }
        } catch (error) {
          console.error(`Error al enviar mensaje a ${player.id}: ${error}`);
        }
      }
    }
  }
  /*
  
  // Después de asignar los roles a los jugadores
  // notifyMasons(bot, game.players);
  */
//falta actualizar el ctx del gameState
export function countWolfVotes(game, roles, bot) {
    // Contar los votos de los lobos
    const votes = {};
    game.players.forEach((player) => {
      const role = roles[player.role]();
      if (player.role === "wolf" && player.isAlive && role.actions.attack) {
        if (votes[player.target.id]) {
          votes[player.target.id]++;
        } else {
          votes[player.target.id] = 1;
        }
      }
    });
  
    // Encontrar al jugador con más votos
    let maxVotes = 0;
    let target = null;
    for (const playerId in votes) {
      if (votes[playerId] > maxVotes) {
        maxVotes = votes[playerId];
        target = game.players.find(
          (player) => player.id === parseInt(playerId)
        );
      }
    }
  
    // Elegir al azar en caso de empate
    if (maxVotes > 0) {
      const tiedPlayers = game.players.filter(
        (player) => votes[player.id] === maxVotes
      );
      if (tiedPlayers.length > 1) {
        target =
          tiedPlayers[Math.floor(Math.random() * tiedPlayers.length)];
      }
    }
  
    // Realizar la acción de matar al objetivo
    if (target) {
        target.die();
        // Enviar un mensaje a todos los jugadores informando quién fue asesinado
        game.players.forEach((player) => {
          bot.telegram.sendMessage(
            player.id,
            `${target.name} fue asesinado durante la noche.`
          );
        });
      }
  }
  
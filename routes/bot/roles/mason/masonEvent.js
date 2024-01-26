// En un archivo llamado masonEvents.js
import { bot } from './bot.js';

// Crear un evento personalizado
export const masonEvent = new CustomEvent('masonEvent', { detail: { newMasonName: '' } });

// Agregar un listener para el evento
document.addEventListener('masonEvent', async (event) => {
  /*
  // Obtener la lista de jugadores Mason
  const masonPlayers = game.players.filter(player => player.role === 'Mason');

  // Enviar notificación a los jugadores Mason
  masonPlayers.forEach(player => {
    // Enviar notificación al jugador Mason
    bot.telegram.sendMessage(player.id, `Hay un nuevo Mason en el juego: ${event.detail.newMasonName}`);
  });
*/

  const masonPlayers = game.players.filter(player => player.role === 'Mason');

  for (const player of masonPlayers) {
    try {
      await bot.telegram.sendMessage(player.id, `Hay un nuevo Mason en el juego: ${event.detail.newMasonName}`);
    } catch (error) {
      console.error(`Error al enviar mensaje a ${player.id}: ${error}`);
    }
  }

});

// Función para disparar el evento masonEvent
export function triggerMasonEvent(newMasonName) {
  document.dispatchEvent(new CustomEvent('masonEvent', { detail: { newMasonName } }));
}
/*
// En el archivo donde manejas los eventos del juego
import { triggerMasonEvent } from './masonEvents.js';

// Disparar el evento cuando sea necesario (por ejemplo, cuando un jugador cambie de rol o cuando un nuevo jugador Mason se una al juego)
triggerMasonEvent('Nombre del nuevo jugador Mason');

*/

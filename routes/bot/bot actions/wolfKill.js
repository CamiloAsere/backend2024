//wolfKill.js//
import { bot } from '../bot.js';
import { checkAllWolvesVoted, roles, wolvesAlive  } from '../game.js';
import { game } from '../startGameCycle.js';
// Definimos la acción del bot para cuando un lobo ataca
bot.action(/^attack \d+$/, ctx => {
  console.log('iniciando wolfkills actions')
  const player = game.players.find(player => player.id === ctx.from.id);
  const role = roles[player.role]();
  if (player  && player.role === 'wolf' && player.isAlive && role.actions.attack) {
    const targetId = parseInt(ctx.match[0].split(' ')[1]);
    const target = game.players.find(player => player.id === targetId);
    if (target) {
      player.target = target;
      wolvesAlive.set('wolvesVoted', wolvesAlive.get('wolvesVoted') + 1); // Incrementamos wolvesVoted en 1
      ctx.answerCbQuery(`Has seleccionado a ${target.name} como tu objetivo.`);
      console.log('Lobo seleccionó a:', target.name);

      // Verificamos si todos los lobos han votado
      checkAllWolvesVoted(bot);
    } else {
      ctx.answerCbQuery(`No se encontró al jugador seleccionado.`);
    }
  }
});
/*
let jugadorSeleccionado = null;

bot.action(/^attack \d+$/, (ctx) => {
    const id = parseInt(ctx.match[0].split(' ')[1]);
    const player = game.players.find(player => player.id === id);
    if (!jugadorSeleccionado) {
        jugadorSeleccionado = id;
        ctx.answerCbQuery(`Has seleccionado: ${player.name}`);
        // Aquí puedes aplicar la acción seleccionada al jugador seleccionado
        ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    } else {
        ctx.answerCbQuery('Ya has seleccionado un jugador.');
    }
});
*/
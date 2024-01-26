import { bot } from "../bot";
import { game } from "../startGameCycle";

bot.action("leader_kill", (ctx) => {
    // Lógica para manejar cuando el líder selecciona la opción de matar
    const leaderPlayer = game.players.find(
      (player) => player.role === "leader" && player.isAlive
    );
    if (leaderPlayer) {
      leaderPlayer.kill(targetPlayer);
    }
  });
  
  bot.action("leader_revive", (ctx) => {
    // Lógica para manejar cuando el líder selecciona la opción de revivir
    const leaderPlayer = game.players.find(
      (player) => player.role === "leader" && player.isAlive
    );
    if (leaderPlayer) {
      leaderPlayer.revive(targetPlayer);
    }
  });
  
  bot.action("leader_skip", (ctx) => {
    // Lógica para manejar cuando el líder selecciona la opción de omitir
    const leaderPlayer = game.players.find(
      (player) => player.role === "leader" && player.isAlive
    );
    if (leaderPlayer) {
      leaderPlayer.skipKill();
    }
  });
  
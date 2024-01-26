import { Markup } from "telegraf";

export function sendLeaderOptions(leaderPlayer, bot) {
    const options = [
      Markup.button.callback("Matar", "leader_kill"),
      leaderPlayer.canRevive
        ? Markup.button.callback("Revivir", "leader_revive")
        : null,
      Markup.button.callback("Omitir", "leader_skip"),
    ].filter(Boolean);
    bot.telegram.sendMessage(
      leaderPlayer.id,
      "Elige una acción:",
      Markup.inlineKeyboard(options)
    );
  }
  
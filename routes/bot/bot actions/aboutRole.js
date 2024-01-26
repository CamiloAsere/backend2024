//import { roles } from "../game.js";

import { roles } from "./roles.js";
/*
export const aboutRoles = (bot) => {
  bot.hears(/\/about_(.+)/, (ctx) => {
    const msg = ctx.message;
    const match = ctx.match;
    if (!msg.from?.id) return;
    const roleKey = match?.[1];
    const role = roles.find((r) => r.name === roleKey);
    if (!role) return;

    const roleInfo =
      `*${role.name} ${role.emoji}\n*` +
      `👥 *Equipo:* ${role.team ?? "No disponible"}\n` +
      "🏆 " +
      (role.winCondition
        ? `__*Gana si*__ ${role.winCondition}.`
        : `__*Siempre pierde.*__`) +
      "\n" +
      (role.dayAction ? `🏙 *Acción diurna:* ${role.dayAction}\n` : "") +
      (role.nightAction ? `🌃 *Acción nocturna:* ${role.nightAction}\n` : "") +
      (role.description
        ? "🗒 *Notas:*\n" + role.description
        : "");

    bot.telegram.sendMessage(msg.from.id, roleInfo,{ parse_mode: 'Markdown' });
  });
};
*/

export const aboutRoles = (bot) => {
    bot.hears(/\/about_(.+)/, (ctx) => {
        const msg = ctx.message;
        if (!msg.from?.id) return;
        const match = msg.text.match(/\/about_(.+)/);
        const roleKey = match?.[1];
        if (!roleKey || !roles.hasOwnProperty(roleKey)) return;

        const role = roles[roleKey]();
        const roleInfo = `*${role.roleName}* ${role.emoji}\n`
            // + `🏋 *Вес️:* ${role.weight}\n`
            + `🎽 *Equipo:* ${role.team ?? "No disponible"}\n`
            + '🏆 ' + (role.winCondition
                ? `__*Gana si*__ ${role.winCondition}.`
                : `__*Siempre pierde.*__`) + '\n'
            //+ (role.actions.name? `🏙*Acción :* ${role.actions.name}\n` : "")
            + (role.notes ? '🗒 *Notas:*\n' + role.notes?.map((n, i) => i === 0 ? `\t\t _${n}_` : `\t\t — _${n}_`).join('\n') : '');


        ctx.reply(roleInfo,{ parse_mode: 'Markdown' });
    });
};


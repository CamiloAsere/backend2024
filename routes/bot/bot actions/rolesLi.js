import { bot } from "../bot.js";
import { roles } from "./roles.js";

export function roleListCommand(ctx) {
    const groups = {
        "Grupo 1": ["--- Equipo Aldeanos ---"],
        "Grupo 2": ["--- Equipo Lobos ---"],
        "Grupo 3": ["--- Roles Solitarios ---"],
        "Grupo 4": ["--- Otros... ---"]
    };

    Object.entries(roles).forEach(([key, role]) => {
        if (typeof role === 'function') {
            const team = role().team;
            if (team === "Aldeanos") {
                groups["Grupo 1"].push(key);
            } else if (team === "Lobos") {
                groups["Grupo 2"].push(key);
            } else if (team === "Solo en equipo") {
                groups["Grupo 3"].push(key);
            } else {
                groups["Grupo 4"].push(key);
            }
        }
    });

    Object.values(groups).forEach(groupRoles => {
        let roleCommands = `${groupRoles[0]}\n`;
        groupRoles.slice(1).sort((keyA, keyB) => +(roles[keyA]().roleName.localeCompare(roles[keyB]().roleName)))
            .forEach(roleKey => {
                const role = roles[roleKey];
                if (typeof role === 'function') {
                    roleCommands += `/about_${roleKey} ${role().roleName}${role().emoji}\n`;
                }
            });

        bot.telegram.sendMessage(ctx.from.id, roleCommands);
    });

    if (ctx.chat.type !== 'private') {
        ctx.reply('Te he enviado la lista de roles por privado.');
    }
}

export const roleList = (bot) => {
    bot.command('rolelist', ctx => {
      if (!ctx.from?.id) {
        return;
      }
      const teams = ['Aldeanos', 'Lobos',"Solo en equipo","Undead","Cannibal","Incendiarios", undefined];
      const teamNames = ['---🧑🏻‍🌾🏕Equipo Aldeanos---', '---🌕Equipo de lobos🐺🌑---',"Solo en equipo","--Undead--","--Cannibal--","--Incendiarios--", '---👹Otros roles🤡--'];
      if (ctx.chat.type !== 'private') {
        ctx.reply('Te he enviado la lista de roles por privado.');
    }
      teams.forEach((team, index) => {
        const sortedRolesText = `*${teamNames[index]}* \n` + mapRoles(team);
        
        bot.telegram.sendMessage(ctx.from.id, sortedRolesText, { parse_mode: "Markdown" });
        
      });
    })

    bot.command('role_keys', ctx => {
        const roleKeys = Object.keys(roles).join(', ');
        ctx.reply(`Las claves de las propiedades [${Object.keys(roles).length}] del objeto roles son: ${roleKeys}`);
    });
  }
  
  const mapRoles = (team) => Object.keys(roles)
  .filter(key => roles[key]().team === team)
  .sort((keyA, keyB) => +(roles[keyA]().roleName.localeCompare(roles[keyB]().roleName)))
  .map(key => `*${roles[key]().roleName}* ${roles[key]().emoji} —/about\\_${key}`)
  .join('\n') + '\n'

  /* */
export const sendRoleKeys = () => {
   
}
/* */
  